import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Foto che scorre un po' più lenta della pagina: dà profondità, come la foto di apertura.
// La foto è alta il 130% del suo riquadro e parte spostata in su del 15%: così il
// movimento (±8%) non scopre mai i bordi. Il riquadro taglia tutto quello che esce.
// Con "riduci movimento" attivo nel sistema la foto resta ferma.
export default function FotoParallasse({
  src,
  alt,
  className = "",
  classeFoto = "",
}: {
  src: string;
  alt: string;
  className?: string;
  classeFoto?: string;
}) {
  const riquadro = useRef<HTMLDivElement>(null);
  const fermo = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: riquadro,
    offset: ["start end", "end start"],
  });
  const scorrimento = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={riquadro} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={fermo ? undefined : { y: scorrimento }}
        className={`w-full h-[130%] -mt-[15%] object-cover ${classeFoto}`}
      />
    </div>
  );
}
