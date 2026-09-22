import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { AreaStoria, Foto } from "@/content/galleria";
import Lightbox from "./Lightbox";
import { AltreAree, Collage, EtichettaEsempio, GalleryHero } from "./parts";

// Modello "La storia": linea del tempo che si riempie scorrendo, anno grande che cambia
export default function StoriaTemplate({ area }: { area: AreaStoria }) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [attiva, setAttiva] = useState(0);
  const [aperta, setAperta] = useState<{ foto: Foto[]; index: number; didascalia: string } | null>(null);

  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start center", "end center"] });
  const progresso = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const primo = area.tappe[0]?.anno;
  const ultimo = area.tappe[area.tappe.length - 1]?.anno;
  const tappaAttiva = area.tappe[attiva];

  const vaiA = (i: number) =>
    document.getElementById(`tappa-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <GalleryHero
        foto={area.copertina}
        etichetta={area.etichetta}
        titolo={area.titolo}
        sottotitolo={area.intro}
        meta={primo && ultimo ? `${primo} — ${ultimo} · ${area.tappe.length} tappe` : undefined}
        indietro={{ label: "Galleria", href: "/galleria" }}
      />

      <main className="border-x border-brand-smoke/20 max-w-[2000px] mx-auto bg-brand-offwhite">
        <div ref={timelineRef} className="relative grid grid-cols-1 lg:grid-cols-12">
          {/* COLONNA ANNO (desktop) */}
          <aside className="hidden lg:block lg:col-span-4 border-r border-brand-smoke/20">
            <div className="sticky top-[5.5rem] h-[calc(100vh-5.5rem)] flex flex-col justify-between p-12 xl:p-16">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-brand-smoke/60 block mb-4">Linea del tempo</span>
                <motion.p
                  key={tappaAttiva?.anno}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-serif text-8xl xl:text-9xl tracking-tighter leading-none text-brand-forest"
                >
                  {tappaAttiva?.anno}
                </motion.p>
              </div>
              <ol className="space-y-3">
                {area.tappe.map((tappa, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => vaiA(i)}
                      className={`flex items-center gap-3 text-left text-sm transition-colors ${
                        i === attiva ? "text-brand-smoke" : "text-brand-smoke/60 hover:text-brand-smoke/70"
                      }`}
                    >
                      <span className={`h-[1px] transition-all duration-500 ${i === attiva ? "w-10 bg-brand-forest" : "w-4 bg-brand-smoke/30"}`} />
                      <span className="font-mono text-xs w-12">{tappa.anno}</span>
                      <span className="truncate max-w-[14rem]">{tappa.titolo}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          {/* TAPPE */}
          <div className="lg:col-span-8 relative">
            {/* linea che si riempie */}
            <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-brand-smoke/15" />
            <motion.div
              className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-brand-forest origin-top"
              style={{ scaleY: progresso }}
            />

            {area.tappe.map((tappa, i) => (
              <motion.section
                key={i}
                id={`tappa-${i}`}
                className="relative pl-14 md:pl-24 pr-6 md:pr-12 py-16 md:py-24 border-b border-brand-smoke/20 last:border-b-0 scroll-mt-24"
                onViewportEnter={() => setAttiva(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
              >
                <span
                  className={`absolute left-6 md:left-12 top-[4.6rem] md:top-[6.6rem] -translate-x-1/2 w-3 h-3 rounded-full border transition-colors duration-500 ${
                    i <= attiva ? "bg-brand-forest border-brand-forest" : "bg-brand-offwhite border-brand-smoke/40"
                  }`}
                />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="mb-10 max-w-2xl"
                >
                  <span className="text-xs font-bold tracking-widest uppercase text-brand-wood mb-3 block">
                    {tappa.data ?? tappa.anno}
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-5">
                    {tappa.titolo}
                    {tappa.daConfermare && <EtichettaEsempio />}
                  </h2>
                  {tappa.testo && <p className="text-brand-smoke/70 text-lg leading-relaxed">{tappa.testo}</p>}
                </motion.div>

                {tappa.foto.length > 0 && (
                  <Collage
                    foto={tappa.foto}
                    onOpen={(index) => setAperta({ foto: tappa.foto, index, didascalia: `${tappa.data ?? tappa.anno} — ${tappa.titolo}` })}
                  />
                )}
              </motion.section>
            ))}
          </div>
        </div>

        <AltreAree corrente={area.slug} />
      </main>

      <Lightbox
        foto={aperta?.foto ?? []}
        index={aperta ? aperta.index : null}
        didascalia={aperta?.didascalia}
        onClose={() => setAperta(null)}
      />
    </>
  );
}
