// Contenuti della galleria.
// Due modelli di pagina: "storia" (linea del tempo) e "progetti" (griglia di progetti).
// Le foto stanno in public/galleria/<area>/... in più misure (nome-800.webp, nome-1600.webp, nome-2400.webp),
// create con "npm run foto"; dimensioni e misure sono in foto.json.
import manifest from "./foto.json";

// Finché è true le pagine mostrano l'avviso di bozza e non vengono indicizzate
export const GALLERIA_IN_BOZZA = true;

export type Foto = {
  base: string;
  alt: string;
  w: number;
  h: number;
  larghezze: number[];
};

const MANIFEST = manifest as Record<string, { w: number; h: number; larghezze: number[] }>;

export function foto(base: string, alt: string): Foto {
  const info = MANIFEST[base];
  if (!info) throw new Error(`Foto non trovata in foto.json: ${base} (hai lanciato npm run foto?)`);
  return { base, alt, ...info };
}

// La misura più piccola che copre la larghezza richiesta
export function urlFoto(f: Foto, larghezza = 1600) {
  const l = f.larghezze.find((x) => x >= larghezza) ?? f.larghezze[f.larghezze.length - 1];
  return `${f.base}-${l}.webp`;
}

export const srcSetFoto = (f: Foto) => f.larghezze.map((l) => `${f.base}-${l}.webp ${l}w`).join(", ");


export type Tappa = {
  anno: string;
  data?: string;
  titolo: string;
  testo?: string;
  foto: Foto[];
  // true = testo o data ancora da verificare con il gruppo
  daConfermare?: boolean;
};

export type Progetto = {
  slug: string;
  titolo: string;
  luogo: string;
  anno: string;
  testo?: string;
  foto: Foto[];
  daConfermare?: boolean;
};

type AreaBase = {
  slug: string;
  titolo: string;
  etichetta: string;
  categoria: "realizzazioni" | "eventi";
  intro: string;
  copertina: Foto;
  // Sezione della home da cui si arriva
  sezioneHome: string;
};

export type AreaStoria = AreaBase & { modello: "storia"; tappe: Tappa[] };
export type AreaProgetti = AreaBase & { modello: "progetti"; progetti: Progetto[] };
export type Area = AreaStoria | AreaProgetti;

// Scorciatoia: le foto di una cartella, es. serie("casetta/2024-avanti-tutta", ["Alt 1", "Alt 2"])
// prende 01, 02, ... nell'ordine delle didascalie
const serie = (cartella: string, didascalie: string[]) =>
  didascalie.map((alt, i) => foto(`/galleria/${cartella}/${String(i + 1).padStart(2, "0")}`, alt));

// ---------- LA CASETTA ----------
const casetta = {
  inizi: serie("casetta/2012-gli-inizi", ["Il giardino di Giova visto dall'alto, dove sorge la Casetta", "Il gruppo sulla Casetta nei primi anni"]),
  cantiere: serie("casetta/2019-il-grande-cantiere", [
    "La Casetta smontata durante il cantiere del 2019",
    "La nuova struttura prende forma tra gli alberi",
    "Travi e assi nel giardino durante i lavori",
    "Mani al lavoro sul pavimento nuovo",
    "Il pavimento della Casetta durante la ricostruzione",
  ]),
  terrazzo: serie("casetta/2020-il-terrazzo", ["Il terrazzo nuovo della Casetta"]),
  interni: serie("casetta/2022-gli-interni", ["Il salotto dentro la Casetta", "L'altalena e le luci dentro la Casetta", "Un gatto in visita sulla Casetta"]),
  ingresso: serie("casetta/2023-il-nuovo-ingresso", ["La Casetta in autunno, con la nuova scala", "Il viale di campagna che porta alla Casetta"]),
  avantiTutta: serie("casetta/2024-avanti-tutta", [
    "La Casetta con la scala e i banconi dipinti",
    "I banconi del bar pieni di piante",
    "Arriva l'acqua in Casetta",
    "Il bancone del bar con le onde dipinte",
    "Un ospite gonfiabile dentro la Casetta",
    "La Casetta tra gli alberi, tutta colorata",
  ]),
  oggi: serie("casetta/oggi", ["L'interno della Casetta con le lucine accese", "La Casetta vista dal giardino", "L'angolo con l'insegna Havana Club"]),
};

