import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import imgBom1 from "@/assets/images/bom1.jpg";
import imgBom2 from "@/assets/images/bom2.jpg";
import imgBom3 from "@/assets/images/bom3.jpg";
import imgBom4 from "@/assets/images/bom4.jpg";
import imgBom5 from "@/assets/images/bom5.jpg";
import imgBom6 from "@/assets/images/bom6.jpg";
import imgCarnevale from "@/assets/images/carnevale.jpg";
import imgFestaCasettaAlcolica from "@/assets/images/festacasettalcolica.jpg";

const images = [
  { src: imgBom1, alt: "Wooden Tree Mobile" },
  { src: imgBom2, alt: "Wooden Tree Mobile" },
  { src: imgBom3, alt: "Wooden Tree Mobile" },
  { src: imgBom4, alt: "Wooden Tree Mobile" },
  { src: imgBom5, alt: "Wooden Tree Mobile" },
  { src: imgBom6, alt: "Wooden Tree Mobile" },
  { src: imgCarnevale, alt: "Wooden Tree Mobile" },
  { src: imgFestaCasettaAlcolica, alt: "Wooden Tree Mobile" },
];

export function WoodenTreeMobileSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="wooden-tree-mobile" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 w-[1px] bg-brand-orange/20 h-full top-0 pointer-events-none hidden md:block z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-green mb-6">Wooden Tree Mobile</h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto mb-6" />
          <p className="text-brand-wood text-lg leading-relaxed">
            Un'idea nata in un garage, cresciuta nelle strade di Sangio e ora pronta ad affrontare le sfide
            intercontinentali
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
            data-testid="button-prev-wooden-tree-mobile"
            variant="ghost"
            size="icon"
            className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 bg-brand-cream/80 hover:bg-brand-orange hover:text-brand-cream text-brand-green rounded-full shadow-lg backdrop-blur-sm z-10 w-12 h-12"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            data-testid="button-next-wooden-tree-mobile"
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
