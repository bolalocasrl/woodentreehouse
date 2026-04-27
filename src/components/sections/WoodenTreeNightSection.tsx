import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import imgFesta from "@/assets/images/festa.jpg";
import imgGoa from "@/assets/images/goa.jpg";
import imgGoa1 from "@/assets/images/goa1.jpg";
import imgGoa2 from "@/assets/images/goa2.jpg";

const images = [
  { src: imgFesta, alt: "Wooden Tree Night" },
  { src: imgGoa, alt: "Wooden Tree Night" },
  { src: imgGoa1, alt: "Wooden Tree Night" },
  { src: imgGoa2, alt: "Wooden Tree Night" },
];

export function WoodenTreeNightSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="wooden-tree-night" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 w-[1px] bg-brand-orange/20 h-full top-0 pointer-events-none hidden md:block z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-green mb-6">Wooden Tree Night</h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto mb-6" />
          <p className="text-brand-wood text-lg leading-relaxed">
            La festa in casetta nasce nel 2014 e continua interperrita sorprendendo il bacino emiliano romagnolo. La
            formula chi è in lista entra e gli altri no è fase di sviluppo
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative group max-w-6xl mx-auto"
        >
          <div className="overflow-hidden rounded-xl shadow-2xl" ref={emblaRef}>
            <div className="flex">
              {images.map((img, index) => (
                <div
                  className="flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_60%] min-w-0 pl-4 relative"
                  key={index}
                >
                  <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg group-hover:scale-[1.01] transition-transform duration-500">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            data-testid="button-prev-wooden-tree-night"
            variant="ghost"
            size="icon"
            className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 bg-brand-cream/80 hover:bg-brand-orange hover:text-brand-cream text-brand-green rounded-full shadow-lg backdrop-blur-sm z-10 w-12 h-12"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            data-testid="button-next-wooden-tree-night"
            variant="ghost"
            size="icon"
            className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 bg-brand-cream/80 hover:bg-brand-orange hover:text-brand-cream text-brand-green rounded-full shadow-lg backdrop-blur-sm z-10 w-12 h-12"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
