import imgSetDesign from "@/assets/images/tshwth.jpeg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function SetDesignSection() {
  return (
    <section id="allestimenti" className="py-20 md:py-32 relative">
       {/* Thread Line */}
       <div className="absolute left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-brand-orange/40 to-transparent h-full top-0 pointer-events-none hidden md:block" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative group"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-orange/20 rounded-full blur-2xl group-hover:bg-brand-orange/30 transition-all duration-500" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-green/20 rounded-full blur-2xl group-hover:bg-brand-green/30 transition-all duration-500" />
            <img 
              src={imgSetDesign} 
              alt="Allestimenti in legno" 
              className="relative w-full rounded-lg shadow-2xl z-10 transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute -bottom-6 -right-6 w-2/3 h-1/3 bg-brand-green p-6 -z-0 hidden md:block group-hover:bg-brand-wood transition-colors duration-500"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-green leading-tight">
              Allestimenti & <br />
              <span className="text-brand-wood">Collaborazioni</span>
            </h2>
            <div className="w-20 h-1 bg-brand-orange" />
            
            <p className="text-lg text-brand-wood/80 leading-relaxed">
              Non costruiamo solo sogni e castelli. A volte costruiamo anche solide realtà:
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-brand-orange" />
                <span className="text-brand-green font-medium">Scemografia in legno per fiere ed è 20</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-brand-orange" />
                <span className="text-brand-green font-medium">Installazioni artistiche fisse o mobili</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-brand-orange" />
                <span className="text-brand-green font-medium">Strutture personalizzate come ti pare</span>
              </li>
            </ul>
            
            <div className="pt-4">
              <Button asChild className="bg-brand-wood hover:bg-brand-green text-brand-cream px-8 py-6 text-lg rounded-none transition-all w-full md:w-auto">
                <a href="https://wa.me/34632854055" target="_blank" rel="noopener noreferrer">
                  Parla del tuo Progetto <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
