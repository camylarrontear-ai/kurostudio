import React, { useState } from 'react';
import { LOGO_URL } from '../data/products';
import { ActiveScreen } from '../types';

interface FooterProps {
  onNavigate: (screen: ActiveScreen, productId?: string) => void;
  onOpenSizeModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSizeModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#ffffff] border-t border-black/5 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 py-12 lg:py-16">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#edeeef]">
          
          {/* Column 1: Brand & Priority Newsletter */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img 
                src={LOGO_URL} 
                alt="KURA STUDIO Logo" 
                className="h-7 w-auto object-contain" 
              />
              <span className="font-headline-md text-xl tracking-tighter uppercase text-primary font-bold">
                KURA STUDIO
              </span>
            </div>
            
            <p className="font-body-md text-sm text-[#46464b] max-w-md leading-relaxed">
              Disciplina textil contemporánea. Tejidos 450GSM fabricados éticamente en la Península Ibérica con cortes arquitectónicos diseñados para perdurar.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 max-w-md pt-2">
              <label htmlFor="newsletter-email" className="font-label-caps text-xs tracking-widest text-[#191c1d] uppercase font-bold">
                Acceso prioritario a tiradas limitadas
              </label>
              
              {subscribed ? (
                <div className="p-3 bg-[#bceecf] text-[#002112] rounded-lg font-label-ui text-xs font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>¡Te has suscrito con éxito! Recibirás los accesos tempranos al Drop 05.</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input 
                    id="newsletter-email"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Introduce tu email corporativo o personal" 
                    className="flex-1 bg-[#f3f4f5] border border-black/10 rounded-lg px-4 py-2.5 font-body-sm text-xs text-[#191c1d] placeholder:text-[#76777b] focus:outline-none focus:border-black"
                  />
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 bg-[#121316] text-white font-label-ui text-xs uppercase tracking-wider rounded-lg hover:bg-[#2e3132] transition-all font-semibold shrink-0"
                  >
                    Suscribir
                  </button>
                </div>
              )}
              
              <span className="font-body-sm text-[11px] text-[#46464b]">
                Cero spam. Desuscripción con un solo clic garantizada según GDPR.
              </span>
            </form>
          </div>

          {/* Column 2: Colección */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-label-caps text-xs tracking-widest uppercase text-black font-bold">
              Colección
            </span>
            <nav className="flex flex-col gap-2.5">
              <button 
                onClick={() => onNavigate('home')} 
                className="text-left font-body-sm text-xs text-[#46464b] hover:text-black transition-colors"
              >
                Ver Todo el Drop
              </button>
              <button 
                onClick={() => onNavigate('pdp', '01-heavyweight-boxy-hoodie')} 
                className="text-left font-body-sm text-xs text-[#46464b] hover:text-black transition-colors"
              >
                Sudaderas Heavyweight
              </button>
              <button 
                onClick={() => onNavigate('home')} 
                className="text-left font-body-sm text-xs text-[#46464b] hover:text-black transition-colors"
              >
                Pantalones Estructurados
              </button>
              <button 
                onClick={() => onNavigate('home')} 
                className="text-left font-body-sm text-xs text-[#46464b] hover:text-black transition-colors"
              >
                Custom Studio Lab
              </button>
              <button 
                onClick={() => onNavigate('lookbook')} 
                className="text-left font-body-sm text-xs text-[#46464b] hover:text-black transition-colors"
              >
                Archivo Sold Out
              </button>
            </nav>
          </div>

          {/* Column 3: Usabilidad & Soporte */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-label-caps text-xs tracking-widest uppercase text-black font-bold">
              Usabilidad & Soporte
            </span>
            <nav className="flex flex-col gap-2.5">
              <button 
                onClick={onOpenSizeModal}
                className="text-left font-body-sm text-xs text-[#46464b] hover:text-black transition-colors flex items-center justify-between"
              >
                <span>Guía de Tallas Transparente</span>
                <span className="font-label-caps text-[9px] text-[#002112] bg-[#bceecf] px-1.5 py-0.5 rounded font-bold">
                  EXACT FIT
                </span>
              </button>
              <button 
                onClick={() => onNavigate('cart')}
                className="text-left font-body-sm text-xs text-[#46464b] hover:text-black transition-colors"
              >
                Políticas de Devolución 30D
              </button>
              <button 
                onClick={() => onNavigate('sostenibilidad')}
                className="text-left font-body-sm text-xs text-[#46464b] hover:text-black transition-colors"
              >
                Rastreo Neutral en Carbono
              </button>
              <button 
                onClick={() => onNavigate('pdp', '01-heavyweight-boxy-hoodie')}
                className="text-left font-body-sm text-xs text-[#46464b] hover:text-black transition-colors"
              >
                Cuidado de Tejido 450GSM
              </button>
              <a 
                href="https://wa.me/" 
                target="_blank" 
                rel="noreferrer"
                className="font-body-sm text-xs text-[#46464b] hover:text-black transition-colors"
              >
                Soporte en Vivo (9:00 - 19:00 CET)
              </a>
            </nav>
          </div>

          {/* Column 4: Región & Idioma */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-label-caps text-xs tracking-widest uppercase text-black font-bold">
              Región & Idioma
            </span>
            <div className="flex flex-col gap-2">
              <div className="p-2.5 rounded-lg bg-[#f3f4f5] border border-black/5 flex items-center justify-between cursor-pointer hover:bg-[#edeeef] transition-all">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#46464b]">public</span>
                  <span className="font-label-ui text-xs text-[#191c1d]">España (EUR €)</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#46464b]">tune</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#f3f4f5] border border-black/5 flex items-center justify-between cursor-pointer hover:bg-[#edeeef] transition-all">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#46464b]">translate</span>
                  <span className="font-label-ui text-xs text-[#191c1d]">Castellano</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#46464b]">unfold_more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Legal & Payment Methods */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-[#46464b] font-label-caps text-[11px]">
            <span>© 2025 KURA STUDIO S.L. TODOS LOS DERECHOS RESERVADOS.</span>
            <button className="hover:text-black transition-colors">Condiciones</button>
            <button className="hover:text-black transition-colors">Privacidad</button>
            <button className="hover:text-black transition-colors">Aviso Legal</button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-label-caps text-[10px] tracking-widest text-[#46464b] uppercase hidden sm:inline">
              Pagos Seguros:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-1 bg-[#edeeef] text-[#191c1d] font-label-caps text-[10px] font-bold rounded border border-black/5">
                APPLE PAY
              </span>
              <span className="px-2 py-1 bg-[#edeeef] text-[#191c1d] font-label-caps text-[10px] font-bold rounded border border-black/5">
                VISA
              </span>
              <span className="px-2 py-1 bg-[#edeeef] text-[#191c1d] font-label-caps text-[10px] font-bold rounded border border-black/5">
                MASTERCARD
              </span>
              <span className="px-2 py-1 bg-[#edeeef] text-[#191c1d] font-label-caps text-[10px] font-bold rounded border border-black/5">
                KLARNA
              </span>
              <span className="px-2 py-1 bg-[#edeeef] text-[#191c1d] font-label-caps text-[10px] font-bold rounded border border-black/5">
                STRIPE
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
