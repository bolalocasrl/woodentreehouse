import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, Heart, MapPin, MessageCircle, Send } from "lucide-react";
import FotoImg from "@/components/galleria/FotoImg";
import type { PostMondo } from "@/content/around-the-world";
import imgAvatar from "@/assets/images/instagram-avatar.webp";

const INSTAGRAM = "https://www.instagram.com/wooden_tree_house/";
// Il mappamondo (librerie 3D, ~0,5 MB) si scarica solo quando la sezione si avvicina
const WorldGlobe = lazy(() => import("./WorldGlobe"));
const MOSTRATI = 8;

// Sezione dello shop: i capi WTH in giro per il mondo, come post di Instagram
export default function AroundTheWorld({ posts }: { posts: PostMondo[] }) {
  const [tutti, setTutti] = useState(false);
  const [mostraGlobo, setMostraGlobo] = useState(false);
  const sezioneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sezioneRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setMostraGlobo(true), io.disconnect()), { rootMargin: "400px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (posts.length === 0) return null;
  const visibili = tutti ? posts : posts.slice(0, MOSTRATI);

  return (
    <section ref={sezioneRef} className="border-t border-brand-smoke/20 bg-brand-forest text-brand-offwhite">
      <div className="px-6 md:px-16 pt-16 md:pt-24 pb-10 md:pb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-brand-yellow mb-4 block">WTH around the world</span>
          <h2 className="font-serif text-4xl md:text-6xl leading-none text-brand-offwhite mb-6">
            La Casetta<br />in giro per il mondo
          </h2>
          <p className="text-brand-offwhite/80 text-lg leading-relaxed max-w-xl">
            Da anni chi parte si porta dietro una maglia, una felpa o una cuffia della Casetta,
            e ci manda una foto. Questi sono alcuni dei posti in cui è arrivata.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <p className="font-serif text-5xl md:text-7xl leading-none text-brand-offwhite">{posts.length}</p>
          <p className="text-xs uppercase tracking-widest text-brand-offwhite/60 leading-relaxed">
            foto<br />dal mondo
          </p>
        </div>
      </div>

      <div className="border-y border-brand-offwhite/15 mb-10 md:mb-14 bg-[radial-gradient(ellipse_at_center,rgba(245,199,61,0.08),transparent_65%)]">
        {mostraGlobo ? (
          <Suspense fallback={<div className="h-[420px] sm:h-[520px] lg:h-[620px]" />}>
            <WorldGlobe posts={posts} />
          </Suspense>
        ) : (
          <div className="h-[420px] sm:h-[520px] lg:h-[620px]" />
        )}
      </div>

      {/* telefono: carosello da scorrere; da tablet in su: griglia */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:overflow-visible md:px-16">
        {visibili.map((post, i) => (
          <motion.div
            key={post.url + i}
            className="flex-none w-[78vw] snap-center sm:w-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: "easeOut" }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>

      <div className="px-6 md:px-16 pb-16 md:pb-24 flex flex-col sm:flex-row gap-4 justify-center items-center">
        {!tutti && posts.length > MOSTRATI && (
          <button
            type="button"
            onClick={() => setTutti(true)}
            className="px-6 py-3 border border-brand-offwhite text-xs font-bold uppercase tracking-widest hover:bg-brand-offwhite hover:text-brand-forest transition-colors"
          >
            Mostra tutte le {posts.length} foto
          </button>
        )}
        <a
          href={INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-brand-offwhite text-brand-forest text-xs font-bold uppercase tracking-widest hover:bg-brand-yellow transition-colors"
        >
          Mandaci la tua foto su Instagram →
        </a>
      </div>
    </section>
  );
}

// Scheda in stile post Instagram (usata nella griglia e nel mappamondo)
export function PostCard({ post }: { post: PostMondo }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full bg-white text-brand-smoke border border-brand-smoke/10 shadow-sm hover:shadow-xl transition-shadow duration-500"
    >
      {/* intestazione del post */}
      <div className="flex items-center gap-3 px-3 py-2.5">
        <span className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 flex-none">
          <span className="block w-full h-full rounded-full bg-white p-[2px]">
            <img src={imgAvatar} alt="" className="w-full h-full rounded-full object-cover" />
          </span>
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block text-[13px] font-semibold">wooden_tree_house</span>
          <span className="block text-[11px] text-brand-smoke/60 truncate">{post.luogo ?? "In giro per il mondo"}</span>
        </span>
        <span className="text-brand-smoke/60 tracking-widest text-sm">···</span>
      </div>

      {/* foto */}
      <div className="relative aspect-square overflow-hidden bg-brand-smoke/5">
        <FotoImg
          foto={post.foto}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {post.luogo && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 bg-brand-smoke/70 text-brand-offwhite text-[10px] font-bold uppercase tracking-widest px-2 py-1 backdrop-blur-sm">
            <MapPin className="w-3 h-3" /> {post.luogo}
          </span>
        )}
      </div>

      {/* azioni e didascalia */}
      <div className="px-3 pt-3 pb-4">
        <div className="flex items-center gap-4 mb-2">
          <Heart className={`w-5 h-5 transition-colors ${post.likes ? "fill-red-500 text-red-500" : "group-hover:fill-red-500 group-hover:text-red-500"}`} />
          <MessageCircle className="w-5 h-5" />
          <Send className="w-5 h-5" />
          <Bookmark className="w-5 h-5 ml-auto" />
        </div>
        {post.likes && <p className="text-[13px] font-semibold mb-1">Piace a {post.likes} persone</p>}
        {post.didascalia && (
          <p className="text-[13px] leading-snug line-clamp-2">
            <span className="font-semibold mr-1">wooden_tree_house</span>
            {post.didascalia}
          </p>
        )}
        <p className="text-[10px] uppercase tracking-wider text-brand-smoke/50 mt-2">
          {post.data ? `${post.data} · ` : ""}Vedi su Instagram
        </p>
      </div>
    </a>
  );
}
