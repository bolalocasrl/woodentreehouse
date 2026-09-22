import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import imgLogo from "@/assets/images/logo-nero.png";

const VOCI = [
  { label: "La Casetta", href: "#casetta" },
  { label: "Casetta Alcolica", href: "#alcolica" },
  { label: "Allestimenti", href: "#allestimenti" },
  { label: "Eventi", href: "#eventi" },
  { label: "Galleria", href: "/galleria" },
  { label: "Shop", href: "/shop" },
];

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Header della home: trasparente sopra la foto; scorrendo diventa una barra panna
// che si nasconde quando scendi e ricompare quando risali. Su telefono: menu a tutto schermo.
export default function HomeHeader() {
  const [inCima, setInCima] = useState(true);
  const [nascosto, setNascosto] = useState(false);
  const [aperto, setAperto] = useState(false);

  useEffect(() => {
    let ultimo = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setInCima(y < 60);
      setNascosto(y > 300 && y > ultimo + 4);
      if (y < ultimo - 4) setNascosto(false);
      ultimo = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = aperto ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAperto(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [aperto]);

  const chiaro = inCima; // testo chiaro sopra la foto di apertura

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 px-4 md:px-8 flex items-center justify-between transition-all duration-500 ${
          nascosto && !aperto ? "-translate-y-full" : "translate-y-0"
        } ${
          chiaro
            ? "text-brand-offwhite min-h-[5.5rem] md:min-h-[8rem]"
            : "bg-brand-offwhite/95 backdrop-blur-sm border-b border-brand-smoke/15 text-brand-smoke min-h-[4rem] md:min-h-[4.5rem]"
        }`}
      >
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="Torna all'inizio">
          <img
            src={imgLogo}
            alt="Wooden Tree House"
            className={`w-auto transition-all duration-500 ${chiaro ? "h-14 md:h-20 invert brightness-0 drop-shadow-lg" : "h-10 md:h-12"}`}
          />
        </a>

        <nav className="hidden md:flex gap-6 text-sm font-medium tracking-wide uppercase">
          {VOCI.map((v) => (
            <a key={v.href} href={v.href} className="hover:underline underline-offset-4">
              {v.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setAperto(true)}
          aria-label="Apri il menu"
          aria-expanded={aperto}
          className="md:hidden p-2 -mr-2"
        >
          <Menu className="w-7 h-7" />
        </button>
      </header>

      <AnimatePresence>
        {aperto && (
          <motion.div
            className="fixed inset-0 z-[60] bg-brand-forest text-brand-offwhite flex flex-col md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between px-4 min-h-[5.5rem]">
              <img src={imgLogo} alt="Wooden Tree House" className="h-14 w-auto invert brightness-0" />
              <button type="button" onClick={() => setAperto(false)} aria-label="Chiudi il menu" className="p-2 -mr-2">
                <X className="w-7 h-7" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {VOCI.map((v, i) => (
                <motion.a
                  key={v.href}
                  href={v.href}
                  onClick={() => setAperto(false)}
                  className="font-serif text-4xl py-2 border-b border-brand-offwhite/15 flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  {v.label}
                  <span className="text-brand-yellow text-lg">→</span>
                </motion.a>
              ))}
            </nav>
            <div className="px-8 pb-10 flex items-center justify-between text-xs uppercase tracking-widest text-brand-offwhite/70">
              <a href="https://www.instagram.com/wooden_tree_house/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-offwhite">
                <Instagram className="w-4 h-4" /> Instagram
              </a>
              <span>San Giovanni in Persiceto</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
