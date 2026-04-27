import imgNight from "@/assets/images/festa.jpg";
import imgBar from "@/assets/images/carnevale.jpg";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function EventsSection() {
  return (
    <section id="eventi" className="py-0 relative">
      {/* Thread Line */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1px] bg-brand-cream/30 h-full top-0 pointer-events-none hidden md:block z-20" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Wooden Tree Night */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden h-[500px] lg:h-auto"
        >
          <img 
            src={imgNight} 
            alt="Wooden Tree Night" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-brand-green/90 lg:bg-brand-green/70 lg:group-hover:bg-brand-green/90 transition-all duration-500 flex flex-col justify-center items-center p-8 text-center backdrop-blur-[2px]">
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-brand-cream mb-4 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500">
              Wooden Tree Night
            </h3>
            <div className="w-16 h-1 bg-brand-orange mb-6 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 lg:delay-100" />
            <p className="text-brand-cream/90 max-w-md text-lg leading-relaxed translate-y-0 lg:translate-y-8 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 lg:delay-200">
              Pensa quanto sarebbe bello entrare gratis alla festa in casetta semplicemente rispondendo alla domanda "Anno di fondazione WTH ?"
            </p>
            <a
              href="mailto:woodentreehouse97@gmail.com?subject=Eventi%20-%20WTN%20-%20La%20Casetta%20(Alcolica)"
              className="mt-6 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-brand-cream/10 text-brand-cream hover:bg-brand-cream/20 transition-colors"
              data-testid="button-email-wtn"
            >
              Contatta via Email
            </a>
          </div>
        </motion.div>

        {/* La Casetta Alcolica */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden h-[500px] lg:h-auto"
        >
          <img 
            src={imgBar} 
            alt="La Casetta Alcolica" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-brand-wood/90 lg:bg-brand-wood/70 lg:group-hover:bg-brand-wood/90 transition-all duration-500 flex flex-col justify-center items-center p-8 text-center backdrop-blur-[2px]">
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-brand-cream mb-4 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500">
              La Casetta Alcolica
            </h3>
            <div className="w-16 h-1 bg-brand-orange mb-6 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 lg:delay-100" />
            <p className="text-brand-cream/90 max-w-md text-lg leading-relaxed translate-y-0 lg:translate-y-8 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 lg:delay-200">
              La nostra produttività va alimentata.. Qual'è la Composizione chimica del Latte ? Se ci prendi vinci sconti & Gadget !! Che fai 'no fai?
            </p>
            <a
              href="mailto:woodentreehouse97@gmail.com?subject=Eventi%20-%20WTN%20-%20La%20Casetta%20(Alcolica)"
              className="mt-6 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-brand-cream/10 text-brand-cream hover:bg-brand-cream/20 transition-colors"
              data-testid="button-email-casetta-alcolica"
            >
              Contatta via Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
