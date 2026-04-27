import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import imgTshirt from "@/assets/images/Military Green 1.jpg";
import imgHoodie from "@/assets/images/nero 1.jpg";
import imgBeanie from "@/assets/images/Cuffie WTH.pdf.jpg";
import imgCrewneck from "@/assets/images/bianco 1.jpg";

const products = [
  {
    id: "maglie-wth",
    name: "Maglie WTH",
    category: "Abbigliamento",
    price: "€25.00",
    description: "Plutone Organico 97%, 3% Amore&Fantasia",
    image: imgTshirt,
  },
  {
    id: "felpe-cappuccio-wth",
    name: "Felpe cappuccio WTH",
    category: "Abbigliamento",
    price: "€45.00",
    description: "Lana Merino intrecciata, la maestra la boccia !",
    image: imgHoodie,
  },
  {
    id: "felpe-girocollo-wth",
    name: "Felpe Girocollo WTH",
    category: "Abbigliamento",
    price: "€40.00",
    description: "Il classico senza tempo, robusta e scomoda.",
    image: imgCrewneck,
  },
  {
    id: "cuffie-invernali-wth",
    name: "Cuffie invernali WTH",
    category: "Accessori",
    price: "€18.00",
    description: "Rimozione disturbi sonori, protezione sassi, ecc..",
    image: imgBeanie,
  }
];

export function MerchGrid() {
  return (
    <section id="prodotti" className="py-20 bg-brand-green/5 relative">
       {/* Thread Line */}
       <div className="absolute left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-brand-orange/40 to-transparent h-full top-0 pointer-events-none hidden md:block" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-green mb-4">Prodotti</h2>
          <p className="text-brand-wood max-w-2xl mx-auto">Porta con te un pezzo del nostro mondo.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group border-none shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white overflow-hidden flex flex-col">
              <div className="aspect-square overflow-hidden relative bg-gray-100">
                <img  
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              
              <CardHeader className="pt-6">
                <p className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">{product.category}</p>
                <CardTitle className="font-serif text-xl text-brand-green">{product.name}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-brand-wood/80 text-sm">{product.description}</p>
              </CardContent>
              
              <CardFooter className="mt-auto pt-0">
                <Button 
                  asChild
                  className="w-full bg-brand-green hover:bg-brand-wood text-brand-cream font-medium rounded-none transition-colors"
                >
                  <a
                    href="https://forms.gle/V2QaoCEgmtAqrW9U9"
                    target="_blank"
                    rel="noreferrer"
                    data-testid={`link-order-form-${product.id}`}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Ordina Ora
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
