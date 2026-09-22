export default function SiteFooter() {
  return (
    <footer className="border-t border-brand-smoke/20 p-8 md:p-16 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 bg-brand-offwhite text-brand-smoke">
      <div>
        <h4 className="font-serif text-xl mb-2">Wooden Tree House</h4>
        <p className="text-sm text-brand-smoke/60 max-w-xs mb-3">
          Sogni intagliati nel legno, avventure vissute insieme.
        </p>
        <p className="text-xs text-brand-smoke/50">WOODEN TREE HOUSE APS — P.IVA 04354171201</p>
      </div>
      <div className="flex flex-col items-center md:items-end gap-4">
        <a href="/" className="text-xs font-bold uppercase tracking-widest hover:text-brand-forest transition-colors">
          ← Torna alla home
        </a>
        <a href="/privacy-policy" className="text-xs text-brand-smoke/50 hover:text-brand-smoke transition-colors underline underline-offset-4">
          Privacy Policy
        </a>
        <p className="text-xs text-brand-smoke/60">© 2013 WOODEN TREE HOUSE APS. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
}
