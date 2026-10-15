import React, { useState } from 'react';
import { ActiveScreen } from '../types';
import { LOGO_URL } from '../data/products';

interface HeaderProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen, productId?: string) => void;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenSearch,
  onOpenWishlist,
}) => {
  const [currency, setCurrency] = useState('EUR');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Announcement Bar */}
      <div className="w-full bg-[#121316] text-[#ffffff] font-label-caps text-[11px] tracking-widest py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#fd6f4b] animate-pulse"></span>
        <span>Envío express neutro en carbono en pedidos +80€ | 30 días de devolución sin preguntas</span>
        <span className="hidden md:inline text-white/40">•</span>
        <span className="hidden md:inline text-white/70 uppercase">Colección 450GSM disponible</span>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <div className="w-full h-20 bg-white/85 backdrop-blur-md border-b border-black/5 shadow-xs">
        <div className="max-w-[1440px] mx-auto h-full px-4 lg:px-12 flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2 group text-left focus:outline-none"
            >
              <img 
                src={LOGO_URL} 
                alt="KURA STUDIO Logo" 
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-95" 
              />
              <span className="font-headline-md text-xl tracking-tighter uppercase text-primary hidden sm:inline font-bold">
                KURA STUDIO
              </span>
            </button>
            <span className="hidden xl:inline-block font-label-caps text-[10px] px-2 py-0.5 bg-[#e7e8e9] rounded text-[#46464b] font-semibold">
              EST. 2024
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`font-label-ui text-sm uppercase tracking-wider transition-colors ${
                activeScreen === 'home' ? 'text-black font-bold border-b-2 border-black pb-0.5' : 'text-[#46464b] hover:text-black'
              }`}
            >
              Colección
            </button>
            <button 
              onClick={() => onNavigate('pdp', '01-heavyweight-boxy-hoodie')}
              className={`font-label-ui text-sm uppercase tracking-wider transition-colors ${
                activeScreen === 'pdp' ? 'text-black font-bold border-b-2 border-black pb-0.5' : 'text-[#46464b] hover:text-black'
              }`}
            >
              Básicos 450GSM
            </button>
            <button 
              onClick={() => onNavigate('home')}
              className="font-label-ui text-sm uppercase tracking-wider text-[#46464b] hover:text-black transition-colors flex items-center gap-1.5"
            >
              <span>Custom Studio</span>
              <span className="font-label-caps text-[9px] px-1.5 py-0.5 rounded bg-[#ffdad2] text-[#891d00] leading-none font-bold">
                LAB
              </span>
            </button>
            <button 
              onClick={() => onNavigate('lookbook')}
              className={`font-label-ui text-sm uppercase tracking-wider transition-colors ${
                activeScreen === 'lookbook' ? 'text-black font-bold border-b-2 border-black pb-0.5' : 'text-[#46464b] hover:text-black'
              }`}
            >
              Lookbook
            </button>
            <button 
              onClick={() => onNavigate('sostenibilidad')}
              className={`font-label-ui text-sm uppercase tracking-wider transition-colors ${
                activeScreen === 'sostenibilidad' ? 'text-black font-bold border-b-2 border-black pb-0.5' : 'text-[#46464b] hover:text-black'
              }`}
            >
              Sostenibilidad
            </button>
          </nav>

          {/* Utility Tools: Search, Currency, Wishlist, Cart, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Trigger */}
            <button 
              onClick={onOpenSearch}
              type="button" 
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f3f4f5] text-[#46464b] hover:text-black hover:bg-[#edeeef] transition-all text-left"
              aria-label="Buscar piezas"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span className="font-label-ui text-xs pr-2 hidden md:inline">Buscar piezas...</span>
              <kbd className="font-label-caps text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#c7c6cb]/40 text-[#46464b]">
                ⌘K
              </kbd>
            </button>

            {/* Currency Selector */}
            <div className="relative hidden sm:block">
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="appearance-none bg-transparent font-label-caps text-xs text-[#191c1d] font-semibold py-1.5 pl-2 pr-5 rounded hover:bg-[#edeeef] cursor-pointer focus:outline-none"
              >
                <option value="EUR">EUR €</option>
                <option value="USD">USD $</option>
                <option value="GBP">GBP £</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-1 top-2 text-[14px] text-[#46464b]">
                expand_more
              </span>
            </div>

            {/* Wishlist Link with Badge */}
            <button 
              onClick={onOpenWishlist}
              className="p-2 text-[#191c1d] hover:text-black transition-colors relative flex items-center justify-center rounded-lg hover:bg-black/5"
              aria-label="Lista de deseos"
            >
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#e1e3e4] text-black font-label-caps text-[9px] flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button with Count and Total */}
            <button 
              onClick={() => onNavigate('cart')}
              type="button" 
              className={`flex items-center gap-1.5 py-2 px-3 rounded-lg transition-all ${
                activeScreen === 'cart' 
                  ? 'bg-[#ab3516] text-white shadow-md' 
                  : 'bg-[#121316] text-white hover:bg-[#2e3132]'
              }`}
              aria-label="Abrir Carrito"
            >
              <span className="material-symbols-outlined text-[19px]">shopping_bag</span>
              <span className="hidden md:inline font-label-caps text-xs font-bold tracking-wider">
                {cartCount} {cartCount === 1 ? 'ÍTEM' : 'ITEMS'}
              </span>
              <span className="hidden md:inline text-white/40 font-label-caps text-xs">|</span>
              <span className="font-label-ui text-xs font-semibold">
                {cartTotal.toFixed(2).replace('.', ',')}€
              </span>
            </button>

            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#121316] flex items-center justify-center text-white" title="Cuenta Kura Studio">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#191c1d] hover:text-black focus:outline-none"
              aria-label="Menú"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-black/10 px-6 py-4 flex flex-col gap-3 shadow-xl">
            <button 
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="text-left font-label-ui text-sm uppercase tracking-wider py-2 border-b border-black/5"
            >
              Colección
            </button>
            <button 
              onClick={() => { onNavigate('pdp', '01-heavyweight-boxy-hoodie'); setMobileMenuOpen(false); }}
              className="text-left font-label-ui text-sm uppercase tracking-wider py-2 border-b border-black/5"
            >
              Básicos 450GSM
            </button>
            <button 
              onClick={() => { onNavigate('lookbook'); setMobileMenuOpen(false); }}
              className="text-left font-label-ui text-sm uppercase tracking-wider py-2 border-b border-black/5"
            >
              Lookbook
            </button>
            <button 
              onClick={() => { onNavigate('sostenibilidad'); setMobileMenuOpen(false); }}
              className="text-left font-label-ui text-sm uppercase tracking-wider py-2 border-b border-black/5"
            >
              Sostenibilidad
            </button>
            <button 
              onClick={() => { onNavigate('cart'); setMobileMenuOpen(false); }}
              className="text-left font-label-ui text-sm uppercase tracking-wider py-2 text-[#ab3516] font-bold"
            >
              Bolsa de Compra ({cartCount})
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
