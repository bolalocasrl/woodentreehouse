import { useCallback, useState } from "react";
import { ArrowRight } from "lucide-react";
import FotoProdotti from "./FotoProdotti";
import PioggiaFoto from "./PioggiaFoto";

// Anteprima dello shop in home: la foto dei prodotti con i punti cliccabili.
// Da pc, ai lati scendono le cartoline dei viaggi: riempiono lo spazio vuoto
// che resta a destra e a sinistra, visto che la foto è quadrata.
export default function ShopTeaser() {
  const [schedaAperta, setSchedaAperta] = useState(false);
  const fermaPioggia = useCallback((aperto: boolean) => setSchedaAperta(aperto), []);

  return (
    <section id="shop" className="p-8 md:p-16 bg-brand-wood text-brand-offwhite">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-6 md:gap-8">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-brand-offwhite/70 mb-2 block">06 — Lo shop</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Maglie e gadget</h2>
          <p className="text-brand-offwhite/80 max-w-md">Stampati su ordinazione, con il logo dell'albero. Per portarti un pezzo di Casetta ovunque.</p>
        </div>
        {/* da pc il suggerimento sta qui, dove prima c'era il pulsante */}
        <p className="hidden md:block text-xs uppercase tracking-widest leading-relaxed text-brand-offwhite/60 text-right shrink-0">
          Tocca i punti sulla foto<br />per vedere i prodotti
        </p>
      </div>

      {/* Da telefono la foto arriva ai bordi dello schermo: -mx-8 annulla il margine
          della sezione. Da pc resta al centro, con le cartoline che scendono ai lati. */}
      <div className="-mx-8 md:mx-0 lg:grid lg:grid-cols-[1fr_minmax(0,680px)_1fr] lg:gap-10 lg:items-stretch">
        <div className="hidden lg:block relative">
          <PioggiaFoto lato="sinistra" ferma={schedaAperta} />
        </div>

        <FotoProdotti onApertura={fermaPioggia} />

        <div className="hidden lg:block relative">
          <PioggiaFoto lato="destra" ferma={schedaAperta} />
        </div>
      </div>

      {/* da telefono il suggerimento va sotto la foto */}
      <p className="md:hidden text-center text-xs uppercase tracking-widest text-brand-offwhite/60 mt-6">
        Tocca i punti sulla foto per vedere i prodotti
      </p>

      <div className="flex justify-center mt-8 md:mt-12">
        <a
          href="/shop"
          className="inline-flex items-center border border-brand-offwhite px-6 py-3 text-xs font-bold uppercase tracking-widest text-brand-offwhite hover:bg-brand-offwhite hover:text-brand-wood transition-colors"
        >
          Vai allo shop <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
