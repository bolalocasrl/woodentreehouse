import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Foto } from "@/content/galleria";

type Props = {
  foto: Foto[];
  index: number | null;
  onClose: () => void;
  didascalia?: string;
};

// Foto a schermo intero: frecce, tastiera e swipe
export default function Lightbox({ foto, index, onClose, didascalia }: Props) {
  const [current, setCurrent] = useState(index ?? 0);
  const [direction, setDirection] = useState(0);
  const isOpen = index !== null;

  useEffect(() => {
    if (index !== null) setCurrent(index);
  }, [index]);

  const go = (step: number) => {
    setDirection(step);
    setCurrent((i) => (i + step + foto.length) % foto.length);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, foto.length]);

  const item = foto[current];

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          className="fixed inset-0 z-[70] bg-brand-smoke/95 text-brand-offwhite flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex justify-between items-center p-4 md:p-6">
            <span className="text-xs font-mono tracking-widest">
              {String(current + 1).padStart(2, "0")} / {String(foto.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={onClose} aria-label="Chiudi" className="p-2 hover:text-brand-yellow transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center overflow-hidden px-4 md:px-20" onClick={onClose}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={item.src}
                src={item.src}
                alt={item.alt}
                custom={direction}
                initial={{ opacity: 0, x: direction * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -80 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                drag={foto.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  if (info.offset.x > 80) go(-1);
                }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full object-contain select-none cursor-grab active:cursor-grabbing"
                draggable={false}
              />
            </AnimatePresence>

            {foto.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Foto precedente"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center border border-brand-offwhite/40 hover:bg-brand-offwhite hover:text-brand-smoke transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  aria-label="Foto successiva"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center border border-brand-offwhite/40 hover:bg-brand-offwhite hover:text-brand-smoke transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          <div className="p-4 md:p-6 text-center text-sm text-brand-offwhite/70 min-h-[3.5rem]">
            {didascalia ?? item.alt}
            {foto.length > 1 && <span className="md:hidden block text-xs text-brand-offwhite/40 mt-1">Scorri per cambiare foto</span>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
