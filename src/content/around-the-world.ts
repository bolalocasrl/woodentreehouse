// WTH around the world: i ragazzi in giro con un capo della Casetta.
// Ogni post: foto (preparata con "npm run foto"), luogo (se noto) e link.
// Finché non ci sono i link ai singoli post, le schede portano al profilo Instagram.
import { foto, type Foto } from "./galleria";

export type PostMondo = {
  foto: Foto;
  luogo?: string;
  url: string;
  didascalia?: string;
  data?: string;
};

const PROFILO = "https://www.instagram.com/wooden_tree_house/";
const f = (nome: string, alt: string) => foto(`/galleria/around-the-world/${nome}`, alt);

export const POST_MONDO: PostMondo[] = [
  {
    foto: f("01-lago-di-resia", "Felpe WTH sul Lago di Resia ghiacciato, con il campanile di Curon"),
    luogo: "Lago di Resia, Alto Adige",
    url: PROFILO,
  },
  { foto: f("02", "Quattro felpe WTH su una panchina sopra il Lago di Resia"), luogo: "Lago di Resia, Alto Adige", url: PROFILO },
  { foto: f("03", "Maglie e felpe WTH in cima a una via ferrata"), luogo: "Ferrata a Cortina d'Ampezzo", url: PROFILO, data: "Agosto 2017" },
  { foto: f("04", "Un gruppo con le felpe WTH nel bosco innevato"), luogo: "Predazzo, Trentino", url: PROFILO },
  { foto: f("05", "Felpe WTH sulla Fiat Panda al Lago di Resia"), luogo: "Lago di Resia, Alto Adige", url: PROFILO },
  { foto: f("06-casetta", "Il gruppo con le felpe WTH davanti alla Casetta"), luogo: "Casa base: la Casetta", url: PROFILO },
];
