import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import imgLogo from "@/assets/images/logo-nero.png";
import {
  fetchProducts,
  formatPrice,
  priceFrom,
  colorsOf,
  imagesOf,
  productUrl,
  SHOP_URL,
  type FwProduct,
  type ColorOption,
} from "@/lib/fourthwall";

export default function Shop() {
  const [products, setProducts] = useState<FwProduct[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [openProduct, setOpenProduct] = useState<FwProduct | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((error) => {
        console.error("Errore caricamento prodotti", error);
        setIsError(true);
      });
  }, []);

  useEffect(() => {
    document.body.style.overflow = openProduct ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openProduct]);

  return (
    <div className="min-h-screen bg-brand-offwhite text-brand-smoke font-sans selection:bg-brand-forest selection:text-brand-offwhite">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-brand-offwhite p-4 md:p-8 flex justify-end items-center pointer-events-none min-h-[5.5rem] md:min-h-[9rem]">
        <div className="pointer-events-auto absolute left-4 md:left-8 top-1/2 -translate-y-1/2">
          <a href="/" aria-label="Torna alla home">
            <img src={imgLogo} alt="Wooden Tree House Logo" className="h-16 w-auto md:h-20 invert brightness-0" />
          </a>
        </div>
        <nav className="pointer-events-auto hidden md:flex gap-6 text-sm font-medium tracking-wide uppercase">
          <a href="/" className="hover:underline underline-offset-4">Il sito</a>
          <a href="/#eventi" className="hover:underline underline-offset-4">Eventi</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="bg-brand-forest text-brand-offwhite pt-[5.5rem] md:pt-[9rem] pb-16 md:pb-24 px-6 md:px-16 border-b border-brand-offwhite/20">
        <div className="max-w-[2000px] mx-auto">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-yellow mb-6 block">
            Brand Equipment
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tighter text-brand-offwhite mb-8 leading-none">
            Lo shop<br />della Casetta
          </h1>
          <div className="w-12 h-[1px] bg-brand-offwhite/40 mb-8" />
          <p className="text-brand-offwhite/80 text-lg leading-relaxed max-w-xl font-normal">
            Maglie, ciabatte e taccuini con il logo dell'albero. Ogni pezzo è stampato su ordinazione:
            lo produciamo quando lo ordini, senza magazzino e senza sprechi.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {["Stampa su ordinazione", "Spedizione in 5–11 giorni", "Pagamento sicuro"].map((label) => (
              <span
                key={label}
                className="text-xs uppercase tracking-widest border border-brand-offwhite/50 px-3 py-1 rounded-full text-brand-offwhite/90"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* GRIGLIA PRODOTTI */}
      <main className="border-x border-brand-smoke/20 max-w-[2000px] mx-auto bg-brand-offwhite">
        {isError && (
          <div className="p-8 md:p-16 text-center">
            <h2 className="font-serif text-2xl md:text-3xl mb-4">Il catalogo non si carica</h2>
            <p className="text-brand-smoke/70 mb-8">Puoi sempre vedere i prodotti direttamente sullo shop.</p>
            <Button asChild variant="outline" className="rounded-none border-brand-smoke text-brand-smoke hover:bg-brand-smoke hover:text-brand-offwhite">
              <a href={SHOP_URL} target="_blank" rel="noopener noreferrer">
                Vai allo shop <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        )}

        {!isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 -mr-px">
            {products
              ? products.map((product) => (
                  <ProductCard key={product.id} product={product} onOpen={() => setOpenProduct(product)} />
                ))
              : Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-brand-offwhite border-b border-r border-brand-smoke/20">
                    <div className="aspect-[4/5] bg-brand-smoke/5 animate-pulse" />
                    <div className="p-6">
                      <div className="h-4 w-32 bg-brand-smoke/10 mb-3 animate-pulse" />
                      <div className="h-3 w-16 bg-brand-smoke/10 animate-pulse" />
                    </div>
                  </div>
                ))}
          </div>
        )}

        {/* NOTA */}
        <section className="p-8 md:p-16 text-center">
          <p className="text-brand-smoke/60 text-sm max-w-xl mx-auto leading-relaxed">
            Il pagamento e la spedizione sono gestiti dal nostro negozio ufficiale su Fourthwall.
            I prezzi sono in euro, tasse e spedizione si calcolano alla cassa.
          </p>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-brand-smoke/20 p-8 md:p-16 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h4 className="font-serif text-xl mb-2">Wooden Tree House</h4>
            <p className="text-sm text-brand-smoke/60 max-w-xs mb-3">
              Sogni intagliati nel legno, avventure vissute insieme.
            </p>
            <p className="text-xs text-brand-smoke/50">WOODEN TREE HOUSE APS — P.IVA 04354171201</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <a href="/" className="text-xs font-bold uppercase tracking-widest hover:text-brand-forest transition-colors">
              ← Torna al sito
            </a>
            <a href="/privacy-policy" className="text-xs text-brand-smoke/50 hover:text-brand-smoke transition-colors underline underline-offset-4">
              Privacy Policy
            </a>
            <p className="text-xs text-brand-smoke/40">© 2013 WOODEN TREE HOUSE APS. All rights reserved.</p>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {openProduct && <ProductDetail product={openProduct} onClose={() => setOpenProduct(null)} />}
      </AnimatePresence>
    </div>
  );
}

