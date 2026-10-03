import { POST_MONDO } from "@/content/around-the-world";

// Le cartoline dei viaggi che scendono piano ai lati della foto prodotti.
// Sono decorazione: non si cliccano e gli screen reader le saltano (aria-hidden).
// Le foto vere stanno nella sezione "WTH around the world" dentro /shop.

// Scelte a mano fra i post, per avere posti diversi fra loro.
// Di ognuna esiste una versione leggera da 400 px (30 KB invece di 115):
// una cartolina larga 180 px non ha bisogno di piu'. Se se ne aggiungono altre,
// va creata anche la misura -400.webp, altrimenti qui non si vedono.
const SCELTE = [
  "ig-djucdvxinut", "ig-c1r4stkoqa9", "ig-czump1uo0x3", "ig-cxii6baoasy",
  "ig-cxfpxqaos0a", "ig-cwh7wxmol3l", "ig-ci9gtvii8id", "ig-cdwvrl7ovhi",
  "ig-b9t9w9ioxmc", "ig-bzqgenjikuq", "ig-bsn3xcybnng", "ig-bq5mtuch-ng",
];

const CARTOLINE = SCELTE.map((nome) => POST_MONDO.find((p) => p.foto.base.endsWith(nome))).filter(
  (p): p is NonNullable<typeof p> => Boolean(p),
);

export default function PioggiaFoto({ lato, ferma }: { lato: "sinistra" | "destra"; ferma: boolean }) {
  const meta = Math.ceil(CARTOLINE.length / 2);
  const quali = lato === "sinistra" ? CARTOLINE.slice(0, meta) : CARTOLINE.slice(meta);
  if (quali.length === 0) return null;

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div
        className={`flex flex-col gap-10 ${ferma ? "wth-pioggia wth-pioggia--ferma" : "wth-pioggia"}`}
        style={{ animationDelay: lato === "destra" ? "-26s" : "0s" }}
      >
        {[...quali, ...quali].map((p, i) => (
          <figure
            key={p.foto.base + i}
            className="w-[150px] xl:w-[180px] bg-brand-offwhite/90 p-2 pb-1 shadow-lg shrink-0"
            style={{
              marginLeft: lato === "sinistra" ? `${(i % 3) * 18}px` : "auto",
              marginRight: lato === "destra" ? `${(i % 3) * 18}px` : "auto",
              transform: `rotate(${(i % 2 ? 1 : -1) * (1 + (i % 3))}deg)`,
            }}
          >
            <img
              src={`${p.foto.base}-400.webp`}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full aspect-square object-cover"
            />
            <figcaption className="text-[10px] uppercase tracking-wider text-brand-smoke/70 pt-1.5 pb-0.5 truncate">
              {p.luogo ?? "In giro per il mondo"}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* sfumature sopra e sotto: le cartoline entrano ed escono senza tagli netti */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand-wood to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-wood to-transparent" />
    </div>
  );
}
