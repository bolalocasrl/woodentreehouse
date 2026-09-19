// Prepara le foto per la galleria.
// Uso: npm run foto -- <cartella-originali> <nome-area>
//   es. npm run foto -- ~/Desktop/PROGETTI/woodentreehouse-foto/casetta casetta
//
// Per ogni foto crea 3 misure in webp (800, 1600, 2400 px di larghezza, mai più grandi
// dell'originale) in public/galleria/<area>/..., rispettando le sottocartelle,
// e aggiorna src/content/foto.json con dimensioni e misure disponibili.

import sharp from "sharp";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const LARGHEZZE = [800, 1600, 2400];
const QUALITA = 84;
const ESTENSIONI = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif", ".tif", ".tiff"]);

const [, , sorgente, area] = process.argv;
if (!sorgente || !area) {
  console.error("Uso: npm run foto -- <cartella-originali> <nome-area>");
  process.exit(1);
}

const radice = path.resolve(sorgente.replace(/^~/, os.homedir()));
const destinazione = path.resolve("public/galleria", area);
const manifestPath = path.resolve("src/content/foto.json");
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};

const slug = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function* fotoIn(dir) {
  for (const voce of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, "it", { numeric: true }))) {
    const completo = path.join(dir, voce.name);
    if (voce.isDirectory()) yield* fotoIn(completo);
    else if (ESTENSIONI.has(path.extname(voce.name).toLowerCase())) yield completo;
  }
}

// Le foto HEIC dell'iPhone passano prima da sips (incluso in macOS)
function leggibile(file) {
  if (!/\.hei[cf]$/i.test(file)) return file;
  const tmp = path.join(os.tmpdir(), `${path.basename(file)}.jpg`);
  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "100", file, "--out", tmp], { stdio: "ignore" });
  return tmp;
}

let fatte = 0;
for (const file of fotoIn(radice)) {
  const relativo = path.relative(radice, file);
  const cartelle = path.dirname(relativo).split(path.sep).filter((c) => c !== ".").map(slug);
  const nome = slug(path.parse(relativo).name);
  const dirUscita = path.join(destinazione, ...cartelle);
  fs.mkdirSync(dirUscita, { recursive: true });

  // .rotate() applica l'orientamento della fotocamera (foto verticali dritte)
  const immagine = sharp(leggibile(file)).rotate();
  const { width, height } = await immagine.clone().toBuffer({ resolveWithObject: true }).then((r) => r.info);

  const larghezze = LARGHEZZE.filter((l) => l < width);
  larghezze.push(Math.min(width, LARGHEZZE[LARGHEZZE.length - 1]));
  const uniche = [...new Set(larghezze)];

  for (const l of uniche) {
    await immagine
      .clone()
      .resize({ width: l, withoutEnlargement: true })
      .webp({ quality: QUALITA, smartSubsample: true })
      .toFile(path.join(dirUscita, `${nome}-${l}.webp`));
  }

  const base = "/" + path.posix.join("galleria", area, ...cartelle, nome);
  manifest[base] = { w: width, h: height, larghezze: uniche };
  fatte++;
  console.log(`✓ ${relativo}  →  ${base}  (${uniche.join(", ")} px)`);
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${fatte} foto pronte in public/galleria/${area}`);
