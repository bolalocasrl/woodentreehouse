import { ArrowRight } from "lucide-react";
import FotoProdotti from "./FotoProdotti";

// Anteprima dello shop in home: la foto dei prodotti con i punti cliccabili.
export default function ShopTeaser() {
  return (
    <section id="shop" className="p-8 md:p-16 bg-brand-wood text-brand-offwhite">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-6 md:gap-8">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-brand-offwhite/70 mb-2 block">06 — Lo shop</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Maglie e gadget</h2>
          <p className="text-brand-offwhite/80 max-w-md">Stampati su ordinazione, con il logo dell'albero. Per portarti un pezzo di Casetta ovunque.</p>
        </div>
        <a
          href="/shop"
          className="inline-flex items-center border border-brand-offwhite px-5 py-3 text-xs font-bold uppercase tracking-widest text-brand-offwhite hover:bg-brand-offwhite hover:text-brand-wood transition-colors"
        >
          Vai allo shop <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>

      <FotoProdotti />
      <p className="text-center text-xs uppercase tracking-widest text-brand-offwhite/60 mt-6">
        Tocca i punti sulla foto per vedere i prodotti
      </p>

    </section>
  );
}
