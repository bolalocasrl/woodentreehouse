import { useParams } from "wouter";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import StoriaTemplate from "@/components/galleria/StoriaTemplate";
import ProgettiTemplate, { ProgettoDettaglio } from "@/components/galleria/ProgettiTemplate";
import { AvvisoBozza, useBozza } from "@/components/galleria/parts";
import { trovaArea } from "@/content/galleria";
import NotFound from "@/pages/not-found";

// /galleria/:area e /galleria/:area/:progetto
export default function GalleriaArea() {
  useBozza();
  const params = useParams<{ area: string; progetto?: string }>();
  const area = trovaArea(params.area);
  if (!area) return <NotFound />;

  let contenuto: React.ReactNode;
  if (area.modello === "storia") {
    if (params.progetto) return <NotFound />;
    contenuto = <StoriaTemplate area={area} />;
  } else if (params.progetto) {
    const progetto = area.progetti.find((p) => p.slug === params.progetto);
    if (!progetto) return <NotFound />;
    contenuto = <ProgettoDettaglio area={area} progetto={progetto} />;
  } else {
    contenuto = <ProgettiTemplate area={area} />;
  }

  return (
    <div className="min-h-screen bg-brand-offwhite text-brand-smoke font-sans selection:bg-brand-forest selection:text-brand-offwhite">
      <SiteHeader />
      {contenuto}
      <div className="border-x border-brand-smoke/20 max-w-[2000px] mx-auto">
        <SiteFooter />
      </div>
      <AvvisoBozza />
    </div>
  );
}
