import imgCasetta from "@/assets/images/casaettabella.jpg";
import imgAlcolica from "@/assets/images/alcolicacasetta.jpg";
import { motion } from "framer-motion";

export function CostruzioniSection() {
  return (
    <section id="costruzioni" className="py-0 relative">
      {/* Thread Line */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1px] bg-brand-cream/30 h-full top-0 pointer-events-none hidden md:block z-20" />

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* La Casetta */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden h-[500px] lg:h-auto"
        >
          <img
            src={imgCasetta}
            alt="La Casetta"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-brand-green/90 lg:bg-brand-green/70 lg:group-hover:bg-brand-green/90 transition-all duration-500 flex flex-col justify-center items-center p-8 text-center backdrop-blur-[2px]">
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-brand-cream mb-0 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500">
              La Casetta
            </h3>
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
            src={imgAlcolica}
            alt="La Casetta Alcolica"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-brand-wood/90 lg:bg-brand-wood/70 lg:group-hover:bg-brand-wood/90 transition-all duration-500 flex flex-col justify-center items-center p-8 text-center backdrop-blur-[2px]">
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-brand-cream mb-0 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500">
              La Casetta Alcolica
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
