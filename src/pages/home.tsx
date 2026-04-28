import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail, ChevronDown, X } from "lucide-react";
const Instagram = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
import { Button } from "@/components/ui/button";

// Images - Logo
import imgLogo from "@/assets/images/logo-nero.png";

// Images - Background
import imgHero from "@/assets/images/mondowth.jpg";

// Images - La Casetta
import imgColore from "@/assets/images/colore.jpg";
import imgTerrazza from "@/assets/images/Terrazza.jpg";
import imgInteriore from "@/assets/images/interiore.jpg";

// Images - Alcolica
import imgCasettaAlcolica from "@/assets/images/casettalcolica.jpg";
import imgTrasportoAlcolica from "@/assets/images/trasportoalcolica.jpg";

// Images - Set Design
import imgSetDesign from "@/assets/images/tshwth.jpeg";

// Images - Events
import imgFesta from "@/assets/images/festa.jpg";
import imgCarnevale from "@/assets/images/carnevale.jpg";

// Images - Merch
import imgTshirt from "@/assets/images/Military Green 1.jpg";
import imgHoodie from "@/assets/images/nero 1.jpg";
import imgBeanie from "@/assets/images/Cuffie WTH.pdf.jpg";
import imgCrewneck from "@/assets/images/bianco 1.jpg";

// Images - Art Exhibition
import imgMadreNatura from "@/assets/images/madre-natura.jpg";
import imgCas2 from "@/assets/images/cas2.jpg";
import imgJeck from "@/assets/images/jeck.jpg";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [activeGadgetId, setActiveGadgetId] = useState<string | null>(null);
  
const heroRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: heroRef,
  offset: ["start start", "end end"],
  layoutEffect: false
});
const [scrollVal, setScrollVal] = useState(0);
useEffect(() => {
  return scrollYProgress.on("change", (v) => setScrollVal(v));
}, [scrollYProgress]);

