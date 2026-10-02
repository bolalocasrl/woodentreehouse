import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Fa comparire un blocco quando entra nello schermo: sale di poco e sfuma.
// Succede una volta sola: chi risale non rivede l'animazione, che a lungo andare stanca.
// Se nelle impostazioni del Mac o del telefono è attivo "riduci movimento"
// (lo usa chi soffre di nausea da animazioni) il blocco appare e basta.
export default function Rivela({
  children,
  className = "",
  ritardo = 0,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  ritardo?: number;
  onClick?: () => void;
}) {
  const fermo = useReducedMotion();

  if (fermo) return <div className={className} onClick={onClick}>{children}</div>;

  return (
    <motion.div
      className={className}
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: ritardo, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
