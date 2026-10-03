import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { fetchProducts, formatPrice, priceFrom, imagesOf, type FwProduct } from "@/lib/fourthwall";
import imgProdotti from "@/assets/images/prodotti-inverno.webp";

// Dove si trova ogni prodotto dentro la foto, in percentuale (la foto è 1024x1024).
// Se si cambia la foto vanno rifatte queste cinque coppie di numeri.
const PUNTI: Record<string, { x: number; y: number }> = {
  "maglia-wth-chiara": { x: 27, y: 72 },
  "maglia-wth": { x: 46, y: 67 },
  "taquino-wth": { x: 61, y: 60 },
  "mouse-o-leo": { x: 79, y: 63 },
  "ciabatta-wth": { x: 77, y: 79 },
};

export default function FotoProdotti({ onApertura }: { onApertura?: (aperto: boolean) => void }) {
  const [prodotti, setProdotti] = useState<FwProduct[] | null>(null);
  const [aperto, setAperto] = useState<string | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProducts().then(setProdotti).catch(() => setProdotti([]));
  }, []);

  // avvisa la sezione: mentre leggi una scheda le cartoline ai lati si fermano
  useEffect(() => {
    onApertura?.(aperto !== null);
  }, [aperto, onApertura]);

  // chiudi la scheda cliccando fuori o con Esc
  useEffect(() => {
    if (!aperto) return;
    const fuori = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setAperto(null);
    };
    const tasto = (e: KeyboardEvent) => e.key === "Escape" && setAperto(null);
    document.addEventListener("mousedown", fuori);
    window.addEventListener("keydown", tasto);
    return () => {
      document.removeEventListener("mousedown", fuori);
      window.removeEventListener("keydown", tasto);
    };
  }, [aperto]);

  // mostra un punto solo se quel prodotto è davvero in vendita adesso
  const visibili = (prodotti ?? []).filter((p) => PUNTI[p.slug]);
  const scelto = visibili.find((p) => p.slug === aperto);

  return (
    <div ref={box} className="relative mx-auto w-full max-w-[680px]">
      <img
        src={imgProdotti}
        alt="Le maglie, il taccuino, il tappetino e le ciabatte Wooden Tree House su una roccia innevata"
        loading="lazy"
        decoding="async"
        className="w-full h-auto"
      />

      {visibili.map((p) => {
        const punto = PUNTI[p.slug];
        const attivo = aperto === p.slug;
        return (
          <button
            key={p.slug}
            type="button"
            onClick={() => setAperto(attivo ? null : p.slug)}
            aria-label={`Vedi ${p.name}`}
            aria-expanded={attivo}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center group"
            style={{ left: `${punto.x}%`, top: `${punto.y}%` }}
          >
            <span className={`absolute inline-flex w-5 h-5 rounded-full bg-brand-yellow transition-opacity ${attivo ? "opacity-0" : "opacity-60 animate-ping"}`} />
            <span className={`relative inline-flex w-4 h-4 rounded-full border-2 border-brand-smoke/70 transition-transform group-hover:scale-125 ${attivo ? "bg-brand-offwhite scale-125" : "bg-brand-yellow"}`} />
          </button>
        );
      })}

      <AnimatePresence>
        {scelto && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute z-20 w-[210px] bg-brand-offwhite text-brand-smoke shadow-xl"
            style={{
              // la scheda si apre verso il centro, così non esce mai dalla foto
              left: PUNTI[scelto.slug].x > 55 ? "auto" : `${PUNTI[scelto.slug].x + 4}%`,
              right: PUNTI[scelto.slug].x > 55 ? `${100 - PUNTI[scelto.slug].x + 4}%` : "auto",
              top: PUNTI[scelto.slug].y > 55 ? "auto" : `${PUNTI[scelto.slug].y}%`,
              bottom: PUNTI[scelto.slug].y > 55 ? `${100 - PUNTI[scelto.slug].y}%` : "auto",
            }}
          >
            <button
              type="button"
              onClick={() => setAperto(null)}
              aria-label="Chiudi"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-smoke text-brand-offwhite flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex gap-3 p-3">
              {imagesOf(scelto)[0] && (
                <img src={imagesOf(scelto)[0].url} alt="" className="w-14 h-16 object-cover bg-brand-smoke/5 shrink-0" />
              )}
              <div className="min-w-0">
                <h3 className="font-serif text-sm leading-tight mb-1">{scelto.name}</h3>
                <p className="text-xs font-mono mb-2">
                  {new Set(scelto.variants.map((v) => v.unitPrice.value)).size > 1 ? "da " : ""}
                  {formatPrice(priceFrom(scelto))}
                </p>
                <a
                  href="/shop"
                  className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest text-brand-forest hover:text-brand-smoke"
                >
                  Vedi <ArrowRight className="ml-1 w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
