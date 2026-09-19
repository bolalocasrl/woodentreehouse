// WTH around the world: i ragazzi in giro per il mondo con un capo della Casetta.
// Ogni post: foto (preparata con "npm run foto"), luogo e link al post Instagram.
// Finché la lista è vuota la sezione non compare nello shop.
import type { Foto } from "./galleria";

export type PostMondo = {
  foto: Foto;
  luogo: string;
  url: string;
  didascalia?: string;
  data?: string;
};

// Esempio di voce (con import { foto } from "./galleria"):
// { foto: foto("/galleria/around-the-world/tokyo-giappone", "Maglia WTH a Tokyo"), luogo: "Tokyo, Giappone", url: "https://www.instagram.com/p/XXXX/" },
export const POST_MONDO: PostMondo[] = [];
