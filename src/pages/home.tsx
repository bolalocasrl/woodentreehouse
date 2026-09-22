import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail, ChevronDown, X } from "lucide-react";
const Instagram = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
import { Button } from "@/components/ui/button";
import HomeHeader from "@/components/site/HomeHeader";
import ShopTeaser from "@/components/shop/ShopTeaser";
import NewsletterForm from "@/components/site/NewsletterForm";


// Images - Background
import imgHero from "@/assets/images/mondowth.webp";

// Images - La Casetta
import imgColore from "@/assets/images/colore.webp";
import imgTerrazza from "@/assets/images/Terrazza.webp";
import imgInteriore from "@/assets/images/interiore.webp";

// Images - Alcolica
import imgCasettaAlcolica from "@/assets/images/casettalcolica.webp";
import imgTrasportoAlcolica from "@/assets/images/trasportoalcolica.webp";

// Images - Set Design
import imgSetDesign from "@/assets/images/tshwth.webp";

// Images - Events
import imgFesta from "@/assets/images/festa.webp";
import imgCarnevale from "@/assets/images/carnevale.webp";


// Images - Art Exhibition
import imgMadreNatura from "@/assets/images/madre-natura.webp";
import imgCas2 from "@/assets/images/cas2.webp";
import imgJeck from "@/assets/images/jeck.webp";

