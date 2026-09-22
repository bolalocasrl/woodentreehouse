import { useId, useState } from "react";

// Modulo di iscrizione alla newsletter (Brevo, tramite /api/subscribe).
// Usato nella prima schermata della home e nel blocco prima del footer.
export default function NewsletterForm({ className = "" }: { className?: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [stato, setStato] = useState<"idle" | "invio" | "ok" | "errore">("idle");

  const invia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStato("invio");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setEmail("");
        setStato("ok");
        // segnale per Google Tag Manager (campagne pubblicitarie)
        (window as unknown as { dataLayer?: object[] }).dataLayer?.push({ event: "iscrizione_newsletter" });
      } else {
        setStato("errore");
      }
    } catch (error) {
      console.error("Errore iscrizione newsletter", error);
      setStato("errore");
    }
    setTimeout(() => setStato((s) => (s === "invio" ? s : "idle")), 4000);
  };

  const occupato = stato === "invio" || stato === "ok";

  return (
    <div className={className}>
      <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border border-brand-offwhite/50" onSubmit={invia}>
        <label htmlFor={id} className="sr-only">La tua email</label>
        <input
          id={id}
          type="email"
          placeholder="LA TUA EMAIL"
          autoComplete="email"
          className="flex-1 bg-transparent border-none px-4 py-3 text-sm focus:ring-0 placeholder:text-brand-offwhite/60 text-brand-offwhite disabled:opacity-50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={occupato}
          required
        />
        <button
          type="submit"
          disabled={occupato}
          className="bg-brand-offwhite text-brand-smoke px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-brand-yellow transition-colors disabled:opacity-70 disabled:hover:bg-brand-offwhite min-w-[110px]"
        >
          {stato === "invio" ? "..." : stato === "ok" ? "✔ Iscritto" : stato === "errore" ? "✗ Riprova" : "Iscriviti"}
        </button>
      </form>
      <p className="text-xs text-brand-offwhite/60 mt-3 text-center" aria-live="polite">
        {stato === "ok" ? (
          "Grazie! Ti scriveremo solo quando c'è qualcosa da raccontare."
        ) : (
          <>
            Iscrivendoti accetti la nostra{" "}
            <a href="/privacy-policy" className="underline underline-offset-2 hover:text-brand-offwhite transition-colors">
              Privacy Policy
            </a>
          </>
        )}
      </p>
    </div>
  );
}
