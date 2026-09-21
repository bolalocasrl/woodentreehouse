// WTH around the world: i ragazzi in giro per il mondo con un capo della Casetta.
// Post presi dal profilo Instagram (foto, luogo, data, didascalia, mi piace, link al post).
// Foto preparate con "npm run foto" (originali quando disponibili, altrimenti la foto del post a 1080px).
import { foto, type Foto } from "./galleria";

export type PostMondo = {
  foto: Foto;
  luogo?: string;
  url: string;
  didascalia?: string;
  data?: string;
  // "Mi piace" reali del post, se noti
  likes?: number;
};

const PROFILO = "https://www.instagram.com/wooden_tree_house/";
const post = (shortcode: string) => `https://www.instagram.com/p/${shortcode}/`;
const f = (nome: string, alt: string) => foto(`/galleria/around-the-world/${nome}`, alt);

// Post di Instagram, dal più recente
export const POST_MONDO: PostMondo[] = [
  { foto: f("ig-djucdvxinut", "Felpa WTH a Cappadocia, Turchia"), luogo: "Cappadocia, Turchia", url: post("DJUCDVxiNUt"), data: "6 maggio 2025", likes: 134, didascalia: "Qui @bergulz, maestro di abbinamenti, ci mostra il colore perfetto per le foto alle mongolfiere della Cappadocia. Previdente nel preparare la…" },
  { foto: f("ig-c1r4stkoqa9", "Felpa WTH a Piramidi di Giza, Egitto"), luogo: "Piramidi di Giza, Egitto", url: post("C1r4StkoQA9"), data: "4 gennaio 2024", likes: 136, didascalia: "Punta in alto o fermati dove vuoi. Non importa dove arrivi: quello che conta, in fondo, è il viaggio 🏜️🇪🇬 E buon 2024 in ritardo dai ragazzi della…" },
  { foto: f("ig-czump1uo0x3", "Felpa WTH a Siviglia, Spagna"), luogo: "Siviglia, Spagna", url: post("CzuMp1uo0x3"), data: "16 novembre 2023", likes: 105, didascalia: "@jessica_landi ci conferma che c’è un proverbio sempre vero: chi va a Siviglia, la felpa se la piglia 🤠🌳 Contatta il tuo casettaro di fiducia per…" },
  { foto: f("ig-cxii6baoasy", "Felpa WTH a Premantura, Croazia"), luogo: "Premantura, Croazia", url: post("CxiI6baoASy"), data: "23 settembre 2023", likes: 100, didascalia: "Prove di mimetismo perché si sa che, in fondo, non si è mai davvero pronti per salutare l'autunno 🌥️🍂" },
  { foto: f("ig-cxfpxqaos0a", "Felpa WTH a Serengeti, Tanzania"), luogo: "Serengeti, Tanzania", url: post("CxFpXqAoS0a"), data: "12 settembre 2023", likes: 100, didascalia: "Continua la ricerca dell’albero perfetto 🌳✅ Questo baobab non è male, è solo un po’ storto… ma in fin dei conti, non è il suo bello? Grazie a…" },
  { foto: f("ig-cwh7wxmol3l", "Felpa WTH a Arena di Pola, Croazia"), luogo: "Arena di Pola, Croazia", url: post("Cwh7wxmoL3l"), data: "29 agosto 2023", likes: 117, didascalia: "E anche se te la scordi… ci pensiamo noi 😉" },
  { foto: f("ig-ci9gtvii8id", "Felpa WTH a Bogotá, Colombia"), luogo: "Bogotá, Colombia", url: post("Ci9gtVII8ID"), data: "26 settembre 2022", likes: 133, didascalia: "Sai benissimo che non ti pesa metterla in valigia" },
  { foto: f("ig-cdwvrl7ovhi", "Felpa WTH a Deserto della Tatacoa, Colombia"), luogo: "Deserto della Tatacoa, Colombia", url: post("CdWVRL7oVhI"), data: "9 maggio 2022", likes: 76, didascalia: "WTH nei deserti dell’America del Sud grazie alla mitica @al.luci_hpl 🇨🇴 🌴🏝" },
  { foto: f("ig-b9t9w9ioxmc", "Felpa WTH a Tour Eiffel, Parigi"), luogo: "Tour Eiffel, Parigi", url: post("B9T9W9ioXMC"), data: "4 marzo 2020", likes: 130, didascalia: "Conquistando il luogo d’origine delle Faguette 🥖 🥖 🥖 🥖 🥖 🥖" },
  { foto: f("ig-b61nsl7obcw", "Felpa WTH a Castel di Casio, Bologna"), luogo: "Castel di Casio, Bologna", url: post("B61NSl7obcw"), data: "2 gennaio 2020", likes: 117, didascalia: "Tra laghi e colline, lenticchie e cipolline, figoni e veline, Buon anno a tutti!" },
  { foto: f("ig-b55lrgni4d6", "Felpa WTH a Granada, Spagna"), luogo: "Granada, Spagna", url: post("B55lRGnI4d6"), data: "10 dicembre 2019", likes: 135, didascalia: "Tra tapas 🥪, cervezas 🍻 e paesaggi naturali 🏞️" },
  { foto: f("ig-b03uqgrhob1", "Felpa WTH a Maldive"), luogo: "Maldive", url: post("B03UqGrHOB1"), data: "7 agosto 2019", likes: 156, didascalia: "Come l'acqua che scorre, siamo viandanti in cerca di un mare 🏝️" },
  { foto: f("ig-b0yaofghhwa", "Felpa WTH a Wasa, Tanzania"), luogo: "Wasa, Tanzania", url: post("B0yaoFGHHWA"), data: "5 agosto 2019", likes: 216, didascalia: "Siamo sempre dalla parte di chi sta dalla parte degli altri 🤜🤛" },
  { foto: f("ig-bzqgenjikuq", "Felpa WTH a Parco dell'Akagera, Ruanda"), luogo: "Parco dell'Akagera, Ruanda", url: post("BzQgenjIKuQ"), data: "28 giugno 2019", likes: 137, didascalia: "In questi giorni di caldo torrido non ci resta da pensare che, da qualche parte in Africa, c'è sempre chi sta messo peggio di noi ☀️🔥" },
  { foto: f("ig-bsn3xcybnng", "Felpa WTH a Madonna di Campiglio, Trentino"), luogo: "Madonna di Campiglio, Trentino", url: post("Bsn3xcYBNNg"), data: "14 gennaio 2019", likes: 111, didascalia: "WTH on ice ❄️🎿" },
  { foto: f("ig-br7mqa-bp7j", "Felpa WTH a Ascoli Piceno, Marche"), luogo: "Ascoli Piceno, Marche", url: post("Br7mqa_BP7J"), data: "28 dicembre 2018", likes: 75, didascalia: "Tra tanti passanti, altrettanti mandanti" },
  { foto: f("ig-bq5mtuch-ng", "Felpa WTH a Nizza, Francia"), luogo: "Nizza, Francia", url: post("Bq5mTUCh-ng"), data: "2 dicembre 2018", likes: 74, didascalia: "Questa è la prova che le persone possono raggiungere i propri obiettivi inseguendoli duramente, nonostante gli sforzi e i sacrifici che essi…" },
  { foto: f("ig-bnef4xmlc3s", "Felpa WTH a Amsterdam, Paesi Bassi"), luogo: "Amsterdam, Paesi Bassi", url: post("BnEF4xmlC3S"), data: "29 agosto 2018", likes: 89, didascalia: "Degustando prelibatezze nordiche🌿🍃☘️🍀🍁🍉🥥🏌🏿‍♂️ perché si sa, in Olanda, la fame vien mangiando!😉" },
  { foto: f("ig-bm50wxifzzi", "Felpa WTH a Lago di Braies, Alto Adige"), luogo: "Lago di Braies, Alto Adige", url: post("Bm50wxIFzZI"), data: "25 agosto 2018", likes: 79, didascalia: "Le acque tranquille di un lago riflettono le bellezze che lo circondano 🏔🏞🌲" },
  { foto: f("ig-bm3zh6-ldao", "Felpa WTH a Burundi, Africa"), luogo: "Burundi, Africa", url: post("Bm3Zh6-ldao"), data: "24 agosto 2018", likes: 111, didascalia: "Stringendo accordi internazionali con il Burundi 🦁👺👬" },
  { foto: f("ig-bmiwefwl8pm", "Felpa WTH a Santo Domingo, Repubblica Dominicana"), luogo: "Santo Domingo, Repubblica Dominicana", url: post("BmiWefWl8PM"), data: "16 agosto 2018", likes: 79, didascalia: "Nella notte di San Lorenzo, San Francisco a Santo Domingo" },
  { foto: f("ig-bl6fxdmfrgh", "Felpa WTH a Tower Bridge, Londra"), luogo: "Tower Bridge, Londra", url: post("Bl6FXDMFrGH"), data: "31 luglio 2018", likes: 70, didascalia: "Non è mai troppo tardi per assaporare i piaceri della vita, perlopiù con l’odore inconfondibile delle nostre felpe" },
  { foto: f("ig-bl3luahlcbg", "Felpa WTH a Kos, Grecia"), luogo: "Kos, Grecia", url: post("Bl3LUAHlcbG"), data: "30 luglio 2018", likes: 75, didascalia: "locALI a luci rosse che KOStano (ap)parecchio lungo la KOSta di Kos" },
  { foto: f("ig-blggfoflzhq", "Felpa WTH a Corfù, Grecia"), luogo: "Corfù, Grecia", url: post("BlggfOflzhq"), data: "21 luglio 2018", likes: 95, didascalia: "Tra i colori confusi, di un una serata ormai dimenticata, e solo grazie una foto immortalata, prendono vita i colori di una WTH stellata" },
  { foto: f("ig-bkxtxz7fxfh", "Felpa WTH a Nanyuki, Kenya"), luogo: "Nanyuki, Kenya", url: post("BkxTXZ7FXFh"), data: "3 luglio 2018", likes: 102, didascalia: "Grazie alla @catechius che ha viaggiato sino in Kenya per accertare che gli amici di @onetreeplanted facciano un buon lavoro con le nostre…" },
  { foto: f("00-passo-di-resia", "Felpa WTH a Passo di Resia, Alto Adige"), luogo: "Passo di Resia, Alto Adige", url: post("BhJQpNNgUk2"), data: "4 aprile 2018", likes: 107, didascalia: "Non vai da nessuna parte senza un buon gruppo, un po' di Sole e l'abbigliamento giusto🏡💚" },
  { foto: f("ig-bggc46cakrf", "Felpa WTH a Berlino, Germania"), luogo: "Berlino, Germania", url: post("Bggc46CAKRF"), data: "19 marzo 2018", likes: 89, didascalia: "Berlin calling Wooden tree house 🏛🏡" },
  { foto: f("04", "Felpa WTH a Predazzo, Trentino"), luogo: "Predazzo, Trentino", url: post("Bdz5oUGABYo"), data: "11 gennaio 2018", likes: 92, didascalia: "Alla fine é sempre un plotone di soldati a salvare la civiltà 🌲🏔🏞❄🏡" },
  { foto: f("ig-bcfcqtrgpbl", "Felpa WTH a Barcellona, Spagna"), luogo: "Barcellona, Spagna", url: post("BcfCQTrgpBl"), data: "9 dicembre 2017", likes: 68, didascalia: "Non importa da che parte stai, la Wth risiede sempre nel cuore di chi fa festa ❤🏡🎉" },
  { foto: f("ig-bbrqcuogku4", "Felpa WTH a Parigi, Francia"), luogo: "Parigi, Francia", url: post("BbRqCuOgkU4"), data: "9 novembre 2017", likes: 81, didascalia: "Tra un boccone di baguette e un sorso di Chardonnay abbiamo fatto capire ai francesi chi comanda, proprio come nel lontano 2006 ⚽🏆" },
  { foto: f("ig-ba-qemvagcc", "Felpa WTH a Kos, Grecia"), luogo: "Kos, Grecia", url: post("Ba_qEMvAGCC"), data: "2 novembre 2017", likes: 72, didascalia: "Come le più antiche divinità greche ci siamo iscritti all'Olimpo e alla fine siamo divenuti tali 🏛" },
  { foto: f("ig-baq6izmg9ah", "Felpa WTH a Lago della Ninfa, Monte Cimone"), luogo: "Lago della Ninfa, Monte Cimone", url: post("Baq6IZmg9Ah"), data: "25 ottobre 2017", likes: 77, didascalia: "Ad ogni Dio la sua ninfa..alcuni di noi l'hanno già trovata 🏔🏞🌸" },
  { foto: f("ig-bysv9vnadx0", "Felpa WTH a Lochinver, Scozia"), luogo: "Lochinver, Scozia", url: post("BYSv9VnADx0"), data: "27 agosto 2017", likes: 59, didascalia: "Più a nord di qui forse qualche altra pecora 🏞🐑" },
  { foto: f("03", "Felpa WTH a Cortina d'Ampezzo"), luogo: "Cortina d'Ampezzo", url: post("BYNp2ozgQQx"), data: "25 agosto 2017", likes: 70, didascalia: "Non importa quale sia la vetta da raggiungere, l'importante è arrivare in cima 🌲🍃🏔🏞" },
  { foto: f("ig-bxr-6rfgpb6", "Felpa WTH a Casalecchio di Reno, Bologna"), luogo: "Casalecchio di Reno, Bologna", url: post("BXr-6RFgpB6"), data: "12 agosto 2017", likes: 45, didascalia: "Finché ci sarà lui, tutte le ciambelle usciranno con il buco 🍩🍩🍩" },
  { foto: f("ig-bxnhmjggsno", "Felpa WTH a San Pietro, Roma"), luogo: "San Pietro, Roma", url: post("BXnhmjGgsNo"), data: "10 agosto 2017", likes: 61, didascalia: "Tutte le strade portano a Roma... ci siamo arrivati anche noi 🏛" },
  // Foto del gruppo non pubblicate come post singolo
  { foto: f("01-lago-di-resia", "Felpe WTH sul Lago di Resia ghiacciato, con il campanile di Curon"), luogo: "Lago di Resia, Alto Adige", url: PROFILO },
  { foto: f("02", "Quattro felpe WTH su una panchina sopra il Lago di Resia"), luogo: "Lago di Resia, Alto Adige", url: PROFILO },
  { foto: f("05", "Felpe WTH sulla Fiat Panda al Lago di Resia"), luogo: "Lago di Resia, Alto Adige", url: PROFILO },
  { foto: f("06-casetta", "Il gruppo con le felpe WTH davanti alla Casetta"), luogo: "Casa base: la Casetta", url: PROFILO },
];
