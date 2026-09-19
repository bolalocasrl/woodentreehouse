import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AreaProgetti, Progetto } from "@/content/galleria";
import Lightbox from "./Lightbox";
import FotoImg from "./FotoImg";
import { AltreAree, EtichettaEsempio, GalleryHero } from "./parts";

const WHATSAPP = "https://wa.me/34632854055";

// Modello "I progetti": griglia di copertine, ogni progetto ha la sua pagina
export default function ProgettiTemplate({ area }: { area: AreaProgetti }) {
  return (
    <>
      <GalleryHero
        foto={area.copertina}
        etichetta={area.etichetta}
        titolo={area.titolo}
        sottotitolo={area.intro}
        meta={`${area.progetti.length} progetti`}
        indietro={{ label: "Galleria", href: "/galleria" }}
      />

      <main className="border-x border-brand-smoke/20 max-w-[2000px] mx-auto bg-brand-offwhite">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 p-2 md:p-3">
          {area.progetti.map((progetto, i) => (
            <motion.a
              key={progetto.slug}
              href={`/galleria/${area.slug}/${progetto.slug}`}
              className="group relative block overflow-hidden bg-brand-wood aspect-[4/5]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: "easeOut" }}
            >
              <FotoImg
                foto={progetto.foto[0]}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-smoke/80 via-brand-smoke/10 to-transparent group-hover:from-brand-wood/95 transition-colors duration-500" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-brand-offwhite">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] uppercase tracking-widest border border-brand-offwhite/50 px-2 py-0.5 rounded-full">{progetto.anno}</span>
                  <span className="text-[10px] uppercase tracking-widest border border-brand-offwhite/50 px-2 py-0.5 rounded-full">{progetto.foto.length} foto</span>
                  {progetto.daConfermare && <span className="text-[10px] uppercase tracking-widest bg-brand-yellow text-brand-smoke px-2 py-0.5">Da confermare</span>}
                </div>
                <h2 className="font-serif text-3xl md:text-4xl leading-none mb-2 text-brand-offwhite">{progetto.titolo}</h2>
                <p className="text-sm text-brand-offwhite/80 mb-4">{progetto.luogo}</p>
                <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest">
                  Guarda il progetto <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <ContattaciAllestimenti />
        <AltreAree corrente={area.slug} />
      </main>
    </>
  );
}

export function ProgettoDettaglio({ area, progetto }: { area: AreaProgetti; progetto: Progetto }) {
  const [aperta, setAperta] = useState<number | null>(null);
  const i = area.progetti.findIndex((p) => p.slug === progetto.slug);
  const precedente = area.progetti[(i - 1 + area.progetti.length) % area.progetti.length];
  const successivo = area.progetti[(i + 1) % area.progetti.length];

  return (
    <>
      <GalleryHero
        foto={progetto.foto[0]}
        etichetta={`${area.titolo} — ${progetto.anno}`}
        titolo={progetto.titolo}
        sottotitolo={progetto.testo}
        meta={`${progetto.luogo} · ${progetto.foto.length} foto`}
        indietro={{ label: `Tutti gli ${area.titolo.toLowerCase()}`, href: `/galleria/${area.slug}` }}
      />

      <main className="border-x border-brand-smoke/20 max-w-[2000px] mx-auto bg-brand-offwhite">
        {progetto.daConfermare && (
          <p className="px-6 md:px-16 pt-10 text-sm text-brand-smoke/60">
            Testo del progetto <EtichettaEsempio />
          </p>
        )}

        {/* FOTO in colonne, ognuna con le sue proporzioni */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-2 md:gap-3 p-2 md:p-3">
          {progetto.foto.map((foto, index) => (
            <motion.button
              type="button"
              key={`${foto.base}-${index}`}
              onClick={() => setAperta(index)}
              className="group relative block w-full mb-2 md:mb-3 overflow-hidden break-inside-avoid bg-brand-smoke/10"
              style={{ aspectRatio: `${foto.w} / ${foto.h}` }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <FotoImg
                foto={foto}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>

        {/* altri progetti */}
        {area.progetti.length > 1 && (
          <nav className="grid grid-cols-2 border-t border-brand-smoke/20">
            <a href={`/galleria/${area.slug}/${precedente.slug}`} className="p-8 md:p-12 border-r border-brand-smoke/20 hover:bg-brand-smoke/5 transition-colors">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-smoke/50 block mb-2">← Precedente</span>
              <span className="font-serif text-xl md:text-3xl">{precedente.titolo}</span>
            </a>
            <a href={`/galleria/${area.slug}/${successivo.slug}`} className="p-8 md:p-12 text-right hover:bg-brand-smoke/5 transition-colors">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-smoke/50 block mb-2">Successivo →</span>
              <span className="font-serif text-xl md:text-3xl">{successivo.titolo}</span>
            </a>
          </nav>
        )}

        <ContattaciAllestimenti />
      </main>

      <Lightbox
        foto={progetto.foto}
        index={aperta}
        didascalia={`${progetto.titolo} — ${progetto.luogo}, ${progetto.anno}`}
        onClose={() => setAperta(null)}
      />
    </>
  );
}

function ContattaciAllestimenti() {
  return (
    <section className="bg-brand-wood text-brand-offwhite p-8 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div>
        <span className="text-xs font-bold tracking-widest uppercase text-brand-offwhite/50 mb-4 block">Su richiesta</span>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight text-brand-offwhite">
          Hai un evento o uno spazio<br />da trasformare?
        </h2>
      </div>
      <Button asChild variant="outline" className="bg-transparent text-brand-offwhite border-brand-offwhite hover:bg-brand-offwhite hover:text-brand-wood rounded-none self-start md:self-auto">
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
          Contattaci per collaborare <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </Button>
    </section>
  );
}
