import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Foto che scorre un po' più lenta della pagina: dà profondità, come la foto di apertura.
// La foto è alta il 130% del riquadro e parte 15% più in su: così il movimento (±8%)
// non scopre mai i bordi. Il riquadro taglia quello che esce.
//
// La foto è posizionata in assoluto apposta: le percentuali di `top` si calcolano
// sull'altezza del riquadro, mentre quelle di `margin` si calcolerebbero sulla
// larghezza — e da telefono, con riquadri larghi e bassi, scoprivano il bordo.
// Per questo il riquadro deve avere un'altezza definita (`h-full`, `h-1/2`,
// `aspect-[...]` o `absolute inset-0`), mai altezza automatica.
//
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
    <div ref={riquadro} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={fermo ? undefined : { y: scorrimento }}
        className={`absolute inset-x-0 -top-[15%] w-full h-[130%] object-cover ${classeFoto}`}
      />
    </div>
  );
}
