import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AREE, GALLERIA_IN_BOZZA, type Area, type Foto } from "@/content/galleria";
import FotoImg from "./FotoImg";

// Finché la galleria è in bozza: niente indicizzazione su Google
export function useBozza() {
  useEffect(() => {
    if (!GALLERIA_IN_BOZZA) return;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
}

export function AvvisoBozza() {
  if (!GALLERIA_IN_BOZZA) return null;
  return (
    <div className="fixed bottom-4 left-4 z-[60] bg-brand-yellow text-brand-smoke text-[11px] font-bold uppercase tracking-widest px-3 py-2 shadow-lg">
      Bozza — testi da confermare
    </div>
  );
}

export function EtichettaEsempio() {
  if (!GALLERIA_IN_BOZZA) return null;
  return (
    <span className="inline-block align-middle ml-3 text-[10px] font-bold uppercase tracking-widest border border-brand-wood text-brand-wood px-2 py-0.5">
      Da confermare
    </span>
  );
}

type HeroProps = {
  foto: Foto;
  etichetta: string;
  titolo: string;
  sottotitolo?: string;
  meta?: string;
  indietro?: { label: string; href: string };
};

export function GalleryHero({ foto, etichetta, titolo, sottotitolo, meta, indietro }: HeroProps) {
  return (
    <section className="relative min-h-[80vh] md:min-h-[85vh] flex items-end overflow-hidden bg-brand-forest text-brand-offwhite">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <FotoImg foto={foto} sizes="100vw" fetchPriority="high" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-smoke/85 via-brand-smoke/40 to-brand-smoke/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-smoke/60 via-brand-smoke/10 to-transparent" />

      <motion.div
        className="relative z-10 w-full max-w-[2000px] mx-auto px-6 md:px-16 pb-16 md:pb-24 pt-[7rem] md:pt-[10rem]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
      >
        {indietro && (
          <a href={indietro.href} className="inline-block text-xs font-bold uppercase tracking-widest text-brand-offwhite/70 hover:text-brand-offwhite mb-8">
            ← {indietro.label}
          </a>
        )}
        <span className="text-xs font-bold tracking-widest uppercase text-brand-yellow mb-6 block">{etichetta}</span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tighter text-brand-offwhite mb-8 leading-none max-w-4xl">
          {titolo}
        </h1>
        <div className="w-12 h-[1px] bg-brand-offwhite/60 mb-8" />
        {sottotitolo && <p className="text-brand-offwhite/90 text-lg leading-relaxed max-w-xl font-normal">{sottotitolo}</p>}
        {meta && <p className="text-xs font-mono uppercase tracking-widest text-brand-offwhite/60 mt-6">{meta}</p>}
      </motion.div>
    </section>
  );
}

// Collage di foto: la disposizione cambia in base a quante sono
export function Collage({ foto, onOpen }: { foto: Foto[]; onOpen: (index: number) => void }) {
  // 1 foto: larga. 2: grande + stretta. 3 o più: grande a sinistra, due a destra,
  // le altre sotto a gruppi di tre; l'ultima riga si allarga per non lasciare buchi.
  const layout = (i: number) => {
    const n = foto.length;
    if (n === 1) return "col-span-6 aspect-[16/10]";
    if (n === 2) return i === 0 ? "col-span-6 md:col-span-4 aspect-[4/3] md:aspect-auto" : "col-span-6 md:col-span-2 aspect-[4/3] md:aspect-[3/4]";
    if (i === 0) return "col-span-6 md:col-span-4 md:row-span-2 aspect-[4/3] md:aspect-auto";
    if (i <= 2) return "col-span-3 md:col-span-2 aspect-square";
    const resto = (n - 3) % 3;
    const nellUltimaRiga = i >= n - resto;
    if (resto === 1 && nellUltimaRiga) return "col-span-6 aspect-[16/9] md:aspect-[21/9]";
    if (resto === 2 && nellUltimaRiga) return "col-span-3 aspect-[4/3]";
    return "col-span-3 md:col-span-2 aspect-square";
  };

  return (
    <div className="grid grid-cols-6 gap-2 md:gap-3">
      {foto.map((f, i) => (
        <motion.button
          type="button"
          key={`${f.base}-${i}`}
          onClick={() => onOpen(i)}
          className={`group relative overflow-hidden bg-brand-smoke/10 ${layout(i)}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: Math.min(i, 4) * 0.08, ease: "easeOut" }}
        >
          <FotoImg
            foto={f}
            sizes={foto.length === 1 || i === 0 ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 50vw"}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-brand-smoke/0 group-hover:bg-brand-smoke/10 transition-colors" />
        </motion.button>
      ))}
    </div>
  );
}

// Schede delle altre aree, in fondo alle pagine
export function AltreAree({ corrente }: { corrente: string }) {
  const altre = AREE.filter((a) => a.slug !== corrente);
  return (
    <section className="border-t border-brand-smoke/20 p-8 md:p-16 bg-brand-offwhite">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-brand-smoke/50 mb-2 block">Galleria</span>
          <h2 className="font-serif text-3xl md:text-4xl">Continua a esplorare</h2>
        </div>
        <a href="/galleria" className="text-xs font-bold uppercase tracking-widest hover:text-brand-forest whitespace-nowrap">
          Tutta la galleria →
        </a>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
        {altre.map((area) => (
          <SchedaArea key={area.slug} area={area} compatta />
        ))}
      </div>
    </section>
  );
}

export function SchedaArea({ area, compatta = false }: { area: Area; compatta?: boolean }) {
  return (
    <a href={`/galleria/${area.slug}`} className="group relative block overflow-hidden bg-brand-forest aspect-[4/5]">
      <FotoImg
        foto={area.copertina}
        sizes={compatta ? "(min-width: 1024px) 25vw, 50vw" : "(min-width: 768px) 50vw, 100vw"}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-smoke/80 via-brand-smoke/20 to-transparent group-hover:from-brand-forest/90 transition-colors duration-500" />
      <div className={`absolute inset-0 flex flex-col justify-end text-brand-offwhite ${compatta ? "p-4 md:p-6" : "p-6 md:p-10"}`}>
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-yellow mb-2">{area.etichetta}</span>
        <h3 className={`font-serif leading-none mb-3 text-brand-offwhite ${compatta ? "text-xl md:text-2xl" : "text-3xl md:text-5xl"}`}>{area.titolo}</h3>
        {!compatta && (
          <p className="text-brand-offwhite/80 text-sm md:text-base leading-relaxed max-w-md mb-4 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500">
            {area.intro}
          </p>
        )}
        <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest">
          {area.modello === "storia" ? "Guarda la storia" : "Guarda i progetti"} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}
