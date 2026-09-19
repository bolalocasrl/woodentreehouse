import { useEffect, useState } from "react";
import imgLogo from "@/assets/images/logo-nero.png";
import { GALLERIA_IN_BOZZA } from "@/content/galleria";

type Props = {
  links?: { label: string; href: string }[];
};

const DEFAULT_LINKS = [
  { label: "Il sito", href: "/" },
  ...(GALLERIA_IN_BOZZA ? [] : [{ label: "Galleria", href: "/galleria" }]),
  { label: "Shop", href: "/shop" },
];

// Header delle pagine interne: chiaro sopra la foto di apertura, barra panna quando si scorre
export default function SiteHeader({ links = DEFAULT_LINKS }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > window.innerHeight * 0.6);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-4 md:px-8 flex justify-end items-center transition-all duration-500 ${
        isScrolled
          ? "bg-brand-offwhite/95 backdrop-blur-sm border-b border-brand-smoke/20 text-brand-smoke min-h-[4.5rem] md:min-h-[5.5rem]"
          : "text-brand-offwhite min-h-[5.5rem] md:min-h-[9rem]"
      }`}
    >
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2">
        <a href="/" aria-label="Torna alla home">
          <img
            src={imgLogo}
            alt="Wooden Tree House Logo"
            className={`w-auto transition-all duration-500 ${isScrolled ? "h-12 md:h-14" : "h-16 md:h-20 invert brightness-0 drop-shadow-lg"}`}
          />
        </a>
      </div>
      <nav className="flex gap-4 md:gap-6 text-xs md:text-sm font-medium tracking-wide uppercase">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="hover:underline underline-offset-4">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
