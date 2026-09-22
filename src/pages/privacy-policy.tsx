import { useState, useEffect } from "react";
import imgLogo from "@/assets/images/logo-nero.png";

const linkClass = "underline underline-offset-4 hover:text-brand-forest transition-colors";

const sections: { number: string; title: string; body: React.ReactNode }[] = [
  {
    number: "01",
    title: "Tipologie di dati raccolti",
    body: "Tramite il form di iscrizione alla newsletter presente sul sito raccogliamo esclusivamente l'indirizzo email fornito volontariamente dall'utente. Durante la navigazione possono inoltre essere raccolti dati tecnici (ad es. indirizzo IP, tipo di browser e dispositivo, pagine visitate) tramite i log del server e gli strumenti descritti al punto 06. Non raccogliamo dati sensibili, dati di pagamento né dati relativi a minori.",
  },
  {
    number: "02",
    title: "Finalità del trattamento",
    body: "L'indirizzo email è utilizzato per l'invio della newsletter: comunicazioni su eventi, aggiornamenti, novità, offerte e promozioni di Wooden Tree House e del suo shop online. I dati tecnici di navigazione sono utilizzati per garantire il funzionamento e la sicurezza del sito e, ove previsto, per statistiche di utilizzo e per misurare l'efficacia delle nostre campagne pubblicitarie. I dati non vengono venduti né ceduti a terzi per loro finalità autonome.",
  },
  {
    number: "03",
    title: "Base giuridica",
    body: "L'invio della newsletter si basa sul consenso espresso dall'utente al momento dell'iscrizione (art. 6, par. 1, lett. a del GDPR). Il trattamento dei dati tecnici necessari al funzionamento del sito si basa sul legittimo interesse del Titolare (art. 6, par. 1, lett. f del GDPR); l'uso di cookie di statistica e marketing si basa sul consenso dell'utente.",
  },
  {
    number: "04",
    title: "Conservazione dei dati",
    body: (
      <>
        L'indirizzo email viene conservato fino alla revoca del consenso da parte dell'utente. È possibile disiscriversi in qualsiasi momento tramite il link presente in ogni email oppure scrivendo a{" "}
        <a href="mailto:woodentreehouse97@pec.it" className={linkClass}>
          woodentreehouse97@pec.it
        </a>
        . I dati tecnici di navigazione sono conservati per il tempo strettamente necessario alle finalità indicate.
      </>
    ),
  },
  {
    number: "05",
    title: "Diritti dell'interessato",
    body: (
      <>
        In conformità al GDPR (Regolamento UE 2016/679), l'utente ha diritto di: accedere ai propri dati, rettificarli, cancellarli, limitarne od opporsi al trattamento, richiederne la portabilità e revocare il consenso in qualsiasi momento. Per esercitare questi diritti scrivere a{" "}
        <a href="mailto:woodentreehouse97@pec.it" className={linkClass}>
          woodentreehouse97@pec.it
        </a>
        . L'utente ha inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali (
        <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className={linkClass}>
          garanteprivacy.it
        </a>
        ).
      </>
    ),
  },
  {
    number: "06",
    title: "Cookie e strumenti di terze parti",
    body: (
      <>
        Per il funzionamento del sito ci avvaliamo dei seguenti fornitori, che trattano i dati per nostro conto:
        <br /><br />
        <strong>Brevo</strong> (Sendinblue SAS, Francia) — gestione delle iscrizioni e invio della newsletter. Privacy policy:{" "}
        <a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          brevo.com/legal/privacypolicy
        </a>
        .
        <br /><br />
        <strong>Vercel</strong> (Vercel Inc., USA) — hosting del sito e log tecnici del server. Privacy policy:{" "}
        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={linkClass}>
          vercel.com/legal/privacy-policy
        </a>
        .
        <br /><br />
        <strong>Google Tag Manager</strong> (Google Ireland Ltd.) — strumento che gestisce il caricamento di servizi di statistica e di marketing (ad es. Google Analytics, pixel pubblicitari di Google e Meta), i quali possono installare cookie e raccogliere dati di navigazione. Privacy policy:{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={linkClass}>
          policies.google.com/privacy
        </a>
        .
        <br /><br />
        Alcuni di questi fornitori possono trasferire dati al di fuori dell'Unione Europea (in particolare negli Stati Uniti), sulla base delle garanzie previste dal GDPR, come l'EU-US Data Privacy Framework o le clausole contrattuali standard.
      </>
    ),
  },
  {
    number: "07",
    title: "Shop online",
    body: (
      <>
        Il nostro shop online è ospitato sulla piattaforma Fourthwall (
        <a href="https://wooden-tree-house-shop.fourthwall.com" target="_blank" rel="noopener noreferrer" className={linkClass}>
          wooden-tree-house-shop.fourthwall.com
        </a>
        ). I dati forniti durante un acquisto (nome, indirizzo di spedizione, dati di pagamento) sono raccolti e trattati da Fourthwall secondo la propria privacy policy, consultabile sul sito dello shop.
      </>
    ),
  },
  {
    number: "08",
    title: "Modifiche alla presente policy",
    body: "Il Titolare si riserva il diritto di modificare questa Privacy Policy in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con aggiornamento della data in cima.",
  },
];

