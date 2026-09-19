import { forwardRef, type ImgHTMLAttributes } from "react";
import { srcSetFoto, urlFoto, type Foto } from "@/content/galleria";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "alt"> & {
  foto: Foto;
  // Quanto è larga la foto sullo schermo, es. "100vw" o "(min-width: 1024px) 33vw, 100vw":
  // il browser sceglie da solo la misura giusta (800, 1600 o 2400 px)
  sizes: string;
};

const FotoImg = forwardRef<HTMLImageElement, Props>(({ foto, sizes, ...rest }, ref) => (
  <img ref={ref} src={urlFoto(foto)} srcSet={srcSetFoto(foto)} sizes={sizes} alt={foto.alt} decoding="async" {...rest} />
));

FotoImg.displayName = "FotoImg";
export default FotoImg;
