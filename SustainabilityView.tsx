import React from 'react';

export const SustainabilityView: React.FC = () => {
  return (
    <div className="w-full bg-[#f8f9fa] py-12">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <span className="font-label-caps text-xs uppercase tracking-widest text-[#224f39] font-bold">
            Manifiesto Textil KURA // 100% Trazable
          </span>
          <h1 className="font-headline-lg text-3xl sm:text-5xl text-primary font-bold uppercase tracking-tight">
            Producción Ética en Braga y Oporto
          </h1>
          <p className="font-body-md text-sm sm:text-base text-[#46464b] leading-relaxed">
            Rechazamos la obsolescencia programada del fast fashion. Cada hilo de 450GSM se confecciona bajo estándares de salarios justos, energía renovable y procesos de circuito cerrado de agua.
          </p>
        </div>

        {/* 4 Pillars of Sustainability */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white shadow-xs border border-black/5 flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#bceecf] text-[#002112] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">solar_power</span>
            </div>
            <h3 className="font-title-sm text-base text-primary font-bold">85% Energía Solar</h3>
            <p className="font-body-sm text-xs text-[#46464b] leading-relaxed">
              Las plantas de tejeduría en Braga generan más del 85% de su suministro energético anual mediante placas fotovoltaicas in situ.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white shadow-xs border border-black/5 flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#bceecf] text-[#002112] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">water_drop</span>
            </div>
            <h3 className="font-title-sm text-base text-primary font-bold">Circuito Cerrado de Agua</h3>
            <p className="font-body-sm text-xs text-[#46464b] leading-relaxed">
              El proceso de tintado mineral recicla el 92% de los efluentes hídricos mediante filtrado biológico sin vertidos contaminantes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white shadow-xs border border-black/5 flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#bceecf] text-[#002112] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <h3 className="font-title-sm text-base text-primary font-bold">Certificado OEKO-TEX®</h3>
            <p className="font-body-sm text-xs text-[#46464b] leading-relaxed">
              Standard 100 de clase I. Ausencia total de metales pesados, pesticidas sintéticos o formaldehídos en contacto con la piel.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white shadow-xs border border-black/5 flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#bceecf] text-[#002112] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">compost</span>
            </div>
            <h3 className="font-title-sm text-base text-primary font-bold">Packaging 100% Compostable</h3>
            <p className="font-body-sm text-xs text-[#46464b] leading-relaxed">
              Bolsas de fécula de maíz y cajas de cartón kraft reciclado sin tintas plásticas. Descomposición en compost doméstico en 90 días.
            </p>
          </div>
        </div>

        {/* Studio Photo & Manifesto */}
        <div className="p-8 lg:p-12 rounded-3xl bg-white shadow-md border border-black/5 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-4">
            <span className="font-label-caps text-xs text-[#ab3516] uppercase font-bold tracking-wider">
              2 Años de Garantía de Costura
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-primary font-bold">
              Diseñado para Resistir 500 Lavados
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-[#46464b] leading-relaxed">
              El algodón peinado de fibra larga pre-encogido a 60°C garantiza que las medidas anatómicas de tu hoodie se mantengan milimétricamente inalteradas con los años. Si una costura se deshilacha, nuestro taller de Oporto la repara o reemplaza sin coste.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="font-label-caps text-xs px-3 py-1 bg-[#f3f4f5] rounded-full text-black font-bold">
                PORTO // BRAGA
              </span>
              <span className="font-label-caps text-xs px-3 py-1 bg-[#f3f4f5] rounded-full text-black font-bold">
                0% PLÁSTICO
              </span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#edeeef] shadow-inner">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoQBCvfwlTIDOLatTRvbydpRlfvNlW1mqAurrvrBCjzvCBhMFMI499eR9leAoo9bc0XypcPStGdjEFwYj5qB_OOAWOXa85R2L9fBWdjqDi0XP1q6dEQnVxIwl38qlUJiz1lP20uU7lpQ9lVJbkUEh-1OgmtRaAyKDRNdW8dDvTSIZ3UGgTBP_svsAuSMVih6mODKIxGQhDpLzNvfrp8ZmqjZ9c9yx41Jvg7mnAnFXe1FiT0IbbbI4P" 
              alt="Taller KURA" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
