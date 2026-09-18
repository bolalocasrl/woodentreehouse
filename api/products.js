// Funzione Vercel: legge il catalogo dello shop Fourthwall.
// Il token resta sul server; il sito chiama solo /api/products.

const API = "https://storefront-api.fourthwall.com/v1";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false });
  }

  const token = process.env.FOURTHWALL_TOKEN;
  if (!token) {
    console.error("FOURTHWALL_TOKEN mancante");
    return res.status(500).json({ ok: false });
  }

  try {
    const response = await fetch(
      `${API}/collections/all/products?storefront_token=${token}&currency=EUR`
    );

    if (!response.ok) {
      console.error("Errore Fourthwall", response.status);
      return res.status(502).json({ ok: false });
    }

    const data = await response.json();
    // 5 minuti di cache sulla CDN, con aggiornamento in background
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
    return res.status(200).json({ results: data.results ?? [] });
  } catch (error) {
    console.error("Errore chiamata Fourthwall", error);
    return res.status(502).json({ ok: false });
  }
}
