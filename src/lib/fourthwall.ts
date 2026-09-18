// Prodotti dello shop Fourthwall, letti tramite la nostra funzione /api/products
// (il token resta sul server, in FOURTHWALL_TOKEN su Vercel).

export const SHOP_URL = "https://wooden-tree-house-shop.fourthwall.com/en-eur";

export type FwImage = { id: string; url: string; width: number; height: number };

export type FwVariant = {
  id: string;
  name: string;
  unitPrice: { value: number; currency: string };
  attributes: {
    color?: { name: string; swatch: string };
    size?: { name: string };
  };
  images: FwImage[];
};

export type FwProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: FwImage[];
  variants: FwVariant[];
};

export async function fetchProducts(): Promise<FwProduct[]> {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error(`Catalogo ${res.status}`);
  const data = await res.json();
  return (data.results ?? []) as FwProduct[];
}

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(value);

// Pagina del prodotto sullo shop, con colore e taglia già selezionati
export const productUrl = (slug: string, variantId?: string) =>
  `${SHOP_URL}/products/${slug}${variantId ? `?variant=${variantId}` : ""}`;

export const priceFrom = (p: FwProduct) =>
  Math.min(...p.variants.map((v) => v.unitPrice.value));

export type ColorOption = { name: string; swatch: string; variants: FwVariant[] };

// Raggruppa le varianti per colore, mantenendo l'ordine dello shop
export function colorsOf(p: FwProduct): ColorOption[] {
  const out: ColorOption[] = [];
  for (const v of p.variants) {
    const name = v.attributes.color?.name ?? "Unico";
    const found = out.find((c) => c.name === name);
    if (found) found.variants.push(v);
    else out.push({ name, swatch: v.attributes.color?.swatch ?? "#121212", variants: [v] });
  }
  return out;
}

// Immagini della variante se ci sono, altrimenti quelle del prodotto
export const imagesOf = (p: FwProduct, color?: ColorOption) => {
  const fromColor = color?.variants.flatMap((v) => v.images) ?? [];
  const unique = [...new Map([...fromColor, ...p.images].map((i) => [i.id, i])).values()];
  return unique.length ? unique : p.images;
};
