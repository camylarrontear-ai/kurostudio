import React, { useState } from 'react';
import { Product, CartItem, CatalogCardItem } from '../types';
import { HOODIE_01_SERIES_VIEWS } from '../data/products';

interface HomeViewProps {
  products: Product[];
  onSelectProduct: (productId: string, imageIndex?: number) => void;
  onAddToCart: (item: CartItem) => void;
  onOpenCustomStudio: () => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onOpenCustomStudio,
  onToggleWishlist,
  wishlistIds,
}) => {
  // Catalog display mode: 'hoodie01' (the 4 user images of Sudadera 01) or 'full' (all models)
  const [catalogMode, setCatalogMode] = useState<'hoodie01' | 'full'>('hoodie01');
  // Hero Segment Tab state
  const [heroSegment, setHeroSegment] = useState<'oversized' | 'essential'>('oversized');
  
  // Filter States
  const [fitFilter, setFitFilter] = useState('Todos');
  const [colorFilter, setColorFilter] = useState('Todos');
  const [grammageFilter, setGrammageFilter] = useState('Todos');
  const [inStockOnly, setInStockOnly] = useState(true);
  const [sortBy, setSortBy] = useState('recommended');
  
  // Quick size selections per product card
  const [selectedCardSizes, setSelectedCardSizes] = useState<Record<string, string>>({
    '01-heavyweight-boxy-hoodie': 'L',
    '02-raw-sand-minimalist-fleece': 'L',
    '03-studio-zip-up-500gsm': 'M',
    '04-atelier-custom-hoodie': 'L',
  });

  // Banner Monogram state
  const [bannerMonogram, setBannerMonogram] = useState('KR');

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const size = selectedCardSizes[product.id] || 'L';
    const item: CartItem = {
      id: `${product.id}-${size}-${Date.now()}`,
      productId: product.id,
      sku: product.sku,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      image: product.images[0]?.url || '',
      weightGsm: product.weightGsm,
      size: `${size} (${product.fit.split(' ')[0]})`,
      colorName: product.colors[0]?.name || 'Washed Slate',
      colorHex: product.colors[0]?.hex || '#4A4D52',
      quantity: 1,
      stockNote: 'Confección en algodón 450GSM listo para despacho'
    };
    onAddToCart(item);
  };

  const setCardSize = (productId: string, size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCardSizes(prev => ({ ...prev, [productId]: size }));
  };

  // Filter products logic
  const filteredProducts = products.filter(product => {
    if (inStockOnly && product.stockStatus === 'sold_out') return false;
    if (fitFilter !== 'Todos' && !product.fit.toLowerCase().includes(fitFilter.toLowerCase())) return false;
    if (colorFilter !== 'Todos' && !product.colors.some(c => c.name.toLowerCase().includes(colorFilter.toLowerCase()))) return false;
    if (grammageFilter !== 'Todos') {
      if (grammageFilter === '450' && product.weightGsm !== 450) return false;
      if (grammageFilter === '500' && product.weightGsm !== 500) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full">
      
      {/* ================= SECTION 1: HERO EDITORIAL WITH GLASSMORPHIC FLOATING CONTROLS ================= */}
      <section className="relative w-full overflow-hidden bg-[#f3f4f5] min-h-[92vh] flex items-end">
        {/* Atmospheric Visual Layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] via-[#f8f9fa]/40 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8f9fa] via-[#f8f9fa]/30 to-transparent z-10 hidden lg:block"></div>
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBoFGMbNUKEYamZvMalgTvMAq1hPwQqJJYfzbNhyFg73IchSOZQP5xmZDmS-2VKSAkkQGJ69Sluh7H6YXhtK0feBHq0_NzhTFYuh0bp_VoYuZLgmKibMbgCyJ-Cg_h2mbP-mBe3wya01J7SORidCLSwQnDOzm3JgLVvdmyHYlbD-z6IJxV9PjUOmr_9kHq5SD7pQoBQXJLNXmzG9-UV5j7MdrSqeRaSagBhcVDi9x3vvGmaK6kP3u3m')` }}
          />
        </div>

        {/* Hero Content Mosaic */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 lg:px-12 pt-20 pb-16 flex flex-col justify-end gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Left: Monolithic Typography & Manifesto */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/80 backdrop-blur-md shadow-xs text-[#191c1d] font-label-caps text-xs uppercase tracking-widest font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#ab3516] animate-pulse"></span>
                  Nueva Temporada // Serie 04
                </span>
                <span className="text-[#46464b] font-label-caps text-xs tracking-widest hidden sm:inline">
                  ALGODÓN ORGÁNICO PEINADO
                </span>
              </div>

              <h1 className="font-display-hero uppercase tracking-tighter text-[#121316] leading-none text-balance">
                EL ESTÁNDAR DEL ALGODÓN PESADO. <span className="text-[#76777b]">450 GSM.</span>
              </h1>

              <p className="font-body-lg text-base sm:text-lg text-[#46464b] max-w-xl font-normal leading-relaxed text-balance">
                Siluetas contemporáneas diseñadas para resistir el tiempo. Creadas para universitarios y mentes creativas que exigen pureza en el patrón arquitectónico, caída rotunda y tacto insuperable.
              </p>

              {/* Micro Metadatos Cristalinos */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <div className="px-3 py-2 rounded-md bg-white/70 backdrop-blur-md shadow-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">texture</span>
                  <span className="font-label-ui text-xs text-[#191c1d] font-semibold">450 GSM Felpa Francesa</span>
                </div>
                <div className="px-3 py-2 rounded-md bg-white/70 backdrop-blur-md shadow-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">straighten</span>
                  <span className="font-label-ui text-xs text-[#191c1d] font-semibold">Corte Boxy Drop Shoulder</span>
                </div>
                <div className="px-3 py-2 rounded-md bg-white/70 backdrop-blur-md shadow-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">palette</span>
                  <span className="font-label-ui text-xs text-[#191c1d] font-semibold">Tintado Artesanal en Prenda</span>
                </div>
              </div>
            </div>

            {/* Right: Glassmorphic Segment Switcher & Dual CTAs */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md shadow-xl flex flex-col gap-4 border border-white/60">
                {/* Segment Tabs */}
                <div className="flex flex-col gap-1.5">
                  <span className="font-label-caps text-xs text-[#46464b] uppercase tracking-wider font-bold">
                    Línea de Confección
                  </span>
                  <div className="grid grid-cols-2 p-1 bg-[#edeeef] rounded-lg gap-1">
                    <button 
                      type="button"
                      onClick={() => setHeroSegment('oversized')}
                      className={`py-2.5 px-3 rounded text-center font-label-ui text-xs uppercase tracking-wider transition-all font-semibold ${
                        heroSegment === 'oversized'
                          ? 'bg-[#121316] text-white shadow-sm'
                          : 'text-[#46464b] hover:text-black'
                      }`}
                    >
                      Drop Universitario
                    </button>
                    <button 
                      type="button"
                      onClick={() => setHeroSegment('essential')}
                      className={`py-2.5 px-3 rounded text-center font-label-ui text-xs uppercase tracking-wider transition-all font-semibold ${
                        heroSegment === 'essential'
                          ? 'bg-[#121316] text-white shadow-sm'
                          : 'text-[#46464b] hover:text-black'
                      }`}
                    >
                      Essential Studio
                    </button>
                  </div>
                </div>

                {/* Segment Meta Description Dynamic */}
                <div className="py-1 flex items-center justify-between text-[#191c1d]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-[#ab3516]">check_circle</span>
                    <span className="font-body-sm text-xs font-medium">
                      {heroSegment === 'oversized' 
                        ? 'Hombro caído, torso ancho y puños estructurados anti-deformación.'
                        : 'Líneas rectas minimalistas, ajuste al torso exacto y cuello limpio sin cordones.'}
                    </span>
                  </div>
                </div>

                {/* Dual CTAs */}
                <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <a 
                    href="#catalogo" 
                    className="flex-1 py-3.5 px-4 bg-[#121316] text-white rounded-lg text-center font-label-ui text-xs uppercase tracking-wider font-bold hover:bg-[#2e3132] shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Explorar Catálogo</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                  </a>
                  <button 
                    type="button"
                    onClick={onOpenCustomStudio}
                    className="flex-1 py-3.5 px-4 bg-white text-[#121316] border border-black/10 rounded-lg text-center font-label-ui text-xs uppercase tracking-wider font-bold hover:bg-[#f3f4f5] transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#ab3516]">brush</span>
                    <span>Custom Studio</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 text-[#46464b] font-label-caps text-[10px] uppercase tracking-wider border-t border-black/5">
                  <span>Producción Ética Portugal / España</span>
                  <span>100% Trazable</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECTION 2: HEURISTIC FILTER BAR & INTUITIVE SEARCH ================= */}
      <section className="sticky top-20 z-40 w-full py-3 bg-white/80 backdrop-blur-md shadow-xs border-b border-black/5">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-12 flex flex-col gap-3">
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Left Filter Chips Cluster */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-label-caps text-xs uppercase tracking-wider text-[#46464b] mr-1 hidden md:inline font-bold">
                Filtros:
              </span>

              {/* Fit Dropdown */}
              <div className="relative">
                <select 
                  value={fitFilter}
                  onChange={(e) => setFitFilter(e.target.value)}
                  className="appearance-none bg-[#f3f4f5] hover:bg-[#edeeef] py-2 pl-3 pr-8 rounded-lg font-label-ui text-xs text-[#191c1d] focus:outline-none cursor-pointer shadow-xs transition-colors font-medium"
                >
                  <option value="Todos">Ajuste: Todos</option>
                  <option value="Boxy">Oversized Boxy</option>
                  <option value="Architectural">Relaxed Fit</option>
                  <option value="Custom">Custom Studio</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2 text-[16px] text-[#46464b]">
                  expand_more
                </span>
              </div>

              {/* Color Dropdown */}
              <div className="relative">
                <select 
                  value={colorFilter}
                  onChange={(e) => setColorFilter(e.target.value)}
                  className="appearance-none bg-[#f3f4f5] hover:bg-[#edeeef] py-2 pl-3 pr-8 rounded-lg font-label-ui text-xs text-[#191c1d] focus:outline-none cursor-pointer shadow-xs transition-colors font-medium"
                >
                  <option value="Todos">Color: Gama Neutra</option>
                  <option value="Slate">Slate Grey (Lavado)</option>
                  <option value="Sand">Raw Sand (Crudo)</option>
                  <option value="Charcoal">Charcoal Black</option>
                  <option value="Sage">Earthy Sage</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2 text-[16px] text-[#46464b]">
                  expand_more
                </span>
              </div>

              {/* Grammage Dropdown */}
              <div className="relative">
                <select 
                  value={grammageFilter}
                  onChange={(e) => setGrammageFilter(e.target.value)}
                  className="appearance-none bg-[#f3f4f5] hover:bg-[#edeeef] py-2 pl-3 pr-8 rounded-lg font-label-ui text-xs text-[#191c1d] focus:outline-none cursor-pointer shadow-xs transition-colors font-medium"
                >
                  <option value="Todos">Gramaje: 400 - 500 GSM</option>
                  <option value="450">450 GSM (Firma KURA)</option>
                  <option value="500">500 GSM (Heavy Armor)</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2 text-[16px] text-[#46464b]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Right: In-Stock Toggle & Order Selector */}
            <div className="flex items-center gap-3 ml-auto">
              {/* In Stock Immediate Switch */}
              <label 
                onClick={() => setInStockOnly(!inStockOnly)}
                className="flex items-center gap-2 cursor-pointer select-none px-3 py-1.5 rounded-lg bg-[#f3f4f5] hover:bg-[#edeeef] transition-colors"
              >
                <span 
                  className={`w-8 h-4 rounded-full relative flex items-center p-0.5 transition-colors ${
                    inStockOnly ? 'bg-[#bceecf]' : 'bg-[#e1e3e4]'
                  }`}
                >
                  <span 
                    className={`w-3 h-3 rounded-full transition-transform ${
                      inStockOnly 
                        ? 'translate-x-4 bg-[#224f39]' 
                        : 'translate-x-0 bg-[#76777b]'
                    }`}
                  />
                </span>
                <span className="font-label-ui text-xs text-[#191c1d] font-semibold">
                  En Stock Inmediato
                </span>
              </label>

              {/* Order selector */}
              <div className="relative hidden md:block">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-[#f3f4f5] hover:bg-[#edeeef] py-2 pl-3 pr-8 rounded-lg font-label-ui text-xs text-[#191c1d] focus:outline-none cursor-pointer transition-colors font-medium"
                >
                  <option value="recommended">Ordenar: Recomendados</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="heavy">Gramaje Más Pesado</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2 text-[16px] text-[#46464b]">
                  sort
                </span>
              </div>
            </div>
          </div>

          {/* Quick Search Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="font-label-caps text-xs text-[#46464b] uppercase tracking-wider shrink-0 font-bold">
              Búsquedas Frecuentes:
            </span>
            <button 
              type="button" 
              onClick={() => { setGrammageFilter('450'); setFitFilter('Boxy'); }}
              className="px-2.5 py-1 rounded bg-[#edeeef] text-[#191c1d] hover:bg-[#121316] hover:text-white transition-all font-label-ui text-xs shrink-0 font-medium"
            >
              #450GSM Boxy
            </button>
            <button 
              type="button" 
              onClick={() => { setColorFilter('Slate'); }}
              className="px-2.5 py-1 rounded bg-[#edeeef] text-[#191c1d] hover:bg-[#121316] hover:text-white transition-all font-label-ui text-xs shrink-0 font-medium"
            >
              Hoodie Lavado Slate
            </button>
            <button 
              type="button" 
              onClick={() => { setColorFilter('Sand'); }}
              className="px-2.5 py-1 rounded bg-[#edeeef] text-[#191c1d] hover:bg-[#121316] hover:text-white transition-all font-label-ui text-xs shrink-0 font-medium"
            >
              Crudo Raw Sand
            </button>
            <button 
              type="button" 
              onClick={onOpenCustomStudio}
              className="px-2.5 py-1 rounded bg-[#ffdad2] text-[#891d00] hover:bg-[#fd6f4b] hover:text-white transition-all font-label-ui text-xs shrink-0 font-bold"
            >
              Drop Personalizable
            </button>
          </div>

        </div>
      </section>

      {/* ================= SECTION 3: ARCHITECTURAL PRODUCT CATALOG ================= */}
      <section className="w-full py-16 bg-[#f8f9fa]" id="catalogo">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-12 flex flex-col gap-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-caps text-xs text-[#ab3516] uppercase tracking-widest font-bold">
                Catálogo Esencial 2025
              </span>
              <h2 className="font-headline-lg text-3xl sm:text-4xl text-primary uppercase tracking-tight font-bold">
                Piezas Estructuradas en Rotación
              </h2>
            </div>
            <div className="flex items-center gap-3 text-[#46464b] font-label-ui text-xs">
              <span>Mostrando {filteredProducts.length} piezas exclusivas</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c7c6cb]"></span>
              <span>Patronaje sin encogimiento prelavado</span>
            </div>
          </div>

          {/* Grid Asimétrico de 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const currentSize = selectedCardSizes[product.id] || 'L';
              const isWishlisted = wishlistIds.includes(product.id);

              return (
                <div 
                  key={product.id}
                  onClick={() => onSelectProduct(product.id)}
                  className="group relative rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer border border-black/5"
                >
                  {/* Image Box with Ratio and Hover Effects */}
                  <div className="relative w-full aspect-[4/5] bg-[#edeeef] overflow-hidden">
                    <img 
                      src={product.images[0]?.url} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Stock & Feature Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
                      {product.badge && (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-label-caps text-[10px] uppercase font-bold tracking-widest shadow-xs ${
                          product.badgeType === 'stock'
                            ? 'bg-[#ffdad2] text-[#3c0700]'
                            : product.badgeType === 'eco'
                            ? 'bg-[#bceecf] text-[#002112]'
                            : product.badgeType === 'heavy'
                            ? 'bg-[#e1e3e4] text-[#191c1d]'
                            : 'bg-[#ab3516] text-white'
                        }`}>
                          {product.badgeType === 'stock' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ab3516] animate-ping" />
                          )}
                          {product.badgeType === 'eco' && (
                            <span className="material-symbols-outlined text-[12px]">eco</span>
                          )}
                          {product.badgeType === 'custom' && (
                            <span className="material-symbols-outlined text-[12px]">view_in_ar</span>
                          )}
                          {product.badge}
                        </span>
                      )}
                      
                      <span className="inline-block px-2 py-0.5 rounded bg-white/85 backdrop-blur-md text-primary font-label-caps text-[9px] font-bold">
                        {product.weightGsm} GSM
                      </span>
                    </div>

                    {/* Favorite Quick Action */}
                    <button 
                      type="button"
                      aria-label="Añadir a lista de deseos"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-xs ${
                        isWishlisted
                          ? 'bg-[#ab3516] text-white'
                          : 'bg-white/80 text-[#191c1d] hover:bg-black hover:text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isWishlisted ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>

                    {/* Quick Add Size Drawer on Hover */}
                    <div className="absolute inset-x-3 bottom-3 p-3 rounded-lg bg-white/95 backdrop-blur-md shadow-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[#46464b] font-label-caps text-[10px] uppercase font-bold tracking-wider">
                        <span>Selección Rápida de Talla</span>
                        <span className="text-[#ab3516] font-semibold">{product.fit.split(' ')[0]} Fit</span>
                      </div>

                      {/* Size pills */}
                      <div className="grid grid-cols-4 gap-1.5">
                        {['S', 'M', 'L', 'XL'].map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={(e) => setCardSize(product.id, sz, e)}
                            className={`py-1.5 rounded text-center font-label-ui text-xs transition-all ${
                              currentSize === sz
                                ? 'bg-[#121316] text-white font-bold'
                                : 'bg-[#f3f4f5] hover:bg-[#edeeef] text-[#191c1d]'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>

                      {/* Quick Add CTA */}
                      <button 
                        type="button"
                        onClick={(e) => handleQuickAdd(product, e)}
                        className="w-full py-2 bg-[#121316] hover:bg-[#2e3132] text-white rounded font-label-caps text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 mt-0.5 font-bold"
                      >
                        <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
                        Añadir al Carrito
                      </button>
                    </div>
                  </div>

                  {/* Product Details Bar */}
                  <div className="p-4 flex flex-col gap-1 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-[10px] text-[#46464b] uppercase tracking-wider">
                        SKU: {product.sku}
                      </span>
                      <div className="flex items-center gap-1 text-[#191c1d] font-label-caps text-[10px]">
                        <span className="material-symbols-outlined text-[14px] text-[#ab3516]">star</span>
                        <span className="font-bold">{product.rating}</span>
                        <span className="text-[#76777b]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="font-title-sm text-sm text-primary font-bold tracking-tight">
                      {product.name}
                    </h3>

                    <div className="flex items-baseline justify-between pt-1">
                      <span className="font-headline-md text-base font-bold text-primary">
                        {product.price}€
                      </span>
                      <span className="font-body-sm text-xs text-[#46464b] font-medium">
                        {product.subtitle.split('//')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Notification Banner */}
          <div className="w-full p-4 rounded-xl bg-[#f3f4f5] flex flex-col md:flex-row items-center justify-between gap-4 border border-black/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#ab3516]">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              </div>
              <div>
                <h4 className="font-label-ui text-xs font-bold text-primary">Despacho en 24h desde Barcelona y Oporto</h4>
                <p className="font-body-sm text-xs text-[#46464b]">Sin aduanas ni costes ocultos dentro de la Unión Europea.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[#191c1d] font-label-caps text-xs tracking-wider uppercase font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#fd6f4b]"></span>
                Packaging de almidón 100% compostable
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION 4: THE PHILOSOPHY / USABILIDAD NORMAN & NIELSEN ================= */}
      <section className="w-full py-16 bg-[#f3f4f5]">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-12 flex flex-col gap-10">
          
          <div className="flex flex-col gap-1.5 max-w-2xl">
            <span className="font-label-caps text-xs text-[#46464b] uppercase tracking-widest font-bold">
              Diseño Centrado en las Personas
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl text-primary uppercase tracking-tight font-bold">
              Experiencia Sin Conjeturas
            </h2>
            <p className="font-body-lg text-sm sm:text-base text-[#46464b] leading-relaxed">
              Aplicamos los principios de usabilidad de Jakob Nielsen y Don Norman a la experiencia textil: claridad de estado, correspondencia táctil y prevención radical de errores de talla.
            </p>
          </div>

          {/* 3 Glassmorphic Principle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1 */}
            <div className="p-8 rounded-xl bg-white/80 backdrop-blur-md shadow-xs flex flex-col justify-between gap-6 border border-white/60">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#edeeef] flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">front_hand</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-xs text-[#ab3516] font-bold uppercase tracking-wider">
                    Heurística #2
                  </span>
                  <h3 className="font-title-sm text-base text-primary font-bold">Tacto y Estructura Tangible</h3>
                </div>
                <p className="font-body-sm text-xs text-[#46464b] leading-relaxed">
                  No fotografíamos telas con filtros artificiales. Documentamos el peso real de 450GSM bajo luz natural neutra para que lo que ves en pantalla coincida milimétricamente con el volumen que sientes al desempaquetar.
                </p>
              </div>
              <div className="pt-3 flex items-center justify-between font-label-caps text-xs text-[#191c1d] border-t border-black/5">
                <span className="font-bold">Densidad Real: 450g/m²</span>
                <span className="text-[#76777b]">Cero engaños</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-xl bg-white/80 backdrop-blur-md shadow-xs flex flex-col justify-between gap-6 border border-white/60">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#edeeef] flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">assignment_return</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-xs text-[#ab3516] font-bold uppercase tracking-wider">
                    Heurística #3
                  </span>
                  <h3 className="font-title-sm text-base text-primary font-bold">Devoluciones sin Fricción</h3>
                </div>
                <p className="font-body-sm text-xs text-[#46464b] leading-relaxed">
                  Cada pedido incluye una etiqueta adhesiva prepagada en la caja. Si el fit no es exactamente el que buscabas para tu proporción, gestionas el reemplazo o reembolso en un clic sin correos de confirmación eternos.
                </p>
              </div>
              <div className="pt-3 flex items-center justify-between font-label-caps text-xs text-[#191c1d] border-t border-black/5">
                <span className="font-bold">30 Días de Prueba</span>
                <span className="text-[#ab3516] font-bold">1-Click Portal</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-xl bg-white/80 backdrop-blur-md shadow-xs flex flex-col justify-between gap-6 border border-white/60">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#edeeef] flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">rule</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-xs text-[#ab3516] font-bold uppercase tracking-wider">
                    Heurística #5
                  </span>
                  <h3 className="font-title-sm text-base text-primary font-bold">Guía Predictiva ExactFit</h3>
                </div>
                <p className="font-body-sm text-xs text-[#46464b] leading-relaxed">
                  Nuestra matriz interactiva calcula tu talla precisa a partir de tu altura y complexión, contrastando con el encogimiento estándar de 0.8% del algodón no sintético. Eliminamos la duda entre M y L.
                </p>
              </div>
              <div className="pt-3 flex items-center justify-between font-label-caps text-xs text-[#191c1d] border-t border-black/5">
                <span className="font-bold">Precisión: 98.4%</span>
                <span className="text-[#224f39] font-bold">Sin Devolución</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 5: INTERACTIVE CUSTOM STUDIO LAB BANNER ================= */}
      <section className="w-full py-16 bg-[#f8f9fa]" id="custom-studio-lab">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
          <div className="relative w-full rounded-2xl bg-white shadow-xl overflow-hidden p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 border border-black/5">
            
            {/* Left: Studio Configurator Pitch */}
            <div className="w-full lg:max-w-xl flex flex-col gap-4 z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#ffdad2] text-[#891d00] font-label-caps text-xs uppercase font-bold tracking-widest">
                  KURA LAB // ATELIER
                </span>
                <span className="font-label-caps text-xs text-[#46464b] uppercase tracking-wider font-semibold">
                  Bordado Táctil 3D
                </span>
              </div>

              <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-primary uppercase tracking-tight leading-tight font-bold">
                CREA TU PIEZA ÚNICA. INICIALES O GRÁFICAS DE ALTA DENSIDAD.
              </h2>

              <p className="font-body-md text-xs sm:text-sm text-[#46464b] leading-relaxed">
                Selecciona la base heavyweight 450GSM en tu tono favorito y personaliza la posición en muñeca, pecho o capucha. Visualización interactiva en tiempo real antes de entrar a confección artesanal.
              </p>

              {/* Interactive Micro Tool inside Banner */}
              <div className="p-4 rounded-xl bg-[#f3f4f5] flex flex-col gap-2 border border-black/5">
                <span className="font-label-caps text-[10px] uppercase text-[#46464b] tracking-wider font-bold">
                  Simulador de Iniciales (Vista Previa Inmediata):
                </span>
                <div className="flex items-center gap-3">
                  <input 
                    type="text"
                    maxLength={3}
                    value={bannerMonogram}
                    onChange={(e) => setBannerMonogram(e.target.value.toUpperCase().slice(0, 3))}
                    placeholder="KR"
                    className="w-24 px-3 py-2 bg-white text-primary font-headline-md text-xl uppercase text-center rounded-lg focus:outline-none focus:ring-1 focus:ring-black shadow-xs font-bold"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="font-label-ui text-xs font-bold text-primary">
                      Monograma Bordado en Relieve
                    </span>
                    <span className="font-body-sm text-[11px] text-[#46464b]">
                      Hilo de algodón mercerizado tono sobre tono
                    </span>
                  </div>
                </div>
              </div>

              {/* Studio CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button 
                  type="button"
                  onClick={onOpenCustomStudio}
                  className="px-6 py-3.5 bg-[#121316] text-white rounded-lg font-label-ui text-xs uppercase tracking-wider font-bold hover:bg-[#2e3132] transition-all shadow-md flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">view_in_ar</span>
                  Iniciar Personalizador 3D
                </button>
                <span className="font-body-sm text-xs text-[#46464b]">
                  Tiempo estimado de confección: 4-6 días laborables
                </span>
              </div>
            </div>

            {/* Right: Real-time Visual Representation */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative">
              <div className="relative w-full max-w-md aspect-square rounded-xl bg-[#f3f4f5] overflow-hidden shadow-inner flex items-center justify-center p-6">
                <div 
                  className="w-full h-full bg-cover bg-center rounded-lg relative flex items-center justify-center"
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBoQBCvfwlTIDOLatTRvbydpRlfvNlW1mqAurrvrBCjzvCBhMFMI499eR9leAoo9bc0XypcPStGdjEFwYj5qB_OOAWOXa85R2L9fBWdjqDi0XP1q6dEQnVxIwl38qlUJiz1lP20uU7lpQ9lVJbkUEh-1OgmtRaAyKDRNdW8dDvTSIZ3UGgTBP_svsAuSMVih6mODKIxGQhDpLzNvfrp8ZmqjZ9c9yx41Jvg7mnAnFXe1FiT0IbbbI4P')` }}
                >
                  {/* Floating Live Monogram Badge */}
                  <div className="p-6 rounded-2xl bg-white/85 backdrop-blur-md shadow-2xl flex flex-col items-center gap-1.5 text-center transition-transform hover:scale-105 border border-white/60">
                    <span className="font-label-caps text-[9px] text-[#46464b] uppercase tracking-widest font-bold">
                      Bordado Posición: Pecho Izq.
                    </span>
                    <span className="font-display-hero text-3xl sm:text-4xl tracking-widest text-primary font-bold">
                      {bannerMonogram || 'KR'}
                    </span>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="w-2 h-2 rounded-full bg-[#ab3516]"></span>
                      <span className="font-label-caps text-[9px] text-[#46464b] uppercase font-bold">
                        Hilo Slate Grey
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Atelier Badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md shadow-xs font-label-caps text-[10px] text-primary uppercase font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#ab3516]">verified</span>
                  Hecho a mano en Oporto
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
