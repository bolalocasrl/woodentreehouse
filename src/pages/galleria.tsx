import { motion } from "framer-motion";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { AvvisoBozza, SchedaArea, useBozza } from "@/components/galleria/parts";
import { AREE, urlFoto } from "@/content/galleria";

// Tutte le foto delle aree, per il nastro che scorre nell'apertura
const nastro = [...new Map(
  AREE.flatMap((a) => (a.modello === "storia" ? a.tappe.flatMap((t) => t.foto) : a.progetti.flatMap((p) => p.foto)))
    .map((f) => [f.base, f])
).values()];

export default function Galleria() {
  useBozza();
  const realizzazioni = AREE.filter((a) => a.categoria === "realizzazioni");
  const eventi = AREE.filter((a) => a.categoria === "eventi");

  return (
    <div className="min-h-screen bg-brand-offwhite text-brand-smoke font-sans selection:bg-brand-forest selection:text-brand-offwhite">
      <SiteHeader />

      {/* APERTURA */}
      <section className="bg-brand-forest text-brand-offwhite pt-[7rem] md:pt-[10rem] overflow-hidden">
        <motion.div
          className="px-6 md:px-16 pb-12 md:pb-16 max-w-[2000px] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <span className="text-xs font-bold tracking-widest uppercase text-brand-yellow mb-6 block">Galleria</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tighter leading-none mb-8 text-brand-offwhite">
            Storie dalla<br />Casetta
          </h1>
          <div className="w-12 h-[1px] bg-brand-offwhite/40 mb-8" />
          <p className="text-brand-offwhite/80 text-lg leading-relaxed max-w-xl">
            Quello che abbiamo costruito e le feste che abbiamo fatto, dal 2012 a oggi.
            Mettiti comodo e sfoglia.
          </p>
        </motion.div>

        {/* nastro di foto che scorre */}
        <div className="relative border-t border-brand-offwhite/20 py-3 md:py-4">
          <motion.div
            className="flex gap-3 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          >
            {[...nastro, ...nastro].map((foto, i) => (
              <img
                key={i}
                src={urlFoto(foto, 800)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="h-40 md:h-56 w-auto object-cover flex-none"
                style={{ aspectRatio: `${foto.w} / ${foto.h}` }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <main className="border-x border-brand-smoke/20 max-w-[2000px] mx-auto">
        <Blocco titolo="Realizzazioni" etichetta="Costruito da noi" descrizione="La Casetta, il bar su ruote e le scenografie in legno.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
            {realizzazioni.map((area) => (
              <SchedaArea key={area.slug} area={area} />
            ))}
          </div>
        </Blocco>

        <Blocco titolo="Eventi" etichetta="Fatti insieme" descrizione="La festa in Casetta e la Casetta che porta la festa in piazza.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            {eventi.map((area) => (
              <SchedaArea key={area.slug} area={area} />
            ))}
          </div>
        </Blocco>

        <SiteFooter />
      </main>

      <AvvisoBozza />
    </div>
  );
}

function Blocco({ titolo, etichetta, descrizione, children }: { titolo: string; etichetta: string; descrizione: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-brand-smoke/20">
      <div className="px-6 md:px-16 pt-16 md:pt-24 pb-10 md:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-brand-smoke/50 mb-3 block">{etichetta}</span>
          <h2 className="font-serif text-4xl md:text-6xl leading-none">{titolo}</h2>
        </div>
        <p className="text-brand-smoke/60 max-w-sm">{descrizione}</p>
      </div>
      <div className="p-2 md:p-3 pt-0 md:pt-0">{children}</div>
    </section>
  );
}