// ---------- LA CASETTA ALCOLICA ----------
const alcolica = {
  primo: serie("casetta-alcolica/2018-02-il-primo-carnevale", [
    "Il telaio della prima Casetta Alcolica davanti al garage",
    "Gli ultimi ritocchi prima del carnevale",
    "La prima Casetta Alcolica, bianca con il logo",
    "Lavori notturni in garage",
    "Il bancone visto da vicino",
  ]),
  legno: serie("casetta-alcolica/2018-04-in-legno", ["La Casetta Alcolica in legno, con il tetto e i pois", "Sotto il tetto della Casetta Alcolica"]),
  rinnova: serie("casetta-alcolica/2019-si-rinnova", [
    "Il gruppo con i caschetti dentro la Casetta Alcolica",
    "Le nuove pareti in legno massiccio",
    "Si costruisce la nuova Casetta Alcolica",
    "La Casetta Alcolica pronta, con la scritta Bom",
    "I ragazzi con i caschetti davanti al bancone",
    "La Casetta Alcolica caricata sul camion",
  ]),
  nuove: serie("casetta-alcolica/2024-nuove-casette", ["Il bancone con i tentacoli dipinti", "Il bancone verde con le onde", "Il bancone all'ingresso del giardino"]),
  ritorno: serie("casetta-alcolica/2026-il-ritorno", ["La Casetta Alcolica caricata sul furgone, pronta per il carnevale 2026"]),
};

// ---------- ALLESTIMENTI ----------
const allestimenti = {
  portale: serie("allestimenti/point-of-view", [
    "Il gruppo davanti al Portale al The Social Hub",
    "Il bozzetto del Portale",
    "Jack dipinge i pezzi del Portale in Casetta",
    "Il montaggio del Portale sul palco",
    "Il Portale finito sul palco del The Social Hub",
  ]),
  madreNatura: serie("allestimenti/madre-natura", [
    "Madre Natura, il muro dietro la consolle",
    "Il volto di Madre Natura, giugno 2024",
    "Madre Natura vista dal giardino",
    "Jack al lavoro sulla scala",
    "Madre Natura illuminata di notte",
    "Il fiore in rilievo di Madre Natura",
    "La mano e il fiore, dettaglio",
    "Gli occhi appena montati",
    "Madre Natura con la bandiera pirata",
    "Madre Natura e il pavimento di pallet",
    "Si costruisce il palco davanti a Madre Natura",
    "Il palco in costruzione, aprile 2025",
  ]),
  streetArt: serie("allestimenti/street-art", [
    "I banconi dipinti con le onde",
    "La Casetta con il polpo dipinto",
    "L'insegna con la donna farfalla sopra il bar",
    "La piuma e il mostro viola sul muro di casa",
    "Il bar illuminato di notte",
    "La bandiera pirata tra le luci",
  ]),
};

// ---------- WOODEN TREE NIGHT ----------
const wtn = {
  2018: serie("wooden-tree-night/2018-06", ["La folla davanti al palco, giugno 2018", "La festa nel giardino della Casetta, giugno 2018"]),
  2021: serie("wooden-tree-night/2021-09", ["I DJ alla consolle, settembre 2021", "Mani in alto tra le foglie"]),
  2022: serie("wooden-tree-night/2022-06-wtn-5", ["Il portale di rami con la scritta WTN Vol. V", "Il pubblico della quinta edizione", "La consolle nel giardino", "Si balla sotto gli alberi"]),
  2023: serie("wooden-tree-night/2023-06-wtn-6", ["Il giardino pieno per WTN 6"]),
  2024: serie("wooden-tree-night/2024-06-wtn-7", [
    "Il giardino di notte durante WTN 7",
    "Si balla sotto le luci rosa",
    "La folla davanti alla Casetta",
    "Il pubblico davanti al bar",
    "Il giardino pieno davanti ai banconi dipinti",
    "La festa vista dall'alto",
    "Un gruppo di amici davanti al palco",
    "Occhiali a specchio e luci di festa",
    "Un abbraccio in mezzo alla festa",
    "Fumo verde vicino alla consolle",
  ]),
};

// ---------- WOODEN TREE MOBILE ----------
const mobile = {
  copertina: foto("/galleria/wooden-tree-mobile/copertina/01", "La Casetta Alcolica tra i fuochi al carnevale"),
  2018: serie("wooden-tree-mobile/2018-02", [
    "La Casetta Alcolica in piazza al carnevale 2018",
    "Il gruppo davanti al bancone, carnevale 2018",
    "La piazza intorno alla Casetta Alcolica",
    "La Casetta Alcolica di sera tra i coriandoli",
    "Il bancone pieno di gente",
    "Foto di gruppo davanti alla Casetta Alcolica",
  ]),
  2019: serie("wooden-tree-mobile/2019-02", ["La Casetta Alcolica in piazza, carnevale 2019", "Foto di gruppo di notte, carnevale 2019"]),
  2020: serie("wooden-tree-mobile/2020-02", ["Qualche bottiglia di troppo, carnevale 2020"]),
  2026: serie("wooden-tree-mobile/2026-02", ["La folla davanti alla Casetta Alcolica, carnevale 2026", "Il DJ accanto al bancone con i tentacoli", "I fuochi davanti alla Casetta Alcolica"]),
};