export default function Home() {
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  
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

// Il nome è visibile subito; scorrendo la foto si scurisce e si sfoca
const calcOverlayOpacity = Math.min(0.7, 0.4 + scrollVal * 0.6);
  
  // Parallax / Scroll Animations
  // 0% - 25%: Initial state (clear image) -> Start moving
  // 25% - 75%: Blur increases, Content fades in
  // 75% - 100%: Fully blurred, Content fully visible, transitioning out
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const backgroundBlur = useTransform(scrollYProgress, [0.2, 0.8], ["0px", "20px"]);




  const handleEventClick = (id: string) => {
    // Only toggle on mobile (md:hidden breakpoint is usually 768px)
    if (window.innerWidth >= 768) return;
    setActiveEventId(prev => prev === id ? null : id);
  };


  return (
    <div className="min-h-screen bg-brand-offwhite text-brand-smoke font-sans selection:bg-brand-forest selection:text-brand-offwhite">
      <HomeHeader />
      {/* HERO SECTION - Sticky Parallax Container */}
      <div ref={heroRef} className="h-[160vh] relative">
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
               alt="La Casetta vista dall'alto tra gli alberi" 
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
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
            
            <p className="text-lg md:text-2xl font-serif italic mb-3 text-brand-offwhite">
              La casetta sull'albero di San Giovanni in Persiceto. Dal 2012.
            </p>
            <p className="text-sm md:text-base font-normal mb-10 text-brand-offwhite/80">
              Unisciti alla community per aggiornamenti ed eventi
            </p>

            <NewsletterForm />
          </motion.div>

          {/* Scroll Indicator - Always visible, outside of opacity animation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
            <motion.div 
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-xs uppercase tracking-widest font-bold text-brand-offwhite">Scopri la Casetta</span>
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
              <span className="text-xs font-bold tracking-widest uppercase text-brand-yellow mb-4 block">01 — Dove tutto è iniziato</span>
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
              <a href="/galleria/casetta" className="group/g inline-flex items-center mt-6 text-xs font-bold uppercase tracking-widest text-brand-yellow hover:text-brand-offwhite transition-colors">
                La storia della Casetta, dal 2012 <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/g:translate-x-1" />
              </a>
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
               <span className="text-xs font-mono font-bold">EST. 2018</span>
             </div>
          </div>
          <div className="lg:col-span-4 order-1 lg:order-2 p-8 md:p-16 flex flex-col justify-center min-h-[50vh]">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-forest mb-4 block">02 — Il bar su ruote</span>
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
            <a href="/galleria/casetta-alcolica" className="group/g inline-flex items-center mt-6 text-xs font-bold uppercase tracking-widest text-brand-forest hover:text-brand-smoke transition-colors">
              Guarda la storia della Casetta Alcolica <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/g:translate-x-1" />
            </a>
          </div>
        </section>

        {/* PILLAR 3: ALLESTIMENTI & TEAM (Wood Background) */}
        <section id="allestimenti" className="grid grid-cols-1 lg:grid-cols-12 border-b border-brand-smoke/20 bg-brand-wood text-brand-offwhite">
          <div className="lg:col-span-6 p-8 md:p-16 flex flex-col justify-center border-r border-brand-offwhite/20 min-h-[60vh]">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-offwhite/80 mb-4 block">03 — Costruzioni su misura</span>
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
            <a href="/galleria/allestimenti" className="group/g inline-flex items-center mt-6 text-xs font-bold uppercase tracking-widest text-brand-offwhite/80 hover:text-brand-offwhite transition-colors">
              Guarda i nostri progetti <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/g:translate-x-1" />
            </a>
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
              <span className="text-xs font-bold tracking-widest uppercase text-brand-yellow mb-4 block">04 — Arte in Casetta</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-none text-brand-offwhite">La Mostra<br/>Arte</h2>
              <div className="w-12 h-[1px] bg-brand-offwhite mb-8"></div>
              <p className="text-brand-offwhite/80 text-lg leading-relaxed font-normal mb-8">
                Hai mai pensato a qualcosa di incredibile da creare e semplicemente non sapere come farlo?
                <br /><br />
                Non ti preoccupare, siamo venuti in questo universo per un solo e unico motivo: aiutarti.
              </p>
              <Button asChild variant="outline" className="text-brand-offwhite border-brand-offwhite hover:bg-brand-offwhite hover:text-brand-forest rounded-none self-start">
                <a href="/galleria/allestimenti/madre-natura">
                  Guarda Madre Natura <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* PILLAR 4: EVENTS (Dark Green Background) */}
        <section id="eventi" className="grid grid-cols-1 border-b border-brand-smoke/20 bg-brand-forest text-brand-offwhite">
           <div className="p-8 md:p-12 text-center border-b border-brand-offwhite/20">
             <span className="text-xs font-bold tracking-widest uppercase mb-2 block text-brand-yellow">05 — Le nostre feste</span>
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
                   <h3 className="text-4xl md:text-5xl font-serif mb-4 text-white">Wooden Tree Night</h3>
                   <p className={`text-brand-offwhite/90 mb-6 max-w-lg text-base leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-normal ${activeEventId === 'night' ? '!opacity-100 !translate-y-0' : ''}`}>
                     Pensa quanto sarebbe bello entrare gratis alla festa in casetta semplicemente rispondendo alla domanda "Anno di fondazione WTH ?"
                   </p>
                   <div className="flex gap-4">
                     <span className="text-xs uppercase tracking-widest border border-brand-offwhite/50 px-3 py-1 rounded-full text-white">Festa in Casetta</span>
                     <span className="text-xs uppercase tracking-widest border border-brand-offwhite/50 px-3 py-1 rounded-full text-white">Su invito</span>
                   </div>
                   <a href="/galleria/wooden-tree-night" onClick={(e) => e.stopPropagation()} className="group/g inline-flex items-center mt-6 self-start text-xs font-bold uppercase tracking-widest text-white hover:text-brand-yellow transition-colors">
                     Tutte le edizioni <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/g:translate-x-1" />
                   </a>
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
                     <span className="text-xs uppercase tracking-widest border border-brand-offwhite/50 px-3 py-1 rounded-full text-white">In piazza</span>
                     <span className="text-xs uppercase tracking-widest border border-brand-offwhite/50 px-3 py-1 rounded-full text-white">Aperta a tutti</span>
                   </div>
                   <a href="/galleria/wooden-tree-mobile" onClick={(e) => e.stopPropagation()} className="group/g inline-flex items-center mt-6 self-start text-xs font-bold uppercase tracking-widest text-white hover:text-brand-yellow transition-colors">
                     Tutti i carnevali <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/g:translate-x-1" />
                   </a>
                </div>
             </div>
           </div>
        </section>

        <ShopTeaser />

        {/* NEWSLETTER */}
        <section className="bg-brand-forest text-brand-offwhite px-6 py-16 md:py-24 text-center border-t border-brand-offwhite/15">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-yellow mb-4 block">Resta aggiornato</span>
          <h2 className="text-4xl md:text-6xl font-serif text-brand-offwhite mb-6 leading-tight">
            La prossima festa<br />la sai prima tu
          </h2>
          <p className="text-brand-offwhite/80 text-lg max-w-xl mx-auto mb-10">
            Date delle Wooden Tree Night, nuovi gadget e quello che succede in Casetta. Poche email, solo quando serve.
          </p>
          <NewsletterForm />
        </section>

        {/* FOOTER */}
        <footer className="border-t border-brand-smoke/20 p-8 md:p-16 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 bg-brand-offwhite text-brand-smoke">
           <div>
             <h4 className="font-serif text-xl mb-2">Wooden Tree House</h4>
             <p className="text-sm text-brand-smoke/60 max-w-xs mb-3">
               Sogni intagliati nel legno, avventure vissute insieme.
             </p>
             <p className="text-xs text-brand-smoke/50">WOODEN TREE HOUSE APS — P.IVA 04354171201 — C.F. 91457460375</p>
             <p className="text-xs text-brand-smoke/50">woodentreehouse97@pec.it</p>
           </div>
           <div className="flex flex-col items-center md:items-end gap-4">
             <a href="https://www.instagram.com/wooden_tree_house/?hl=en" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-forest transition-colors">
               <Instagram className="w-5 h-5" />
               <span className="text-sm font-bold uppercase tracking-widest">Instagram</span>
             </a>
             <a href="/privacy-policy" className="text-xs text-brand-smoke/50 hover:text-brand-smoke transition-colors underline underline-offset-4">
               Privacy Policy
             </a>
             <p className="text-xs text-brand-smoke/60">
               © 2013 WOODEN TREE HOUSE APS. Tutti i diritti riservati.
             </p>
           </div>
        </footer>

      </main>
    </div>
  );
}
