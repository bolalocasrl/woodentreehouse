// Contenuti della galleria.
// Due modelli di pagina: "storia" (linea del tempo) e "progetti" (griglia di progetti).
// Le foto stanno in public/galleria/<area>/... in più misure (nome-800.webp, nome-1600.webp, nome-2400.webp),
// create con "npm run foto"; dimensioni e misure sono in foto.json.
import manifest from "./foto.json";

// Finché è true le pagine mostrano l'avviso di bozza e non vengono indicizzate
export const GALLERIA_IN_BOZZA = false;

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
  prima: serie("casetta/2012-la-prima-casetta", [
    "La prima struttura della Casetta tra gli alberi, agosto 2012",
    "Il tetto e le travi della prima Casetta",
    "Dentro la prima Casetta, con le tende di perline",
    "Il cartello all'ingresso: \"Se l'aria non entra, la facciamo entrare\"",
  ]),
  aerea: foto("/galleria/casetta/2012-gli-inizi/01", "Il giardino di Giova visto dall'alto, dove sorge la Casetta"),
  allarga: serie("casetta/2013-si-allarga", [
    "Quattro dei ragazzi seduti sulla nuova piattaforma, luglio 2013",
    "Si costruisce il piano nuovo",
    "La carrucola della teleferica",
    "La Casetta con la scala, ottobre 2013",
    "Il pavimento nuovo della piattaforma",
    "La Casetta nel verde, primavera 2013",
  ]),
  serate: serie("casetta/2014-le-prime-serate", [
    "La Casetta tra gli alberi in primavera, 2014",
    "I ragazzi affacciati dalla Casetta",
    "Lavori sul tetto",
    "La Casetta illuminata di notte, dicembre 2014",
  ]),
  gruppoPrimi: foto("/galleria/casetta/2012-gli-inizi/02", "Il gruppo sulla Casetta con l'insegna WTH"),
  nome: serie("casetta/2016-il-nome-sulla-porta", [
    "La scritta Wooden Tree House dipinta sulla porta",
    "La Casetta d'inverno, dicembre 2016",
    "Il cancello della casa di Giova",
  ]),
  piattaforma: serie("casetta/2017-la-piattaforma", [
    "Dalla piattaforma panoramica guardando il terrazzo",
    "Si costruisce la piattaforma in cima agli alberi",
    "La struttura nuova sotto la Casetta",
    "Il bancone sotto la Casetta",
    "Il gruppo con le prime felpe WTH, ottobre 2017",
    "La Casetta con le luci di Natale, dicembre 2017",
  ]),
  interni2018: serie("casetta/2018-nuovi-interni", [
    "La Casetta a marzo 2018",
    "Il nuovo interno con il prato sintetico, dicembre 2018",
    "Il gruppo dentro la Casetta rinnovata",
  ]),
  cantiere: serie("casetta/2019-il-grande-cantiere", [
    "La Casetta smontata durante il cantiere del 2019",
    "La nuova struttura prende forma tra gli alberi",
    "Travi e assi nel giardino durante i lavori",
    "Mani al lavoro sul pavimento nuovo",
    "Il pavimento della Casetta durante la ricostruzione",
    "Il telaio nuovo di notte, giugno 2019",
    "Il tetto nuovo con le tegole, ottobre 2019",
  ]),
  terrazzo: serie("casetta/2020-il-terrazzo", [
    "Il terrazzo nuovo della Casetta",
    "La scritta Wooden Tree House sotto il tetto nuovo, gennaio 2020",
    "La base del terrazzo in costruzione",
  ]),
  stufa: serie("casetta/2021-la-stufa", ["La stufa accesa dentro la Casetta, gennaio 2021", "La passerella nuova all'ingresso, aprile 2021"]),
  interni: serie("casetta/2022-gli-interni", ["Il salotto dentro la Casetta", "L'altalena e le luci dentro la Casetta", "Un gatto in visita sulla Casetta"]),
  ingresso: serie("casetta/2023-il-nuovo-ingresso", [
    "La Casetta in autunno, con la nuova scala",
    "Il viale di campagna che porta alla Casetta",
    "Si scava per portare l'acqua alla Casetta",
    "Il gruppo sull'ingresso nuovo, aprile 2023",
    "Si costruisce il nuovo ingresso",
    "La porta intagliata dell'ingresso",
    "Il viale con il cane della Casetta",
  ]),
  avantiTutta: serie("casetta/2024-avanti-tutta", [
    "La Casetta con la scala e i banconi dipinti",
    "I banconi del bar pieni di piante",
    "Il rubinetto dell'acqua al bar",
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
    "La Casetta Alcolica a pois in piazza di sera, febbraio 2018",
    "La Casetta Alcolica a pois tra i coriandoli, martedì grasso 2018",
  ]),
  legno: serie("casetta-alcolica/2018-04-in-legno", ["La Casetta Alcolica a pois in giardino", "Sotto il tetto della Casetta Alcolica"]),
  rinnova: serie("casetta-alcolica/2019-si-rinnova", [
    "Il gruppo con i caschetti dentro la Casetta Alcolica",
    "Le nuove pareti in legno massiccio",
    "Si costruisce la nuova Casetta Alcolica",
    "La Casetta Alcolica pronta, con la scritta Bom",
    "I ragazzi con i caschetti davanti al bancone",
    "La Casetta Alcolica caricata sul camion",
  ]),
  giardino: serie("casetta-alcolica/2021-in-giardino", ["La Casetta Alcolica in giardino, giugno 2021"]),
  nuove: serie("casetta-alcolica/2024-nuove-casette", ["La postazione DJ con i tentacoli dipinti", "La postazione DJ verde con le onde", "La postazione DJ all'ingresso del giardino"]),
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
  palco: serie("allestimenti/il-palco", [
    "Il palco finito davanti a Madre Natura",
    "Le travi della base del palco, aprile 2025",
    "Si prepara il terreno per il palco",
    "La struttura di pallet prende forma",
    "Si posano i pallet del palco",
    "Il pavimento nuovo del palco, agosto 2025",
    "Si inchiodano le assi del pavimento",
    "Il palco con il pavimento finito",
    "Il palco visto di lato",
    "Gli ultimi tagli alle assi",
    "L'impianto audio sul palco davanti a Madre Natura",
    "Il bar al piano terra con i banconi dipinti",
  ]),
  stencil: serie("allestimenti/stencil-cassa", [
    "La cassa con lo stencil WTH verde",
    "Lo stencil del logo WTH ritagliato a mano",
    "La prova dello stencil con la vernice nera",
    "Lo stencil dopo la prima mano",
    "La cassa appena verniciata",
    "La cassa verde sul palco",
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
  2016: serie("wooden-tree-night/2016-06", ["La consolle con l'insegna WTH, giugno 2016"]),
  2017: serie("wooden-tree-night/2017-06", ["Il gruppo sotto la Casetta, giugno 2017", "Due amici a fine festa"]),
  2018: serie("wooden-tree-night/2018-06", [
    "La folla davanti al palco, giugno 2018",
    "La festa nel giardino della Casetta, giugno 2018",
    "Il giardino pieno sotto le luci",
    "Si balla tra gli alberi",
    "La festa vista dal palco",
  ]),
  2021: serie("wooden-tree-night/2021-09", [
    "I DJ alla consolle, settembre 2021",
    "Mani in alto tra le foglie",
    "La consolle con il disegno della Casetta",
    "La consolle illuminata di blu",
    "I DJ in consolle",
    "Si balla davanti alla consolle",
  ]),
  2022: serie("wooden-tree-night/2022-06-wtn-5", [
    "Il portale di rami con la scritta WTN Vol. V",
    "Il pubblico della quinta edizione",
    "La consolle nel giardino",
    "Si balla sotto gli alberi",
    "La locandina di WTN 5",
    "Il palco con le luci, giugno 2022",
    "Le luci sul palco di WTN 5",
  ]),
  "2022-10": serie("wooden-tree-night/2022-10", ["Il giardino pieno di luci colorate, ottobre 2022", "La folla sotto le lucine"]),
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
// la locandina apre la tappa di WTN 5
const wtn5 = [wtn[2022][4], ...wtn[2022].slice(0, 4), ...wtn[2022].slice(5)];

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
  2019: serie("wooden-tree-mobile/2019-02", [
    "La Casetta Alcolica in piazza, carnevale 2019",
    "Foto di gruppo di notte, carnevale 2019",
    "Il gruppo al completo in piazza, carnevale 2019",
  ]),
  2020: serie("wooden-tree-mobile/2020-02", [
    "Qualche bottiglia di troppo, carnevale 2020",
    "I fuochi davanti alla Casetta Alcolica, carnevale 2020",
    "Fumo verde sopra la Casetta Alcolica",
  ]),
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
        data: "Estate 2012",
        titolo: "La sfida",
        testo:
          "Tutto parte da una sfida dello zio William a Giova: costruire una casetta sull'albero nel giardino di casa. Una decina di amici la raccoglie. La prima Casetta poggia su tre alberi e un palo di sostegno, e ad agosto è già in piedi.",
        foto: [...casetta.prima, casetta.aerea],
      },
      {
        anno: "2013",
        titolo: "Si allarga",
        testo:
          "Il secondo anno arrivano un piano nuovo, una piattaforma per sedersi a guardare il giardino dall'alto e perfino una teleferica tra gli alberi.",
        foto: casetta.allarga,
      },
      {
        anno: "2014",
        titolo: "Le prime serate",
        testo: "L'edera avvolge la Casetta, si sistema il tetto e arrivano le prime lucine: la Casetta diventa il posto dove passare le sere.",
        foto: [...casetta.serate, casetta.gruppoPrimi],
      },
      {
        anno: "2016",
        titolo: "Il nome sulla porta",
        testo: "Sulla porta compare la scritta Wooden Tree House. Da qui in poi la Casetta ha un nome, e un logo.",
        foto: casetta.nome,
      },
      {
        anno: "2017",
        titolo: "La piattaforma panoramica",
        testo:
          "In cima agli alberi nasce la piattaforma per vedere il panorama dall'alto. Sotto, un bancone per quando arriva gente. E in autunno escono le prime felpe WTH.",
        foto: casetta.piattaforma,
      },
      {
        anno: "2018",
        titolo: "Dentro si rinnova",
        testo: "La Casetta cambia faccia anche all'interno: pavimento verde, lucine e spazio per stare tutti insieme.",
        foto: casetta.interni2018,
      },
      {
        anno: "2019",
        data: "Giugno — ottobre 2019",
        titolo: "Il grande cantiere",
        testo:
          "La Casetta si smonta e si ricostruisce da capo: travi nuove, un pavimento nuovo, il tetto con le tegole e tante mani al lavoro per tutta l'estate.",
        foto: casetta.cantiere,
      },
      {
        anno: "2020",
        titolo: "Il terrazzo nuovo",
        testo: "Arriva il terrazzo nuovo: più spazio sospeso tra i rami, per stare insieme e guardare il panorama.",
        foto: casetta.terrazzo,
      },
      {
        anno: "2021",
        titolo: "La stufa",
        testo: "Con la stufa accesa la Casetta diventa un rifugio anche d'inverno. In primavera, una passerella nuova all'ingresso.",
        foto: casetta.stufa,
      },
      {
        anno: "2022",
        titolo: "Dentro la Casetta",
        testo: "Divani, lucine, un'altalena e qualche ospite a quattro zampe: gli interni diventano il nostro salotto.",
        foto: casetta.interni,
      },
      {
        anno: "2023",
        titolo: "L'acqua e il nuovo ingresso",
        testo:
          "Si scava per portare l'acqua fino alla Casetta, si demolisce il vecchio ingresso e arrivano una scala e un accesso nuovi, con la porta intagliata.",
        foto: casetta.ingresso,
      },
      {
        anno: "2024",
        data: "Giugno 2024",
        titolo: "Avanti tutta",
        testo:
          "L'acqua arriva fino al bar, i banconi si riempiono di piante e le pareti si colorano con le opere di Jack, il nostro amico artista.",
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
          "La prima Casetta Alcolica è molto semplice: un telaio in legno e un bancone bianco con il logo. Debutta al carnevale di San Giovanni in Persiceto e, prima dell'ultima domenica, si veste già di marrone con i pois.",
        foto: alcolica.primo,
      },
      {
        anno: "2018",
        data: "Primavera 2018",
        titolo: "In giardino",
        testo: "Finito il carnevale, la Casetta Alcolica torna in giardino e diventa il bar delle nostre serate.",
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
          "Nel 2020 arriva anche una casettina tutta per il DJ. Poi il Covid ferma tutto, e la Casetta Alcolica si prende qualche anno di pausa dalla piazza.",
        foto: mobile[2020],
      },
      {
        anno: "2021",
        titolo: "La festa resta in giardino",
        testo: "Senza carnevale, la Casetta Alcolica resta in giardino con la sua insegna, pronta a ripartire.",
        foto: alcolica.giardino,
        daConfermare: true,
      },
      {
        anno: "2024",
        titolo: "La postazione del DJ",
        testo: "Arriva la postazione del DJ su ruote, dipinta a mano con tentacoli e onde: si sposta insieme alla Casetta Alcolica.",
        foto: alcolica.nuove,
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
        slug: "il-palco",
        titolo: "Il Palco",
        luogo: "La Casetta",
        anno: "2025",
        testo:
          "Il palco per i DJ davanti a Madre Natura: la base di travi e pallet ad aprile, il pavimento in assi ad agosto, poi l'impianto audio. Costruito tutto a mano, per le nostre feste.",
        foto: allestimenti.palco,
      },
      {
        slug: "stencil-cassa",
        titolo: "Lo stencil sulla cassa",
        luogo: "La Casetta",
        anno: "2025",
        testo: "Il logo WTH ritagliato a mano, provato su carta e spruzzato in verde sulle casse del nostro impianto.",
        foto: allestimenti.stencil,
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
        anno: "2016",
        data: "Giugno 2016",
        titolo: "La prima Wooden Tree Night",
        testo: "Una consolle sotto la Casetta con l'insegna WTH, il giardino pieno a inizio giugno: la festa è già grande.",
        foto: wtn[2016],
      },
      {
        anno: "2017",
        data: "Giugno 2017",
        titolo: "Si balla sotto la Casetta",
        testo: "La Wooden Tree Night di inizio giugno diventa l'appuntamento fisso dell'estate.",
        foto: wtn[2017],
      },
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
        titolo: "APE in Casetta",
        testo: "Dopo la pausa si torna a ballare con un APE in Casetta di fine estate, la consolle vestita dal disegno della Casetta.",
        foto: wtn[2021],
      },
      {
        anno: "2022",
        data: "Giugno 2022",
        titolo: "WTN Vol. V",
        testo: "La quinta edizione, con il portale di rami all'ingresso, un palco vero e il giardino pieno fino a tarda notte.",
        foto: wtn5,
      },
      {
        anno: "2022",
        data: "Ottobre 2022",
        titolo: "WTN Autumn Edition",
        testo: "La festa d'autunno, tra APE in Casetta e Wooden Tree Night: lucine colorate e il giardino pieno.",
        foto: wtn["2022-10"],
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
        testo: "Il secondo carnevale, con la nuova Casetta Alcolica in legno e un gruppo sempre più grande.",
        foto: mobile[2019],
      },
      {
        anno: "2020",
        data: "Febbraio 2020",
        titolo: "Prima dello stop",
        testo: "L'ultimo carnevale prima della pausa, chiuso con i fuochi. Qualche bottiglia non è arrivata a fine giornata.",
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