export default function PrivacyPolicy() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-brand-offwhite text-brand-smoke font-sans selection:bg-brand-forest selection:text-brand-offwhite">

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-brand-offwhite p-4 md:p-8 flex items-center pointer-events-none min-h-[5.5rem] md:min-h-[9rem]">
        <div className="pointer-events-auto absolute left-4 md:left-8 top-1/2 -translate-y-1/2">
          <a href="/" aria-label="Torna alla home">
            <img
              src={imgLogo}
              alt="Wooden Tree House Logo"
              className="h-16 w-auto md:h-20 invert brightness-0"
            />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-brand-forest text-brand-offwhite pt-[5.5rem] md:pt-[9rem] pb-16 md:pb-24 px-6 md:px-16 border-b border-brand-offwhite/20">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-yellow mb-6 block">
            Wooden Tree House APS
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tighter text-brand-offwhite mb-8 leading-none">
            Privacy<br />Policy
          </h1>
          <div className="w-12 h-[1px] bg-brand-offwhite/40 mb-8" />
          <p className="text-brand-offwhite/70 text-xs font-mono uppercase tracking-widest">
            Ultimo aggiornamento: settembre 2026
          </p>
        </div>
      </section>

      {/* BODY */}
      <main className="border-x border-brand-smoke/20 max-w-[2000px] mx-auto bg-brand-offwhite">
        <div className="max-w-3xl mx-auto px-6 md:px-16 py-16 md:py-24">

          {/* Titolare */}
          <div className="border border-brand-smoke/20 p-8 md:p-10 mb-16">
            <h2 className="text-xs font-bold tracking-widest uppercase text-brand-smoke/60 mb-6">
              Titolare del Trattamento
            </h2>
            <p className="font-serif text-xl text-brand-smoke mb-4">WOODEN TREE HOUSE APS</p>
            <ul className="space-y-2 text-sm text-brand-smoke/70">
              <li>Partita IVA: 04354171201</li>
              <li>Codice Fiscale: 91457460375</li>
              <li>
                PEC:{" "}
                <a
                  href="mailto:woodentreehouse97@pec.it"
                  className="underline underline-offset-4 hover:text-brand-forest transition-colors"
                >
                  woodentreehouse97@pec.it
                </a>
              </li>
            </ul>
          </div>

          {/* Sezioni */}
          {sections.map((section) => (
            <div
              key={section.number}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-12 border-b border-brand-smoke/20 last:border-0"
            >
              <div className="md:col-span-3 pt-1">
                <span className="text-xs font-bold tracking-widest uppercase text-brand-smoke/50 font-mono">
                  {section.number}
                </span>
              </div>
              <div className="md:col-span-9">
                <h2 className="font-serif text-2xl md:text-3xl text-brand-smoke mb-5 leading-tight">
                  {section.title}
                </h2>
                <p className="text-brand-smoke/70 leading-relaxed text-base font-normal">
                  {section.body}
                </p>
              </div>
            </div>
          ))}

        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-brand-smoke/20 py-10 px-6 text-center bg-brand-offwhite text-brand-smoke">
        <p className="text-xs text-brand-smoke/60 uppercase tracking-widest mb-5">
          © 2013 WOODEN TREE HOUSE APS — P.IVA 04354171201
        </p>
        <a
          href="/"
          className="text-xs font-bold uppercase tracking-widest text-brand-smoke hover:text-brand-forest transition-colors"
        >
          ← Torna alla home
        </a>
      </footer>

    </div>
  );
}