export const AREE: Area[] = [
  {
    slug: "casetta",
    modello: "storia",
    categoria: "realizzazioni",
    etichetta: "01 — The Origin",
    titolo: "La Casetta",
    sezioneHome: "casetta",
    intro:
      "Nata nel 2012 da una sfida, cresciuta anno dopo anno tra i rami del giardino di Giova, a San Giovanni in Persiceto.",
    copertina: casetta.avantiTutta[0],
    tappe: [
      {
        anno: "2012",
        data: "Luglio 2012",
        titolo: "La sfida",
        testo:
          "Tutto parte da una sfida dello zio William a Giova: costruire una casetta sull'albero nel giardino di casa. Una decina di amici la raccoglie. La prima Casetta poggia su tre alberi e un palo di sostegno.",
        foto: casetta.inizi,
      },
      {
        anno: "2019",
        data: "Settembre 2019",
        titolo: "Il grande cantiere",
        testo:
          "Anno dopo anno la Casetta si allarga. Nel 2019 si smonta e si ricostruisce: nuove travi, un pavimento nuovo e tante mani al lavoro.",
        foto: casetta.cantiere,
        daConfermare: true,
      },
      {
        anno: "2020",
        titolo: "Il terrazzo nuovo",
        testo: "Arriva il terrazzo nuovo: più spazio sospeso tra i rami, per stare insieme e guardare il panorama dall'alto.",
        foto: casetta.terrazzo,
        daConfermare: true,
      },
      {
        anno: "2022",
        titolo: "Dentro la Casetta",
        testo: "Divani, lucine, un'altalena e qualche ospite a quattro zampe: gli interni diventano il nostro salotto.",
        foto: casetta.interni,
      },
      {
        anno: "2023",
        titolo: "Il nuovo ingresso",
        testo:
          "Si demolisce il vecchio ingresso e arrivano una scala e un accesso nuovi. In fondo al viale di campagna, la Casetta è sempre lì.",
        foto: casetta.ingresso,
      },
      {
        anno: "2024",
        data: "Giugno 2024",
        titolo: "Avanti tutta",
        testo:
          "Arriva l'acqua, i banconi del bar si riempiono di piante e le pareti si colorano con le opere di Jack, il nostro amico artista.",
        foto: casetta.avantiTutta,
      },
      {
        anno: "Oggi",
        titolo: "Il nostro rifugio",
        testo:
          "Oggi è il nostro ritrovo, sospeso tra i rami. Ogni angolo della Casetta è pensato per accogliere, ispirare e riconnettere con l'essenziale.",
        foto: casetta.oggi,
      },
    ],
  },
  {
    slug: "casetta-alcolica",
    modello: "storia",
    categoria: "realizzazioni",
    etichetta: "02 — Il bar mobile",
    titolo: "La Casetta Alcolica",
    sezioneHome: "alcolica",
    intro:
      "Nata nel 2018 da un'idea semplice: mettere le ruote a una casetta e portare vino, birra e musica in centro a San Giovanni.",
    copertina: alcolica.rinnova[0],
    tappe: [
      {
        anno: "2018",
        data: "Febbraio 2018",
        titolo: "Il primo carnevale",
        testo:
          "La prima Casetta Alcolica è molto semplice: un telaio in legno, un bancone bianco con il logo e tanta voglia di fare festa. Debutta al carnevale di San Giovanni in Persiceto.",
        foto: alcolica.primo,
      },
      {
        anno: "2018",
        data: "Primavera 2018",
        titolo: "Si passa al legno",
        testo: "Dopo il primo carnevale la Casetta Alcolica si veste di legno, con il tetto e i pois.",
        foto: alcolica.legno,
        daConfermare: true,
      },
      {
        anno: "2019",
        data: "Febbraio 2019",
        titolo: "La Casetta migliora",
        testo:
          "Il secondo anno la Casetta Alcolica cresce: legno massiccio, pareti nuove, caschetti da cantiere e un camion per portarla in giro.",
        foto: alcolica.rinnova,
      },
      {
        anno: "2020",
        titolo: "La consolle, poi lo stop",
        testo:
          "Nel 2020 arriva anche una casettina tutta per il DJ. Poi il Covid ferma tutto, e la Casetta Alcolica si prende qualche anno di pausa.",
        foto: mobile[2020],
      },
      {
        anno: "2024",
        titolo: "Nuove casette",
        testo: "Accanto all'Alcolica nascono nuovi banconi su ruote, dipinti a mano con tentacoli e onde.",
        foto: alcolica.nuove,
        daConfermare: true,
      },
      {
        anno: "2026",
        data: "Febbraio 2026",
        titolo: "Il ritorno",
        testo:
          "La Casetta Alcolica torna in piazza con i permessi ufficiali del Comune e della Pro Loco: il suo posto è sotto uno dei due archi di San Giovanni.",
        foto: alcolica.ritorno,
      },
    ],
  },
  {
    slug: "allestimenti",
    modello: "progetti",
    categoria: "realizzazioni",
    etichetta: "03 — Creative Build",
    titolo: "Allestimenti",
    sezioneHome: "allestimenti",
    intro:
      "Scenografie e opere per le nostre feste e per chi ce le chiede. Molte nascono insieme a Jack, il nostro amico artista.",
    copertina: allestimenti.portale[4],
    progetti: [
      {
        slug: "point-of-view-social-hub",
        titolo: "Il Portale",
        luogo: "Point Of View × The Social Hub, Bologna",
        anno: "2024",
        testo:
          "Con Jack e Point Of View abbiamo progettato e costruito un portale in legno dipinto per il palco del The Social Hub di Bologna: dal bozzetto su carta al montaggio, fino alla festa.",
        foto: allestimenti.portale,
      },
      {
        slug: "madre-natura",
        titolo: "Madre Natura",
        luogo: "La Casetta",
        anno: "2024 — 2025",
        testo:
          "Il grande volto dipinto da Jack sul muro dietro la consolle, dove suonano i DJ alle nostre feste. Iniziato a giugno 2024 e cresciuto nei mesi successivi, fino al palco nuovo.",
        foto: allestimenti.madreNatura,
      },
      {
        slug: "street-art-in-casetta",
        titolo: "Street Art in Casetta",
        luogo: "La Casetta",
        anno: "2024",
        testo: "Banconi, insegne e pareti: le opere di Jack che vestono la Casetta per le feste e per tutto l'anno.",
        foto: allestimenti.streetArt,
      },
    ],
  },
  {
    slug: "wooden-tree-night",
    modello: "storia",
    categoria: "eventi",
    etichetta: "Secret Party",
    titolo: "Wooden Tree Night",
    sezioneHome: "eventi",
    intro:
      "La festa in Casetta. È nata come una festicciola tra amici intorno al primo giugno, con un DJ: oggi è una delle feste più attese di San Giovanni.",
    copertina: wtn[2018][1],
    tappe: [
      {
        anno: "2018",
        data: "Giugno 2018",
        titolo: "La festa riempie il giardino",
        testo: "Dalla Casetta la festa scende in giardino: DJ, luci tra gli alberi e sempre più persone.",
        foto: wtn[2018],
      },
      {
        anno: "2021",
        data: "Settembre 2021",
        titolo: "Si torna a ballare",
        testo: "Dopo la pausa, la festa riparte a fine estate.",
        foto: wtn[2021],
        daConfermare: true,
      },
      {
        anno: "2022",
        data: "Giugno 2022",
        titolo: "WTN Vol. V",
        testo: "La quinta edizione, con il portale di rami all'ingresso e il giardino pieno fino a tarda notte.",
        foto: wtn[2022],
      },
      {
        anno: "2023",
        data: "Giugno 2023",
        titolo: "WTN 6",
        foto: wtn[2023],
      },
      {
        anno: "2024",
        data: "Giugno 2024",
        titolo: "WTN 7",
        testo: "Il giardino pieno fino all'ultimo angolo, sotto gli alberi e davanti ai banconi dipinti.",
        foto: wtn[2024],
      },
    ],
  },
  {
    slug: "wooden-tree-mobile",
    modello: "storia",
    categoria: "eventi",
    etichetta: "Itinerant — Public",
    titolo: "Wooden Tree Mobile",
    sezioneHome: "eventi",
    intro:
      "La Casetta Alcolica porta la festa al carnevale di San Giovanni in Persiceto: vino, birra, musica e coriandoli in piazza.",
    copertina: mobile.copertina,
    tappe: [
      {
        anno: "2018",
        data: "Febbraio 2018",
        titolo: "Il debutto in piazza",
        testo: "La prima volta al carnevale: il bancone bianco con il logo, i palloncini e la piazza piena.",
        foto: mobile[2018],
      },
      {
        anno: "2019",
        data: "Febbraio 2019",
        titolo: "Si torna in piazza",
        testo: "Il secondo carnevale, con la nuova Casetta Alcolica in legno.",
        foto: mobile[2019],
      },
      {
        anno: "2020",
        data: "Febbraio 2020",
        titolo: "Prima dello stop",
        testo: "L'ultimo carnevale prima della pausa. Qualche bottiglia non è arrivata a fine giornata.",
        foto: mobile[2020],
      },
      {
        anno: "2026",
        data: "Febbraio 2026",
        titolo: "Di nuovo in piazza",
        testo: "Si torna, stavolta con i permessi ufficiali: il posto è sotto l'arco, con il DJ e i fuochi.",
        foto: mobile[2026],
      },
    ],
  },
];

export const trovaArea = (slug?: string) => AREE.find((a) => a.slug === slug);
