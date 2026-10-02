import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Globe from "globe.gl";
import { feature } from "topojson-client";
import land from "world-atlas/land-110m.json";
import type { PostMondo } from "@/content/around-the-world";
import { COORDINATE } from "@/content/coordinate";
import { PostCard } from "./AroundTheWorld";

type Punto = { post: PostMondo; lat: number; lng: number };
type Gruppo = { lat: number; lng: number; punti: Punto[] };

const VISTA_INIZIALE = { lat: 38, lng: 14, altitude: 2.1 };
// Poco più indietro della vista di partenza: allontanandosi si arriva subito al fondo
// e da lì la rotellina torna a scorrere la pagina.
const ALTEZZA_MASSIMA = 2.3;

// Raggruppa i punti vicini: più il mappamondo è lontano, più sono grandi i gruppi
function raggruppa(punti: Punto[], altitudine: number): Gruppo[] {
  const cella = Math.max(0.6, altitudine * 5);
  const gruppi = new Map<string, Punto[]>();
  for (const p of punti) {
    const k = `${Math.round(p.lat / cella)}:${Math.round(p.lng / cella)}`;
    gruppi.set(k, [...(gruppi.get(k) ?? []), p]);
  }
  return [...gruppi.values()].map((g) => ({
    lat: g.reduce((s, p) => s + p.lat, 0) / g.length,
    lng: g.reduce((s, p) => s + p.lng, 0) / g.length,
    punti: g,
  }));
}

function creaMarker(g: Gruppo, onClick: () => void) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "wth-marker";
  const n = g.punti.length;
  el.setAttribute("aria-label", n > 1 ? `${n} foto in questa zona` : g.punti[0].post.luogo ?? "Foto");
  el.innerHTML =
    n > 1
      ? `<span class="wth-marker__cluster">${n}</span>`
      : `<span class="wth-marker__dot"></span><span class="wth-marker__label">${g.punti[0].post.luogo ?? ""}</span>`;
  el.style.pointerEvents = "auto";
  el.style.cursor = "pointer";
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    onClick();
  });
  return el;
}