function ProductCard({ product, onOpen }: { product: FwProduct; onOpen: () => void }) {
  const colors = useMemo(() => colorsOf(product), [product]);
  const images = imagesOf(product);
  const hasMultiplePrices = new Set(product.variants.map((v) => v.unitPrice.value)).size > 1;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group bg-brand-offwhite text-left w-full border-b border-r border-brand-smoke/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-smoke/5">
        <img
          src={images[0]?.url}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        />
        {images[1] && (
          <img
            src={images[1].url}
            alt=""
            loading="lazy"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        <span className="absolute bottom-4 left-4 bg-brand-smoke text-brand-offwhite px-3 py-1 text-xs font-bold uppercase tracking-wider group-hover:opacity-0 transition-opacity">
          {product.name}
        </span>
      </div>
      <div className="p-6 flex items-start justify-between gap-4 border-t border-brand-smoke/20">
        <div>
          <h3 className="font-serif text-xl md:text-2xl leading-tight mb-2">{product.name}</h3>
          <div className="flex gap-2">
            {colors.length > 1 &&
              colors.map((color) => (
                <span
                  key={color.name}
                  title={color.name}
                  className="w-4 h-4 rounded-full border border-brand-smoke/30"
                  style={{ backgroundColor: color.swatch }}
                />
              ))}
          </div>
        </div>
        <span className="text-sm font-mono whitespace-nowrap pt-1">
          {hasMultiplePrices ? "da " : ""}
          {formatPrice(priceFrom(product))}
        </span>
      </div>
    </button>
  );
}

function ProductDetail({ product, onClose }: { product: FwProduct; onClose: () => void }) {
  const colors = useMemo(() => colorsOf(product), [product]);
  const [color, setColor] = useState<ColorOption>(colors[0]);
  const [sizeName, setSizeName] = useState<string | null>(null);

  const images = imagesOf(product, color);
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => setImageIndex(0), [color]);

  const sizes = color.variants.filter((v) => v.attributes.size);
  const variant = sizes.length
    ? color.variants.find((v) => v.attributes.size?.name === sizeName)
    : color.variants[0];
  const price = variant?.unitPrice.value ?? priceFrom(product);
  const needsSize = sizes.length > 0 && !sizeName;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-brand-smoke/80 backdrop-blur-sm overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-brand-offwhite text-brand-smoke max-w-6xl mx-auto my-0 md:my-12 min-h-screen md:min-h-0 border border-brand-smoke/20"
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        exit={{ y: 40 }}
        transition={{ type: "tween", duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-brand-smoke/20 sticky top-0 bg-brand-offwhite z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-smoke/50">Gadget WTH</span>
          <button type="button" onClick={onClose} aria-label="Chiudi" className="p-2 hover:text-brand-forest transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* GALLERIA */}
          <div className="border-b lg:border-b-0 lg:border-r border-brand-smoke/20">
            <div className="aspect-[4/5] bg-brand-smoke/5 overflow-hidden">
              <img src={images[imageIndex]?.url} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-px bg-brand-smoke/20 overflow-x-auto">
                {images.slice(0, 6).map((image, i) => (
                  <button
                    type="button"
                    key={image.id}
                    onClick={() => setImageIndex(i)}
                    className={`w-20 flex-none aspect-[4/5] bg-brand-offwhite ${i === imageIndex ? "opacity-100" : "opacity-50 hover:opacity-100"} transition-opacity`}
                  >
                    <img src={image.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETTAGLI */}
          <div className="p-8 md:p-12 flex flex-col">
            <h2 className="font-serif text-3xl md:text-5xl leading-none mb-4">{product.name}</h2>
            <p className="text-2xl font-mono mb-8">{formatPrice(price)}</p>

            <div
              className="text-brand-smoke/70 leading-relaxed space-y-3 mb-8 [&_p]:mb-3"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            {colors.length > 1 && (
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-smoke/50 mb-3">
                  Colore — <span className="text-brand-smoke">{color.name}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {colors.map((option) => (
                    <button
                      type="button"
                      key={option.name}
                      onClick={() => {
                        setColor(option);
                        setSizeName(null);
                      }}
                      title={option.name}
                      aria-label={option.name}
                      className={`w-9 h-9 rounded-full border transition-transform ${
                        option.name === color.name
                          ? "border-brand-smoke scale-110"
                          : "border-brand-smoke/30 hover:scale-105"
                      }`}
                      style={{ backgroundColor: option.swatch }}
                    />
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-smoke/50 mb-3">Taglia</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((v) => {
                    const name = v.attributes.size!.name;
                    return (
                      <button
                        type="button"
                        key={v.id}
                        onClick={() => setSizeName(name)}
                        className={`min-w-[3rem] px-3 py-2 text-sm border transition-colors ${
                          sizeName === name
                            ? "bg-brand-forest text-brand-offwhite border-brand-forest"
                            : "border-brand-smoke/30 hover:border-brand-smoke"
                        }`}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-auto pt-4">
              {needsSize ? (
                <div className="w-full h-14 flex items-center justify-center border border-brand-smoke/20 text-xs uppercase tracking-widest font-bold text-brand-smoke/40">
                  Scegli la taglia
                </div>
              ) : (
                <Button
                  asChild
                  className="w-full rounded-none bg-brand-forest text-brand-offwhite hover:bg-brand-smoke h-14 text-xs uppercase tracking-widest font-bold"
                >
                  <a href={productUrl(product.slug, variant?.id)} target="_blank" rel="noopener noreferrer">
                    Acquista <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              )}
              <p className="text-xs text-brand-smoke/50 mt-3 text-center">
                Si apre il nostro negozio ufficiale, con colore e taglia già selezionati.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
