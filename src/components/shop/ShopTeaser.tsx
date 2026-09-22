import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { fetchProducts, formatPrice, priceFrom, imagesOf, type FwProduct } from "@/lib/fourthwall";

// Anteprima dello shop in home: i primi prodotti veri, letti da Fourthwall.
// Se il catalogo non si carica, mostra solo il pulsante verso /shop.
export default function ShopTeaser() {
  const [prodotti, setProdotti] = useState<FwProduct[] | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((p) => setProdotti(p.slice(0, 4)))
      .catch(() => setProdotti([]));
  }, []);

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

      {prodotti === null ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-brand-offwhite/10 animate-pulse" />
          ))}
        </div>
      ) : (
        prodotti.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {prodotti.map((p) => {
              const img = imagesOf(p)[0];
              const piuPrezzi = new Set(p.variants.map((v) => v.unitPrice.value)).size > 1;
              return (
                <a key={p.id} href="/shop" className="group block bg-brand-offwhite text-brand-smoke">
                  <div className="aspect-[4/5] overflow-hidden bg-brand-smoke/5">
                    {img && (
                      <img
                        src={img.url}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-3 md:p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
                    <h3 className="font-serif text-base md:text-lg leading-tight">{p.name}</h3>
                    <span className="text-xs md:text-sm font-mono whitespace-nowrap pt-0.5">
                      {piuPrezzi ? "da " : ""}
                      {formatPrice(priceFrom(p))}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )
      )}
    </section>
  );
}
