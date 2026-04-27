import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Instagram, Mail, MapPin, Youtube, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/images/logo-bianco.png";
import bgFooter from "@/assets/images/iragazzi.jpg";

const formSchema = z.object({
  email: z.string().email({ message: "Inserisci un'email valida." }),
  idea: z.string().min(10, { message: "La tua idea deve avere almeno 10 caratteri." }),
});

export function Footer() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      idea: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Grazie per la tua idea!",
      description: "Abbiamo ricevuto il tuo messaggio e ti contatteremo presto.",
    });
    console.log(values);
    
    // Construct mailto link for submission
    const subject = encodeURIComponent(`Nuova Idea da ${values.email}`);
    const body = encodeURIComponent(values.idea);
    window.location.href = `mailto:woodentreehouse97@gmail.com?subject=${subject}&body=${body}`;
    
    form.reset();
  }

  return (
    <footer id="contattaci" className="bg-brand-green/90 text-brand-cream pt-12 pb-8 relative overflow-hidden backdrop-blur-sm">
       {/* Background Image */}
       <div className="absolute inset-0 -z-10">
         <img src={bgFooter} alt="Background" className="w-full h-full object-cover blur-[2px] opacity-60" />
         <div className="absolute inset-0 bg-brand-green/75" />
       </div>

       {/* Thread Line */}
       <div className="absolute left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-brand-orange/40 to-transparent h-full top-0 pointer-events-none hidden md:block" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-8">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 flex items-center justify-center overflow-hidden p-2">
                <img src={logo} alt="Wooden Tree House Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-brand-cream">Wooden Tree House</h3>
                <p className="text-brand-orange uppercase tracking-widest text-xs">Casetta</p>
              </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-12">
          
          {/* Left Column: Connections */}
          <div>
            <h3 className="text-3xl font-serif font-bold mb-8 text-brand-orange">Resta Connesso</h3>
            <p className="mb-8 text-brand-cream/80 max-w-md">
              Segui le nostre avventure sui social, scrivici su WhatsApp o vieni a trovarci nel bosco.
            </p>
            
            <div className="flex gap-4 mb-10">
              <a href="https://www.instagram.com/wooden_tree_house/?hl=en" target="_blank" rel="noopener noreferrer" className="p-3 bg-brand-cream/10 hover:bg-brand-orange hover:text-brand-green rounded-full transition-all duration-300 hover:scale-110">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/CasettasullAlberoWTH" target="_blank" rel="noopener noreferrer" className="p-3 bg-brand-cream/10 hover:bg-brand-orange hover:text-brand-green rounded-full transition-all duration-300 hover:scale-110">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/watch?v=VN7QNgZYU_U&list=PLK8JgId3M1KC98osHAdbE9v0krPpA_HPJ" target="_blank" rel="noopener noreferrer" className="p-3 bg-brand-cream/10 hover:bg-brand-orange hover:text-brand-green rounded-full transition-all duration-300 hover:scale-110">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="https://wa.me/34632854055" target="_blank" rel="noopener noreferrer" className="p-3 bg-brand-cream/10 hover:bg-brand-orange hover:text-brand-green rounded-full transition-all duration-300 hover:scale-110">
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>

            <a 
              href="https://maps.app.goo.gl/bGjSPpVVtJ7FZBgm8" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-4 p-4 border border-brand-cream/20 hover:border-brand-orange hover:bg-brand-cream/5 transition-colors group max-w-sm"
            >
              <div className="p-3 bg-brand-orange rounded-full text-brand-green">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold group-hover:text-brand-orange transition-colors">Vienici a trovare</p>
                <p className="text-sm text-brand-cream/60">Apri la mappa per la Casetta</p>
              </div>
            </a>
          </div>

          {/* Right Column: Leave your Idea Form */}
          <div className="bg-brand-cream/5 p-8 rounded-2xl border border-brand-cream/10 backdrop-blur-sm shadow-xl">
            <h3 className="text-3xl font-serif font-bold mb-4 text-brand-orange drop-shadow-md">Lascia la tua Idea</h3>
            <p className="text-brand-cream/90 mb-6 text-base font-medium">Hai un progetto in mente o un pensiero da condividere? Scrivici qui.</p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="La tua Email" 
                          {...field} 
                          className="bg-brand-cream/10 border-transparent focus:border-brand-orange text-brand-cream placeholder:text-brand-cream/40" 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="idea"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="La tua Idea..." 
                          {...field} 
                          className="bg-brand-cream/10 border-transparent focus:border-brand-orange text-brand-cream placeholder:text-brand-cream/40 min-h-[120px]" 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90 text-brand-green font-bold py-6">
                  Invia Messaggio
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-cream/10 text-center text-sm text-brand-cream/40 flex flex-col md:flex-row justify-center gap-4">
          <p>&copy; 2026 Wooden Tree House - Casetta. All rights reserved.</p>
          <span className="hidden md:block">•</span>
          <p>WOODEN TREE HOUSE APS - C.F.: 91457460375</p>
        </div>
      </div>
    </footer>
  );
}
