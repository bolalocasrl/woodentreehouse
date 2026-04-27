import { Button } from "@/components/ui/button";
import heroImage from "@/assets/images/casetta sfondo.jpg";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

export function Hero() {
  return (
    <div className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center text-brand-cream z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-6 drop-shadow-lg text-brand-orange"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            Wooden Tree House
          </motion.h1>
          <p className="text-lg md:text-2xl font-sans font-light tracking-wide mb-10 max-w-2xl mx-auto drop-shadow-md text-brand-cream/90">
            Sogni intagliati nel legno, avventure vissute insieme.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild
              className="bg-brand-orange hover:bg-brand-orange/90 text-brand-green font-bold text-lg px-8 py-6 rounded-none shadow-xl border-2 border-brand-orange hover:scale-105 transition-transform"
            >
              <a href="https://www.instagram.com/wooden_tree_house/?hl=en" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" />
                Prossimi Eventi
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Starting point of the thread */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-brand-cream flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs uppercase tracking-widest opacity-80 mb-2">Scopri di più</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-brand-cream to-brand-orange/60 opacity-80" />
      </motion.div>
    </div>
  );
}