const calcOverlayOpacity = Math.min(0.7, Math.max(0.2, (scrollVal - 0.2) / 0.4 * 0.5 + 0.2));
const calcContentOpacity = Math.min(1, Math.max(0, (scrollVal - 0.3) / 0.3));
const calcContentY = Math.max(0, 50 - (scrollVal - 0.3) / 0.3 * 50);
  
  // Parallax / Scroll Animations
  // 0% - 25%: Initial state (clear image) -> Start moving
  // 25% - 75%: Blur increases, Content fades in
  // 75% - 100%: Fully blurred, Content fully visible, transitioning out
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const backgroundBlur = useTransform(scrollYProgress, [0.2, 0.8], ["0px", "20px"]);
  const overlayOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0.2, 0.7]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("entry.585338124", email);
      
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSc3uQ4qNSTqXCH3Bxze80htz5rrxCMEjvOVZX1y3XZv3ks1ag/formResponse",
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
        }
      );

      setEmail("");
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEventClick = (id: string) => {
    // Only toggle on mobile (md:hidden breakpoint is usually 768px)
    if (window.innerWidth >= 768) return;
    setActiveEventId(prev => prev === id ? null : id);
  };

  const handleGadgetClick = (id: string) => {
    // Only toggle on mobile
    if (window.innerWidth >= 768) return;
    setActiveGadgetId(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-brand-offwhite text-brand-smoke font-sans selection:bg-brand-forest selection:text-brand-offwhite">
      {/* HEADER / NAV (Minimal) */}
      <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-brand-offwhite p-4 md:p-8 flex justify-end items-center pointer-events-none min-h-[5.5rem] md:min-h-[9rem]">
        <div className={`pointer-events-auto absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${isScrolled ? "left-1/2 -translate-x-1/2" : "left-4 md:left-8"}`}>
          <img src={imgLogo} alt="Wooden Tree House Logo" className="h-16 w-auto md:h-20 invert brightness-0" />
        </div>
        <nav className={`pointer-events-auto hidden md:flex gap-6 text-sm font-medium tracking-wide uppercase transition-opacity duration-500 ${isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <a href="#casetta" className="hover:underline underline-offset-4">La Casetta</a>
          <a href="#alcolica" className="hover:underline underline-offset-4">Alcolica</a>
          <a href="#allestimenti" className="hover:underline underline-offset-4">Allestimenti</a>
          <a href="#eventi" className="hover:underline underline-offset-4">Eventi</a>
          <a href="#archive" className="hover:underline underline-offset-4">Gadget</a>
        </nav>
      </header>
      {/* HERO SECTION - Sticky Parallax Container */}
      <div ref={heroRef} className="h-[200vh] relative">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center border-b border-brand-smoke/20 overflow-hidden">
          {/* Background Image with Blur Animation */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{
              y: backgroundY,
              scale: backgroundScale,
              filter: backgroundBlur
            }}
          >
             <img 
               src={imgHero} 
               alt="Background" 
               className="w-full h-full object-cover"
             />
             <motion.div 
               className="absolute inset-0 bg-black"
               style={{ opacity: calcOverlayOpacity }}
             />
          </motion.div>

          {/* Content Container - Fades in on scroll */}
          <motion.div 
            className="w-full px-6 text-center z-10 relative"
            style={{ 
  opacity: calcContentOpacity,
  y: calcContentY
}}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-normal tracking-tighter mb-8 text-brand-offwhite text-center mx-auto cursor-default">
              {"Wooden Tree House".split("").map((char, index) => {
                const colors = [
                  "hover:text-brand-yellow",
                  "hover:text-brand-forest", 
                  "hover:text-amber-500"
                ];
                return (
                  <span key={index} className={`transition-colors duration-200 ${colors[index % 3]}`}>
                    {char}
                  </span>
                );
              })}
              <span className="text-brand-yellow">.</span>
            </h1>
            
            <p className="text-lg md:text-xl font-normal mb-12 text-brand-offwhite/90">
              Unisciti alla community per aggiornamenti ed eventi
            </p>

            <form 
              className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border border-brand-offwhite/50"
              onSubmit={handleSubmit}
            >
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="flex-1 bg-transparent border-none px-4 py-3 text-sm focus:ring-0 placeholder:text-brand-offwhite/60 text-brand-offwhite disabled:opacity-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || isSuccess}
                required
              />
              <button 
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="bg-brand-offwhite text-brand-smoke px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-brand-yellow transition-colors disabled:opacity-70 disabled:hover:bg-brand-offwhite min-w-[100px]"
              >
                {isSubmitting ? "..." : isSuccess ? "✔ Iscritto" : "Join"}
              </button>
            </form>
          </motion.div>

          {/* Scroll Indicator - Always visible, outside of opacity animation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
            <motion.div 
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-offwhite">Scoprimi tu</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5 text-brand-offwhite" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* MAIN GRID LAYOUT - S-IR.it style */}
      <main className="border-x border-brand-smoke/20 max-w-[2000px] mx-auto bg-brand-offwhite">
        
        {/* PILLAR 1: LA CASETTA (Green Background) */}
        <section id="casetta" className="grid grid-cols-1 lg:grid-cols-12 border-b border-brand-smoke/20 bg-brand-forest text-brand-offwhite">
          <div className="lg:col-span-4 p-8 md:p-16 flex flex-col justify-between border-r border-brand-offwhite/20 min-h-[50vh] lg:min-h-[80vh]">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-brand-yellow mb-4 block">01 — The Origin</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-none text-brand-offwhite">La<br/>Casetta</h2>
              <div className="w-12 h-[1px] bg-brand-offwhite mb-8"></div>
              <p className="text-brand-offwhite/80 text-lg leading-relaxed font-normal mb-8">
                Fondata nel luglio 2012 quasi per scommessa, la Casetta poggiava originariamente su tre alberi e un palo di sostegno.
                <br /><br />
                Oggi è il nostro rifugio sospeso tra i rami. Ogni angolo della casetta è pensato per accogliere, ispirare e riconnettere con l'essenziale.
              </p>
              
              <Button asChild variant="outline" className="text-brand-offwhite border-brand-offwhite hover:bg-brand-offwhite hover:text-brand-forest rounded-none self-start">
                <a href="https://youtu.be/Z491JyyrQB0?si=zAD9A7KBkG8IrORC" target="_blank" rel="noopener noreferrer">
                  Guarda il documentario <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 relative">
             <div className="col-span-2 md:col-span-1 border-r border-brand-offwhite/20 h-full">
                <img src={imgColore} alt="La Casetta Exterior" className="w-full h-full object-cover transition-all duration-700" />
             </div>
             <div className="col-span-2 md:col-span-1 h-full flex flex-col">
                <div className="h-1/2 border-b border-brand-offwhite/20">
                   <img src={imgTerrazza} alt="La Casetta Terrace" className="w-full h-full object-cover transition-all duration-700" />
                </div>
                <div className="h-1/2">
                   <img src={imgInteriore} alt="La Casetta Interior" className="w-full h-full object-cover transition-all duration-700" />
                </div>
             </div>
          </div>
        </section>

        {/* PILLAR 2: LA CASETTA ALCOLICA (Warm Yellow Background) */}
        <section id="alcolica" className="grid grid-cols-1 lg:grid-cols-12 border-b border-brand-smoke/20 bg-brand-yellow text-brand-smoke">
          <div className="lg:col-span-8 order-2 lg:order-1 border-r border-brand-smoke/20 relative">
             <img src={imgCasettaAlcolica} alt="La Casetta Alcolica" className="w-full h-full object-cover transition-all duration-700 min-h-[400px]" />
             <div className="absolute bottom-0 right-0 p-4 bg-brand-yellow border-t border-l border-brand-smoke/20">
               <span className="text-xs font-mono font-bold">EST. 2014</span>
             </div>
          </div>
          <div className="lg:col-span-4 order-1 lg:order-2 p-8 md:p-16 flex flex-col justify-center min-h-[50vh]">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-forest mb-4 block">02 — LA BAR MOBILE</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">La Casetta<br/>Alcolica</h2>
            <p className="text-brand-smoke/80 text-lg leading-relaxed font-normal mb-8">
              Se la montagna non va in Casetta, allora la Casetta andrà in montagna.
              Le potenti ruote e la stabile struttura impedisce alle avversità esterne di diventare complessità interne.
            </p>
            <div className="aspect-video w-full overflow-hidden border border-brand-smoke/20 mt-4 mb-8">
              <img src={imgTrasportoAlcolica} alt="Trasporto" className="w-full h-full object-cover transition-all duration-500" />
            </div>

            <Button asChild variant="outline" className="text-brand-smoke border-brand-smoke hover:bg-brand-smoke hover:text-brand-yellow rounded-none self-start">
              <a href="https://www.instagram.com/wooden_tree_house/?hl=en" target="_blank" rel="noopener noreferrer">
                Scopri dove siamo <Instagram className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </section>

        {/* PILLAR 3: ALLESTIMENTI & TEAM (Wood Background) */}
        <section id="allestimenti" className="grid grid-cols-1 lg:grid-cols-12 border-b border-brand-smoke/20 bg-brand-wood text-brand-offwhite">
          <div className="lg:col-span-6 p-8 md:p-16 flex flex-col justify-center border-r border-brand-offwhite/20 min-h-[60vh]">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-offwhite/50 mb-4 block">03 — Creative Build</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-brand-offwhite">Allestimenti &<br/>Collaborazioni</h2>
            <p className="text-brand-offwhite/80 text-lg leading-relaxed mb-12 max-w-xl font-normal">
              Stanchi dei soliti format, abbiamo unito la nostra competenza tecnica nel legno alla direzione artistica per eventi. Non ci limitiamo a montare pareti, ma creiamo scenografie capaci di definire l'atmosfera, come abbiamo fatto nel 2024 al The Social Hub di Bologna per Point Of View.
              <br /><br />
              Dalla carpenteria pura alla visione creativa: portiamo l’estetica della Wooden Tree House ovunque serva un impatto memorabile.
            </p>
            
            <ul className="space-y-6 mb-12 font-normal">
              <li className="flex items-center gap-4 text-brand-offwhite/90">
                <span className="w-1.5 h-1.5 bg-brand-offwhite rounded-full" />
                Scenografia in legno per fiere ed eventi
              </li>
              <li className="flex items-center gap-4 text-brand-offwhite/90">
                <span className="w-1.5 h-1.5 bg-brand-offwhite rounded-full" />
                Installazioni artistiche fisse o mobili
              </li>
              <li className="flex items-center gap-4 text-brand-offwhite/90">
                <span className="w-1.5 h-1.5 bg-brand-offwhite rounded-full" />
                Strutture personalizzate
              </li>
            </ul>

            <Button asChild variant="outline" className="text-brand-offwhite border-brand-offwhite hover:bg-brand-offwhite hover:text-brand-wood rounded-none self-start">
               <a href="https://wa.me/34632854055" target="_blank" rel="noopener noreferrer">
                 Contattaci per collaborare
               </a>
            </Button>
          </div>
          <div className="lg:col-span-6 relative h-full min-h-[400px]">
             <img src={imgSetDesign} alt="Set Design" className="absolute inset-0 w-full h-full object-cover opacity-90" />
          </div>
        </section>

        {/* PILLAR 3.5: LA MOSTRA ARTE (New Section - Inverted Layout) */}
        <section id="mostra-arte" className="grid grid-cols-1 lg:grid-cols-12 border-b border-brand-smoke/20 bg-brand-forest text-brand-offwhite">
          <div className="lg:col-span-8 grid grid-cols-2 relative order-2 lg:order-1 border-r border-brand-offwhite/20">
             <div className="col-span-2 md:col-span-1 border-r border-brand-offwhite/20 h-full">
                <img src={imgCas2} alt="Art Vertical" className="w-full h-full object-cover transition-all duration-700" />
             </div>
             <div className="col-span-2 md:col-span-1 h-full flex flex-col">
                <div className="h-1/2 border-b border-brand-offwhite/20">
                   <img src={imgMadreNatura} alt="Madre Natura" className="w-full h-full object-cover transition-all duration-700" />
                </div>
                <div className="h-1/2">
                   <img src={imgJeck} alt="Art Detail" className="w-full h-full object-cover transition-all duration-700" />
                </div>
             </div>
          </div>
          <div className="lg:col-span-4 order-1 lg:order-2 p-8 md:p-16 flex flex-col justify-center min-h-[50vh] lg:min-h-[80vh]">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-brand-yellow mb-4 block">03.5 — Art Exhibition</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-none text-brand-offwhite">La Mostra<br/>Arte</h2>
              <div className="w-12 h-[1px] bg-brand-offwhite mb-8"></div>
              <p className="text-brand-offwhite/80 text-lg leading-relaxed font-normal mb-8">
                Hai mai pensato a qualcosa di incredibile da creare e semplicemente non sapere come farlo?
                <br /><br />
                Non ti preoccupare, siamo venuti in questo universo per un solo e unico motivo: aiutarti.
              </p>
            </div>
          </div>
        </section>

        {/* PILLAR 4: EVENTS (Dark Green Background) */}
        <section id="eventi" className="grid grid-cols-1 border-b border-brand-smoke/20 bg-brand-forest text-brand-offwhite">
           <div className="p-8 md:p-12 text-center border-b border-brand-offwhite/20">
             <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block text-brand-yellow">04 — Experience</span>
             <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">I Nostri Eventi</h2>
             <Button asChild variant="outline" className="text-white border-white hover:bg-white hover:text-brand-forest rounded-none">
                <a href="https://www.instagram.com/wooden_tree_house/?hl=en" target="_blank" rel="noopener noreferrer">
                   Seguici per gli eventi <Instagram className="ml-2 w-4 h-4" />
                </a>
             </Button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2">
             {/* Event 1: Night */}
             <div 
               className="group relative border-b md:border-b-0 md:border-r border-brand-offwhite/20 h-[600px] overflow-hidden"
               onClick={() => handleEventClick('night')}
             >
                <img src={imgFesta} alt="Wooden Tree Night" className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105" />
                <div className={`absolute inset-0 bg-brand-forest/60 group-hover:bg-brand-forest/40 transition-colors z-10 duration-500 ${activeEventId === 'night' ? '!bg-brand-forest/40' : ''}`}></div>
                <div className="absolute inset-0 z-20 p-8 md:p-16 flex flex-col justify-end text-brand-offwhite">
                   <h3 className="text-4xl md:text-5xl font-serif mb-4 text-white">Wooden Tree House</h3>
                   <p className={`text-brand-offwhite/90 mb-6 max-w-lg text-base leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-normal ${activeEventId === 'night' ? '!opacity-100 !translate-y-0' : ''}`}>
                     Pensa quanto sarebbe bello entrare gratis alla festa in casetta semplicemente rispondendo alla domanda "Anno di fondazione WTH ?"
                   </p>
                   <div className="flex gap-4">
                     <span className="text-xs uppercase tracking-widest border border-brand-offwhite/50 px-3 py-1 rounded-full text-white">Secret Party</span>
                     <span className="text-xs uppercase tracking-widest border border-brand-offwhite/50 px-3 py-1 rounded-full text-white">Invitation Only</span>
                   </div>
                </div>
             </div>

             {/* Event 2: Mobile */}
             <div 
               className="group relative h-[600px] overflow-hidden"
               onClick={() => handleEventClick('mobile')}
             >
                <img src={imgCarnevale} alt="Wooden Tree Mobile" className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105" />
                <div className={`absolute inset-0 bg-brand-forest/60 group-hover:bg-brand-forest/40 transition-colors z-10 duration-500 ${activeEventId === 'mobile' ? '!bg-brand-forest/40' : ''}`}></div>
                <div className="absolute inset-0 z-20 p-8 md:p-16 flex flex-col justify-end text-brand-offwhite">
                   <h3 className="text-4xl md:text-5xl font-serif mb-4 text-white">Wooden Tree Mobile</h3>
                   <p className={`text-brand-offwhite/90 mb-6 max-w-lg text-base leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-normal ${activeEventId === 'mobile' ? '!opacity-100 !translate-y-0' : ''}`}>
                     La nostra produttività va alimentata.. Qual'è la Composizione chimica del Latte? Se ci prendi vinci sconti & Gadget!
                   </p>
                   <div className="flex gap-4">
                     <span className="text-xs uppercase tracking-widest border border-brand-offwhite/50 px-3 py-1 rounded-full text-white">Itinerant</span>
                     <span className="text-xs uppercase tracking-widest border border-brand-offwhite/50 px-3 py-1 rounded-full text-white">Public</span>
                   </div>
                </div>
             </div>
           </div>
        </section>

        {/* ARCHIVE / GADGETS (Wood Background) */}
        <section id="archive" className="p-8 md:p-16 bg-brand-wood text-brand-offwhite">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-brand-offwhite/50 mb-2 block">Brand Equipment</span>
              <h2 className="text-3xl md:text-4xl font-serif text-white">Gadget</h2>
            </div>
            <div className="text-xs font-mono border border-brand-offwhite px-3 py-1 uppercase">
              Not For Sale — Community Only
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-offwhite/20 border border-brand-offwhite/20">
            {[
              { id: 'tshirt', name: 'Maglie WTH', type: 'Apparel', img: imgTshirt, desc: "Plutone Organico 97% e 3% Amore&Fantasia." },
              { id: 'hoodie', name: 'Felpe Cappuccio', type: 'Apparel', img: imgHoodie, desc: "Lana Merino intrecciata, la maestra la boccia !" },
              { id: 'crew', name: 'Felpe WTH', type: 'Apparel', img: imgCrewneck, desc: "Il classico senza tempo, robusta e scomoda." },
              { id: 'beanie', name: 'Cuffie WTH', type: 'Accessories', img: imgBeanie, desc: "Rimozione disturbi sonori, protezione sassi, ecc.." },
            ].map((item) => (
              <div 
                key={item.id} 
                className="bg-brand-offwhite group relative aspect-[4/5] overflow-hidden"
                onClick={() => handleGadgetClick(item.id)}
              >
                <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className={`absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-forest/90 backdrop-blur-sm text-brand-offwhite ${activeGadgetId === item.id ? '!opacity-100' : ''}`}>
                   <div>
                     <p className="text-xs uppercase tracking-widest text-brand-offwhite/60 mb-2">{item.type}</p>
                     <h3 className="text-xl font-serif text-white">{item.name}</h3>
                   </div>
                   <div className="mt-auto">
                     <p className="text-sm font-light leading-relaxed mb-4 text-white">
                        {item.desc}
                     </p>
                     <div className="text-xs font-bold border-t border-brand-offwhite/20 pt-4">
                       ARCHIVED / OUT OF STOCK
                     </div>
                   </div>
                </div>
                {/* Always visible label */}
                <div className={`absolute bottom-4 left-4 bg-brand-smoke text-brand-offwhite px-3 py-1 text-xs font-bold uppercase tracking-wider group-hover:opacity-0 transition-opacity ${activeGadgetId === item.id ? '!opacity-0' : ''}`}>
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-brand-smoke/20 p-8 md:p-16 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 bg-brand-offwhite text-brand-smoke">
           <div>
             <h4 className="font-serif text-xl mb-2">Wooden Tree House</h4>
             <p className="text-sm text-brand-smoke/60 max-w-xs">
               Sogni intagliati nel legno, avventure vissute insieme.
               Est. 2014, Emilia Romagna.
             </p>
           </div>
           <div className="flex flex-col items-center md:items-end gap-4">
             <a href="https://www.instagram.com/wooden_tree_house/?hl=en" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-forest transition-colors">
               <Instagram className="w-5 h-5" />
               <span className="text-sm font-bold uppercase tracking-widest">Instagram</span>
             </a>
             <p className="text-xs text-brand-smoke/40">
               © {new Date().getFullYear()} WTH. All rights reserved.
             </p>
           </div>
        </footer>

      </main>
    </div>
  );
}
