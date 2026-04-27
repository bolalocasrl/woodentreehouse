import logo from "@/assets/images/logo-bianco.png";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <a href="#casetta" className="hover:text-brand-orange transition-colors relative group" onClick={() => setIsOpen(false)}>
        La Casetta
        <span className="hidden md:block absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full" />
      </a>
      <a href="#storia" className="hover:text-brand-orange transition-colors relative group" onClick={() => setIsOpen(false)}>
        La Storia
        <span className="hidden md:block absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full" />
      </a>
      <a href="#prodotti" className="hover:text-brand-orange transition-colors relative group" onClick={() => setIsOpen(false)}>
        Prodotti
        <span className="hidden md:block absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full" />
      </a>
      <a href="#eventi" className="hover:text-brand-orange transition-colors relative group" onClick={() => setIsOpen(false)}>
        Eventi
        <span className="hidden md:block absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full" />
      </a>
      <a href="#allestimenti" className="hover:text-brand-orange transition-colors relative group" onClick={() => setIsOpen(false)}>
        Allestimenti
        <span className="hidden md:block absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full" />
      </a>
    </>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-green/90 backdrop-blur-sm border-b border-brand-cream/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden p-1">
            <img src={logo} alt="Wooden Tree House Logo" className="w-full h-full object-contain" />
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-serif font-bold text-brand-cream leading-none">Wooden Tree House</h1>
            <p className="text-[10px] text-brand-orange uppercase tracking-widest">Casetta</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-brand-cream text-sm font-medium tracking-wide">
          <NavLinks />
          <Button asChild variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-brand-green ml-4 rounded-none">
            <a href="#contattaci">Contattaci</a>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-brand-cream hover:bg-brand-cream/10">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-brand-green border-l border-brand-cream/10 w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full mt-10">
              <div className="flex flex-col gap-8 text-brand-cream text-xl font-serif font-medium">
                <NavLinks />
              </div>
              
              <div className="mt-auto mb-10">
                <Button asChild className="w-full bg-brand-orange text-brand-green hover:bg-brand-cream font-bold py-6 text-lg">
                  <a href="#contattaci" onClick={() => setIsOpen(false)}>Contattaci</a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
