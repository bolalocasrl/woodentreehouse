// Funzione Vercel: iscrive un'email alla newsletter Brevo.
// La chiave API resta sul server e non finisce mai nel codice del sito.

const BREVO_LIST_ID = 2;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  // BREVO_API_KEY è quella nuova; VITE_BREVO_API_KEY è il fallback finché non viene rimossa
  const apiKey = process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY;
  if (!apiKey) {
    console.error("Brevo API key mancante");
    return res.status(500).json({ ok: false });
  }

  const email = String(req.body?.email ?? "").trim().toLowerCase();
  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    return res.status(400).json({ ok: false, error: "invalid_email" });
  }

  try {
    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({ email, listIds: [BREVO_LIST_ID], updateEnabled: true }),
    });

    if (brevoRes.ok) {
      return res.status(200).json({ ok: true });
    }

    const data = await brevoRes.json().catch(() => ({}));
    const alreadyExists =
      data?.code === "duplicate_parameter" ||
      (typeof data?.message === "string" &&
        data.message.toLowerCase().includes("already exist"));

    if (alreadyExists) {
      return res.status(200).json({ ok: true });
    }

    console.error("Errore Brevo", brevoRes.status, data?.code);
    return res.status(502).json({ ok: false });
  } catch (error) {
    console.error("Errore chiamata Brevo", error);
    return res.status(502).json({ ok: false });
  }
}