// Mappamondo 3D: i luoghi dei post, cliccabili. Se il 3D non è disponibile non mostra niente.
export default function WorldGlobe({ posts }: { posts: PostMondo[] }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<ReturnType<typeof Globe> | null>(null);
  const [aperti, setAperti] = useState<PostMondo[] | null>(null);
  const [indice, setIndice] = useState(0);
  const [errore, setErrore] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    // Serve WebGL: senza, resta solo la griglia di foto
    const prova = document.createElement("canvas");
    if (!prova.getContext("webgl2") && !prova.getContext("webgl")) {
      setErrore(true);
      return;
    }

    const punti: Punto[] = posts
      .map((post) => {
        const c = post.luogo ? COORDINATE[post.luogo] : undefined;
        return c ? { post, lat: c[0], lng: c[1] } : null;
      })
      .filter((p): p is Punto => p !== null);

    let globe: ReturnType<typeof Globe>;
    try {
      globe = new Globe(box, { animateIn: true });
    } catch {
      setErrore(true);
      return;
    }
    globeRef.current = globe;

    const terre = (feature(land as never, (land as never as { objects: { land: never } }).objects.land) as unknown as {
      features: object[];
    }).features;

    globe
      .backgroundColor("rgba(0,0,0,0)")
      .showGlobe(true)
      .showAtmosphere(true)
      .atmosphereColor("#F5C73D")
      .atmosphereAltitude(0.12)
      .polygonsData(terre)
      .polygonCapColor(() => "rgba(242, 240, 233, 0.16)")
      .polygonSideColor(() => "rgba(0, 0, 0, 0)")
      .polygonStrokeColor(() => "rgba(242, 240, 233, 0.55)")
      .polygonAltitude(0.004)
      .htmlAltitude(0.01)
      .htmlTransitionDuration(0)
      .pointOfView(VISTA_INIZIALE, 0);

    const mat = globe.globeMaterial() as unknown as { color: { set: (c: string) => void }; emissive?: { set: (c: string) => void } };
    mat.color.set("#132a1f");
    mat.emissive?.set("#0d1d15");

    const controlli = globe.controls() as unknown as {
      autoRotate: boolean;
      autoRotateSpeed: number;
      enableZoom: boolean;
      zoomSpeed: number;
      touches: { ONE: number; TWO: number };
      minDistance: number;
      maxDistance: number;
      addEventListener: (t: string, f: () => void) => void;
    };
    controlli.autoRotate = true;
    controlli.autoRotateSpeed = 0.35;
    controlli.enableZoom = true;
    controlli.zoomSpeed = 0.7;
    // un dito gira il mondo, due dita lo avvicinano (0 = ruota, 3 = zoom + ruota)
    controlli.touches = { ONE: 0, TWO: 3 };
    controlli.minDistance = 120;
    controlli.maxDistance = 100 * (1 + ALTEZZA_MASSIMA);

    // Con la rotellina si zooma solo stando sopra alla sfera: nel verde ai lati la
    // pagina scorre come sempre. E quando il mondo è già tutto allontanato, continuando
    // a scendere si riprende a scorrere la pagina — così non si resta mai bloccati qui.
    // La pizzicata del trackpad (che il browser manda come rotellina + ctrl) zooma sempre.
    const suRotellina = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      const r = box.getBoundingClientRect();
      const sopraIlMondo = globe.toGlobeCoords(e.clientX - r.left, e.clientY - r.top) !== null;
      const siAllontana = e.deltaY > 0;
      const tuttoIndietro = globe.pointOfView().altitude >= ALTEZZA_MASSIMA - 0.05;
      if (!sopraIlMondo || (siAllontana && tuttoIndietro)) {
        e.stopPropagation(); // non arriva al mappamondo: la pagina scorre normalmente
      }
    };
    box.addEventListener("wheel", suRotellina, { capture: true });

    let riparti: ReturnType<typeof setTimeout>;
    controlli.addEventListener("start", () => {
      controlli.autoRotate = false;
      clearTimeout(riparti);
    });
    controlli.addEventListener("end", () => {
      riparti = setTimeout(() => (controlli.autoRotate = true), 8000);
    });

    let ultimaAltitudine = -1;
    const aggiorna = (altitudine: number) => {
      if (Math.abs(altitudine - ultimaAltitudine) < 0.08) return;
      ultimaAltitudine = altitudine;
      const gruppi = raggruppa(punti, altitudine);
      globe.htmlElementsData(gruppi).htmlElement((d) => {
        const g = d as Gruppo;
        return creaMarker(g, () => {
          if (g.punti.length === 1) {
            setAperti([g.punti[0].post]);
            setIndice(0);
            controlli.autoRotate = false;
            return;
          }
          const alt = globe.pointOfView().altitude;
          if (alt > 0.35) {
            controlli.autoRotate = false;
            globe.pointOfView({ lat: g.lat, lng: g.lng, altitude: Math.max(0.25, alt / 2.6) }, 900);
          } else {
            setAperti(g.punti.map((p) => p.post));
            setIndice(0);
          }
        });
      });
    };
    aggiorna(VISTA_INIZIALE.altitude);
    globe.onZoom((pov) => aggiorna(pov.altitude));

    const ridimensiona = () => {
      globe.width(box.clientWidth).height(box.clientHeight);
    };
    ridimensiona();
    const ro = new ResizeObserver(ridimensiona);
    ro.observe(box);

    return () => {
      ro.disconnect();
      box.removeEventListener("wheel", suRotellina, { capture: true });
      clearTimeout(riparti);
      globe._destructor?.();
      box.innerHTML = "";
    };
  }, [posts]);

  // Senza accelerazione grafica il mappamondo non si può disegnare. Invece di sparire
  // in silenzio (sembrerebbe un pezzo di sito rotto) lo diciamo: le foto restano qui sotto.
  if (errore)
    return (
      <div className="h-[420px] sm:h-[520px] lg:h-[620px] flex flex-col items-center justify-center text-center px-6 gap-3">
        <p className="font-serif text-2xl md:text-3xl text-brand-offwhite">Il mappamondo non si è caricato</p>
        <p className="text-sm text-brand-offwhite/70 max-w-sm leading-relaxed">
          Il tuo browser in questo momento non può disegnarlo. Prova a ricaricare la pagina —
          le foto dal mondo le trovi comunque qui sotto.
        </p>
      </div>
    );

  const post = aperti?.[indice];

  return (
    <div className="relative">
      <div ref={boxRef} className="h-[420px] sm:h-[520px] lg:h-[620px] w-full cursor-grab active:cursor-grabbing" />

      <p className="absolute bottom-4 left-4 text-[11px] uppercase tracking-widest text-brand-offwhite/75 pointer-events-none max-w-[70%]">
        Trascina per girare il mondo · pizzica per avvicinare · tocca un punto
      </p>

      <AnimatePresence>
        {post && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-smoke/70 backdrop-blur-sm p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAperti(null)}
          >
            <motion.div
              className="relative w-full max-w-[320px]"
              initial={{ scale: 0.92, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" aria-label="Chiudi" onClick={() => setAperti(null)} className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-brand-offwhite text-brand-smoke flex items-center justify-center shadow-lg">
                <X className="w-4 h-4" />
              </button>
              <PostCard post={post} />
              {aperti && aperti.length > 1 && (
                <div className="flex items-center justify-between mt-3 text-brand-offwhite text-xs uppercase tracking-widest">
                  <button type="button" onClick={() => setIndice((i) => (i - 1 + aperti.length) % aperti.length)} className="px-3 py-2 hover:text-brand-yellow">← Prec.</button>
                  <span>{indice + 1} / {aperti.length}</span>
                  <button type="button" onClick={() => setIndice((i) => (i + 1) % aperti.length)} className="px-3 py-2 hover:text-brand-yellow">Succ. →</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
