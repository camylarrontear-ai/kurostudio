import React from 'react';
import { Product, ActiveScreen } from '../types';

interface LookbookViewProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onNavigate: (screen: ActiveScreen) => void;
}

export const LookbookView: React.FC<LookbookViewProps> = ({
  products,
  onSelectProduct,
  onNavigate,
}) => {
  const lookbookShots = [
    {
      title: "LOOK 01 // Washed Slate Boxy Drop",
      subtitle: "Fotografiado en Estudio Brutalista (Barcelona)",
      description: "Patrón caja relajado en algodón 450GSM peinado con tintado en prenda y lavado mineral. Caída rotunda sin arrugas forzadas.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1lV6N2q58oo4r2djIzkk-INu1x18GPvQpotMoOQ-hYE2uhAxqqzzY4yGreGkdRfr-QIrWgs3aueifgFkBrFBk7tkt53WYzYIGkg4837qU7v474XS0qAwg5Gv4uGPpVT4QqiLmeJ7bcNCzbDmOELL7UwmvYABr3rCX-pHYycXh0pxETXZ7fRoncXCtHvbI0SblmFKSutqpvnek_3o8VKymbvi3kmkldxPrE3mbKRLMCb5G13x9EBBe",
      productId: "01-heavyweight-boxy-hoodie",
      specs: ["450 GSM", "Drop Shoulder", "Mineral Wash"]
    },
    {
      title: "LOOK 02 // Raw Sand Stone Composition",
      subtitle: "Algodón Orgánico sin Blanqueantes Químicos",
      description: "Tacto crudo y auténtico con diminutas motas de semilla virgen visibles en la urdimbre francesa. Pureza formal.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcNBHk6aq-JHh-2tT-XwAyLKp_V4JTqSRC1MFavOUl1uoeIDPHhUH5TI9tbEtexFqapJWiVbhZXBQEddyv3CxvA0tE7o73Np_oDlR5hi0MLB7621ht0ibDNp6rFg3Wjdb5kGx4Z-JbHG2hWZIWdgnRV4o9z2eoqjG7UWbhQyGlZTsFxZDTfOevR4cVL3R2WL0rDqIZN3FS0JhAARdSTGAzmoNJv-bqbMiwsWYwymPsgWQL5yHTtfsO",
      productId: "02-raw-sand-minimalist-fleece",
      specs: ["450 GSM", "Unbleached", "OEKO-TEX®"]
    },
    {
      title: "LOOK 03 // 500 GSM Heavy Armor Zip-Up",
      subtitle: "Cremallera Dual YKK en Níquel Cepillado",
      description: "Construcción pesada tipo armadura térmica para entretiempo y noches nórdicas. Doble forro de capucha erguido.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrW6gudY_dpfdvWNZWZyK8ZuJzQEuI_RGQKjN4VxzQ9TzCwUfK_g7uFT8TnvfhIAjzcILpPJXufeLqhguUIWCIi-6gZeI9JUV23SUtUDFlIz8grGID8JKLiUsFZXfyOHqlwudDUFlNi8XxMsBQb5FHvW1EnablFS7ps57_-y8525Mqt6ub36c5IuRD-qArY5uZJsGISImIjmWoaCLvRt455vt4UHpTVdIALDV33G6bAyLc-D_3Uz98",
      productId: "03-studio-zip-up-500gsm",
      specs: ["500 GSM", "Dual YKK", "Charcoal Cast"]
    },
    {
      title: "LOOK 04 // Atelier Custom Monogram",
      subtitle: "Taller Artesanal de Oporto",
      description: "Bordado táctil en relieve milimétrico. Hilos mercerizados tono sobre tono para una discreción absoluta.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpyFesvt24MwAji3puF3uGBr5zQRqlk1_mZneRNnyb4AAdjDtVVPwqwUoFL2cPPLncb9yboJ-pH2EZIWrDmcx-2YWSV2u36xYbK3dpv_Yzjm1dYebGZoU6Or9umJ5bfBFxiQxzweYvXz4rhV-TTNMtDLTnsJY6BTlzr6TRklDQHF63Pwagb9el9tqRTPQ-gJmse8ehlClTVs3NUuJJZAoI7zfi8TOt1_Mq7xIWdooc3ma64NNuI_XB",
      productId: "04-atelier-custom-hoodie",
      specs: ["Custom Monogram", "Atelier Lab", "Bajo Demanda"]
    }
  ];

  return (
    <div className="w-full bg-[#f8f9fa] py-12">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="font-label-caps text-xs uppercase tracking-widest text-[#ab3516] font-bold">
            Lookbook // Serie 04
          </span>
          <h1 className="font-headline-lg text-3xl sm:text-5xl text-primary font-bold uppercase tracking-tight">
            Arquitectura del Algodón Pesado
          </h1>
          <p className="font-body-md text-sm sm:text-base text-[#46464b] leading-relaxed">
            Una exploración visual sobre el volumen, la luz natural neutra y el comportamiento de las fibras de 450 y 500 GSM sobre el cuerpo.
          </p>
        </div>

        {/* Lookbook Gallery Stream */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {lookbookShots.map((look, idx) => (
            <div 
              key={idx}
              className="group flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-xs hover:shadow-xl transition-all duration-300 border border-black/5"
            >
              <div 
                onClick={() => onSelectProduct(look.productId)}
                className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#edeeef] cursor-pointer"
              >
                <img 
                  src={look.image} 
                  alt={look.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-1.5">
                  {look.specs.map(spec => (
                    <span 
                      key={spec}
                      className="px-2.5 py-1 rounded bg-white/90 backdrop-blur-sm text-primary font-label-caps text-[9px] uppercase font-bold shadow-xs"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-label-caps text-xs text-[#ab3516] uppercase font-bold">
                  {look.subtitle}
                </span>
                <h3 className="font-headline-md text-xl text-primary font-bold">
                  {look.title}
                </h3>
                <p className="font-body-sm text-xs text-[#46464b] leading-relaxed">
                  {look.description}
                </p>

                <div className="pt-3 border-t border-[#edeeef] flex items-center justify-between">
                  <button 
                    type="button"
                    onClick={() => onSelectProduct(look.productId)}
                    className="font-label-ui text-xs uppercase tracking-wider font-bold text-primary hover:text-[#ab3516] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Ver Ficha Técnica</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                  <span className="font-label-caps text-[10px] text-[#76777b]">
                    TALLAJE BOXYSYMMETRIC
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
