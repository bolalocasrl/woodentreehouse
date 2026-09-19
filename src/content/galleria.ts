// Contenuti della galleria.
// Due modelli di pagina: "storia" (linea del tempo) e "progetti" (griglia di progetti).
// Le foto stanno in public/galleria/<area>/..., in versione grande e miniatura (.thumb.webp).

// Finché è true le pagine mostrano l'avviso di bozza e non vengono indicizzate
export const GALLERIA_IN_BOZZA = true;

export type Foto = {
  src: string;
  thumb: string;
  alt: string;
  w: number;
  h: number;
};

export type Tappa = {
  anno: string;
  data?: string;
  titolo: string;
  testo?: string;
  foto: Foto[];
  esempio?: boolean;
};

export type Progetto = {
  slug: string;
  titolo: string;
  luogo: string;
  anno: string;
  testo?: string;
  foto: Foto[];
  esempio?: boolean;
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

// Foto segnaposto (quelle già presenti sul sito), da sostituire con le vostre
const esempio = (nome: string, alt: string, w: number, h: number): Foto => ({
  src: `/galleria/esempio/${nome}.webp`,
  thumb: `/galleria/esempio/${nome}.thumb.webp`,
  alt,
  w,
  h,
});

const F = {
  colore: esempio("colore", "La Casetta tra gli alberi", 1600, 1200),
  terrazza: esempio("terrazza", "La terrazza della Casetta", 1600, 1067),
  interiore: esempio("interiore", "L'interno della Casetta", 1600, 1200),
  mondo: esempio("mondowth", "La Casetta vista dall'alto", 1600, 1067),
  alcolica: esempio("casettalcolica", "La Casetta Alcolica", 1600, 1067),
  trasporto: esempio("trasportoalcolica", "La Casetta Alcolica in viaggio", 1600, 1200),
  carnevale: esempio("carnevale", "La Casetta Alcolica al carnevale", 1600, 1067),
  festa: esempio("festa", "Una festa in Casetta", 1600, 1067),
  gruppo: esempio("herofotoshop", "Il gruppo di Wooden Tree House in montagna", 1600, 1067),
  setDesign: esempio("tshwth", "Allestimento in legno", 1200, 1600),
  madreNatura: esempio("madre-natura", "Madre Natura", 1600, 1200),
  cas2: esempio("cas2", "Opera in legno", 1200, 1600),
  jeck: esempio("jeck", "Dettaglio di un'opera", 1200, 1600),
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
      "Dalla prima trave del 2012 a oggi: come è nata e cresciuta la casetta sospesa tra i rami.",
    copertina: F.colore,
    tappe: [
      {
        anno: "2012",
        data: "Luglio 2012",
        titolo: "La prima costruzione",
        testo:
          "Fondata quasi per scommessa, la Casetta poggiava originariamente su tre alberi e un palo di sostegno.",
        foto: [F.colore, F.mondo],
      },
      {
        anno: "2016",
        titolo: "Titolo della tappa",
        testo: "Qui va il racconto di questa fase: cosa avete costruito, chi c'era, cosa è cambiato.",
        foto: [F.terrazza, F.interiore, F.gruppo],
        esempio: true,
      },
      {
        anno: "2020",
        titolo: "Titolo della tappa",
        testo: "Ogni tappa può avere da una a tante foto: il collage si adatta da solo.",
        foto: [F.interiore],
        esempio: true,
      },
      {
        anno: "Oggi",
        titolo: "Il nostro rifugio",
        testo:
          "Oggi è il nostro rifugio sospeso tra i rami. Ogni angolo della casetta è pensato per accogliere, ispirare e riconnettere con l'essenziale.",
        foto: [F.terrazza, F.colore, F.interiore, F.mondo],
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
    intro: "Se la montagna non va in Casetta, allora la Casetta andrà in montagna.",
    copertina: F.alcolica,
    tappe: [
      {
        anno: "2014",
        titolo: "Nasce la Casetta Alcolica",
        testo:
          "Le potenti ruote e la stabile struttura impediscono alle avversità esterne di diventare complessità interne.",
        foto: [F.alcolica, F.trasporto],
      },
      {
        anno: "2019",
        titolo: "Titolo della tappa",
        testo: "Qui va il racconto di questa fase della Casetta Alcolica.",
        foto: [F.trasporto, F.carnevale, F.alcolica],
        esempio: true,
      },
      {
        anno: "Oggi",
        titolo: "Titolo della tappa",
        testo: "Dove è arrivata oggi.",
        foto: [F.carnevale],
        esempio: true,
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
      "Scenografie in legno per eventi, fiere e spazi da trasformare. Ogni progetto, dall'idea al montaggio.",
    copertina: F.setDesign,
    progetti: [
      {
        slug: "point-of-view-social-hub",
        titolo: "Point Of View",
        luogo: "The Social Hub, Bologna",
        anno: "2024",
        testo:
          "Una scenografia capace di definire l'atmosfera dell'evento: dalla carpenteria pura alla visione creativa.",
        foto: [F.setDesign, F.cas2, F.jeck],
      },
      {
        slug: "progetto-esempio-1",
        titolo: "Nome del progetto",
        luogo: "Luogo",
        anno: "Anno",
        testo: "Breve descrizione del progetto: per chi, cosa avete costruito, com'è andata.",
        foto: [F.madreNatura, F.jeck, F.cas2, F.colore],
        esempio: true,
      },
      {
        slug: "progetto-esempio-2",
        titolo: "Nome del progetto",
        luogo: "Luogo",
        anno: "Anno",
        foto: [F.cas2, F.madreNatura],
        esempio: true,
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
    intro: "La festa in Casetta. Un'edizione, a volte due, ogni anno: ecco com'è andata.",
    copertina: F.festa,
    tappe: [
      {
        anno: "2023",
        data: "Estate 2023",
        titolo: "Edizione di esempio",
        testo: "Per ogni edizione: data, un titolo o un tema, due righe di racconto e le foto.",
        foto: [F.festa, F.gruppo, F.terrazza],
        esempio: true,
      },
      {
        anno: "2024",
        titolo: "Edizione di esempio",
        foto: [F.festa, F.interiore],
        esempio: true,
      },
      {
        anno: "2025",
        titolo: "Edizione di esempio",
        foto: [F.gruppo],
        esempio: true,
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
      "La Casetta Alcolica si muove in centro a San Giovanni in Persiceto e porta la festa al carnevale.",
    copertina: F.carnevale,
    tappe: [
      {
        anno: "2024",
        data: "Carnevale 2024",
        titolo: "Edizione di esempio",
        testo: "Per ogni edizione: data, un titolo o un tema, due righe di racconto e le foto.",
        foto: [F.carnevale, F.alcolica, F.trasporto],
        esempio: true,
      },
      {
        anno: "2025",
        data: "Carnevale 2025",
        titolo: "Edizione di esempio",
        foto: [F.carnevale, F.trasporto],
        esempio: true,
      },
    ],
  },
];

export const trovaArea = (slug?: string) => AREE.find((a) => a.slug === slug);
