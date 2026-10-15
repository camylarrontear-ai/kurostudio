import React, { useState, useRef } from 'react';
import { Product, CartItem, ActiveScreen } from '../types';

interface PdpViewProps {
  product: Product;
  initialImageIndex?: number;
  onAddToCart: (item: CartItem) => void;
  onOpenSizeModal: () => void;
  onNavigate: (screen: ActiveScreen) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export const PdpView: React.FC<PdpViewProps> = ({
  product,
  initialImageIndex = 0,
  onAddToCart,
  onOpenSizeModal,
  onNavigate,
  onToggleWishlist,
  isWishlisted,
}) => {
  // Gallery
  const [activeImageIndex, setActiveImageIndex] = useState(initialImageIndex);
  const [zoomOrigin, setZoomOrigin] = useState('center center');
  const [isZooming, setIsZooming] = useState(false);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setActiveImageIndex(initialImageIndex);
  }, [initialImageIndex]);

  // Customization
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Washed Slate Grey');
  const [selectedSize, setSelectedSize] = useState('L');
  const [isCustomEnabled, setIsCustomEnabled] = useState(true);
  const [monogramText, setMonogramText] = useState('KR');
  const [threadColor, setThreadColor] = useState<'tonal' | 'terracota'>('tonal');
  const [placement, setPlacement] = useState<'chest' | 'cuff' | 'hood'>('chest');

  // Fit Calculator
  const [fitHeight, setFitHeight] = useState('184');
  const [fitWeight, setFitWeight] = useState('78');
  const [fitRecommendation, setFitRecommendation] = useState<string | null>(null);

  // Accordions
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // Feedback toast
  const [showToast, setShowToast] = useState(false);

  // Calculations
  const basePrice = product.price; // 95
  const customizationFee = isCustomEnabled ? 15 : 0;
  const totalPrice = basePrice + customizationFee; // 110 or 95

  // Mouse move for loupe zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgContainerRef.current) return;
    const rect = imgContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
    setZoomOrigin('center center');
  };

  // Fit calculator logic
  const handleCalculateFit = () => {
    const h = parseInt(fitHeight) || 184;
    const w = parseInt(fitWeight) || 78;
    let rec = 'L';
    if (h < 172 || w < 65) rec = 'S';
    else if (h < 180 || w < 75) rec = 'M';
    else if (h < 190 && w < 86) rec = 'L';
    else rec = 'XL';

    setFitRecommendation(`Según tus datos (${h} cm, ${w} kg): recomendamos Talla ${rec} para caída Boxy ideal o ${rec === 'L' ? 'M' : 'S'} para corte más ajustado.`);
  };

  // Add to cart
  const handleAdd = () => {
    const activeColorObj = product.colors.find(c => c.name === selectedColor) || product.colors[0];
    const cartItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      sku: product.sku,
      name: product.name,
      subtitle: `DROP 04 / ARCHITECTURAL FIT`,
      price: totalPrice,
      image: product.images[activeImageIndex]?.url || product.images[0]?.url,
      weightGsm: product.weightGsm,
      size: `${selectedSize} (Boxy Oversize)`,
      colorName: selectedColor,
      colorHex: activeColorObj?.hex || '#4A4D52',
      customization: isCustomEnabled ? {
        enabled: true,
        monogram: monogramText || 'KR',
        threadColor,
        placement,
        extraPrice: 15
      } : undefined,
      quantity: 1,
      stockNote: 'Algodón peinado orgánico de 450 g/m² listo para despacho'
    };

    onAddToCart(cartItem);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const activeImage = product.images[activeImageIndex] || product.images[0];

  return (
    <div className="w-full pt-4 pb-16 bg-[#f8f9fa]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 flex flex-col gap-6">
        
        {/* Breadcrumbs Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-label-caps text-xs text-[#46464b] uppercase tracking-widest py-2 overflow-x-auto whitespace-nowrap">
          <button onClick={() => onNavigate('home')} className="hover:text-black transition-colors font-bold">
            Inicio
          </button>
          <span className="text-[#c7c6cb]">/</span>
          <button onClick={() => onNavigate('home')} className="hover:text-black transition-colors font-bold">
            Colección 450GSM
          </button>
          <span className="text-[#c7c6cb]">/</span>
          <span className="text-primary font-bold">{product.name} — {selectedColor}</span>
        </nav>

        {/* Main Asymmetric Grid (60 / 40) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT COLUMN: Visual Gallery (7 Cols Desktop) ================= */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-24">
            
            {/* Vertical Thumbnails Carousel */}
            <div className="flex md:flex-col gap-2 shrink-0 overflow-x-auto md:overflow-y-auto max-h-[740px] py-1 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`group relative w-16 h-20 md:w-20 md:h-28 rounded-lg overflow-hidden bg-[#f3f4f5] shadow-xs transition-all duration-200 shrink-0 ${
                    activeImageIndex === idx 
                      ? 'ring-2 ring-black scale-102 opacity-100' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Ver ${img.label}`}
                >
                  <img 
                    src={img.url} 
                    alt={img.alt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 left-1 right-1 text-[9px] font-label-caps font-bold uppercase text-center bg-white/80 backdrop-blur-md rounded py-0.5 text-black">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Main High-Fidelity Canvas with Loupe / Zoom Preview */}
            <div className="flex-1 flex flex-col gap-3">
              <div 
                ref={imgContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full aspect-[4/5] bg-[#edeeef] rounded-2xl overflow-hidden shadow-md group cursor-crosshair border border-black/5 select-none"
              >
                <img 
                  src={activeImage.url} 
                  alt={activeImage.alt}
                  style={{
                    transformOrigin: zoomOrigin,
                    transform: isZooming ? 'scale(1.75)' : 'scale(1)',
                  }}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out origin-center pointer-events-none"
                />

                {/* Badges Layer */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                  <span className="bg-white/90 backdrop-blur-md text-primary font-label-caps text-xs uppercase px-3 py-1 rounded-md shadow-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ab3516]"></span>
                    Heavyweight Drop
                  </span>
                  <span className="bg-[#e1e3e4]/90 backdrop-blur-md text-primary font-label-caps text-xs px-3 py-1 rounded-md shadow-xs font-semibold">
                    Edición Limitada // 250 Uds
                  </span>
                </div>

                {/* Model Dimension Metadata Strip */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-xs flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#46464b]">straighten</span>
                    <span className="font-body-sm text-xs text-primary font-semibold">
                      Modelo: 1,84 m · 78 kg · Talla L (Oversized)
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 bg-white/85 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-xs">
                    <span className="material-symbols-outlined text-[15px] text-[#46464b]">zoom_in</span>
                    <span className="font-label-caps text-[10px] text-primary font-bold tracking-wider uppercase">
                      Hover Zoom
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust & Social Proof Strip */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-[#f3f4f5] rounded-xl border border-black/5 text-center">
                <div className="flex items-center justify-center gap-1.5 p-1">
                  <div className="flex text-[#ab3516]">
                    <span className="material-symbols-outlined text-[16px]">star</span>
                    <span className="material-symbols-outlined text-[16px]">star</span>
                    <span className="material-symbols-outlined text-[16px]">star</span>
                    <span className="material-symbols-outlined text-[16px]">star</span>
                    <span className="material-symbols-outlined text-[16px]">star_half</span>
                  </div>
                  <span className="font-body-sm text-xs font-bold text-primary">4.9 / 5</span>
                  <span className="hidden md:inline font-body-sm text-[11px] text-[#46464b]">(1.420)</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 p-1">
                  <span className="material-symbols-outlined text-[16px] text-[#46464b]">local_shipping</span>
                  <span className="font-body-sm text-xs text-primary font-medium">Entrega 24/48h</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 p-1">
                  <span className="material-symbols-outlined text-[16px] text-[#46464b]">restart_alt</span>
                  <span className="font-body-sm text-xs text-primary font-medium">30 Días Devolución</span>
                </div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: Glassmorphic PDP & Customization Matrix (5 Cols Desktop) ================= */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Header & Price Matrix */}
            <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-md flex flex-col gap-4 border border-black/5">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-xs uppercase tracking-widest text-[#ab3516] font-bold">
                  Arquitectura Textil 01
                </span>
                <span className="font-label-caps text-xs uppercase tracking-wider bg-[#bceecf] text-[#002112] font-bold px-2 py-0.5 rounded">
                  Envío Express Gratis
                </span>
              </div>

              <h1 className="font-headline-lg text-2xl sm:text-3xl text-primary tracking-tight font-bold">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-2">
                <span className="font-headline-md text-2xl font-bold text-primary">
                  {basePrice.toFixed(2).replace('.', ',')} €
                </span>
                <span className="font-body-sm text-xs text-[#46464b]">
                  IVA e impuestos incluidos
                </span>
              </div>

              <p className="font-body-md text-xs sm:text-sm text-[#46464b] leading-relaxed">
                {product.description}
              </p>

              {/* Interactive Color Swatches */}
              <div className="pt-1 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-xs tracking-widest uppercase text-black font-bold">
                    Color Seleccionado:
                  </span>
                  <span className="font-label-ui text-xs font-semibold text-primary">
                    {selectedColor}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative w-9 h-9 rounded-full bg-[#f3f4f5] flex items-center justify-center shadow-xs transition-all ${
                        selectedColor === color.name 
                          ? 'ring-2 ring-black scale-105 opacity-100' 
                          : 'opacity-80 hover:opacity-100'
                      }`}
                      title={color.name}
                    >
                      <span 
                        className="w-6 h-6 rounded-full shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Smart Size Selector */}
              <div className="pt-1 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-xs tracking-widest uppercase text-black font-bold">
                    Talla Europea:
                  </span>
                  <button 
                    type="button"
                    onClick={onOpenSizeModal}
                    className="font-label-ui text-xs text-[#ab3516] hover:underline flex items-center gap-1 font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">straighten</span>
                    Tabla de Medidas (cm)
                  </button>
                </div>

                {/* Size Buttons Grid */}
                <div className="grid grid-cols-6 gap-2">
                  {product.availableSizes.map(item => {
                    const isSoldOut = item.stock === 'out';
                    const isSelected = selectedSize === item.size;

                    return (
                      <button
                        key={item.size}
                        type="button"
                        disabled={isSoldOut}
                        onClick={() => setSelectedSize(item.size)}
                        className={`flex flex-col items-center justify-center py-2.5 rounded-lg font-label-ui text-xs transition-all ${
                          isSoldOut
                            ? 'opacity-40 cursor-not-allowed bg-white text-[#76777b] line-through'
                            : isSelected
                            ? 'bg-[#121316] text-white font-bold shadow-xs'
                            : 'bg-[#f3f4f5] text-[#191c1d] hover:bg-[#edeeef] font-semibold'
                        }`}
                      >
                        <span>{item.size}</span>
                        <span className={`font-label-caps text-[9px] tracking-normal ${
                          item.stock === 'low' && !isSelected 
                            ? 'text-[#ab3516] font-bold' 
                            : 'opacity-80'
                        }`}>
                          {item.stock === 'low' ? '2 UDS' : item.stock === 'out' ? 'Agotado' : item.chestWidth}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Stock & Predictive KURA-Fit Recommender Widget */}
                <div className="bg-[#f3f4f5] rounded-xl p-3.5 flex flex-col gap-2 mt-2 border border-black/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#fd6f4b]"></span>
                      <span className="font-body-sm text-xs font-semibold text-primary">
                        Talla {selectedSize} seleccionada — En stock inmediato
                      </span>
                    </div>
                    <span className="font-label-caps text-[10px] text-[#002112] bg-[#bceecf] px-2 py-0.5 rounded font-bold">
                      98% ACIERTO FIT
                    </span>
                  </div>

                  {/* Quick Fit Predictor Input */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="material-symbols-outlined text-[16px] text-[#46464b]">person_search</span>
                    <span className="font-body-sm text-xs text-[#46464b] flex-1">Calculadora:</span>
                    <input 
                      type="number"
                      min="150"
                      max="215"
                      value={fitHeight}
                      onChange={(e) => setFitHeight(e.target.value)}
                      placeholder="184 cm"
                      className="w-16 bg-white text-center rounded-md py-1 px-1 font-body-sm text-xs text-primary focus:outline-none focus:ring-1 focus:ring-black border border-black/5"
                    />
                    <input 
                      type="number"
                      min="40"
                      max="150"
                      value={fitWeight}
                      onChange={(e) => setFitWeight(e.target.value)}
                      placeholder="78 kg"
                      className="w-16 bg-white text-center rounded-md py-1 px-1 font-body-sm text-xs text-primary focus:outline-none focus:ring-1 focus:ring-black border border-black/5"
                    />
                    <button 
                      type="button"
                      onClick={handleCalculateFit}
                      className="px-2.5 py-1 bg-[#121316] text-white font-label-caps text-[10px] rounded-md hover:bg-[#2e3132] transition-colors font-bold uppercase"
                    >
                      Calcular
                    </button>
                  </div>

                  {fitRecommendation && (
                    <p className="font-body-sm text-xs text-[#ab3516] font-semibold pt-1">
                      {fitRecommendation}
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* ================= ATELIER LAB: Modular Customization Card ================= */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-md flex flex-col gap-4 border border-black/5">
              <div 
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => setIsCustomEnabled(!isCustomEnabled)}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#ab3516] text-[22px]">palette</span>
                  <div>
                    <span className="font-title-sm text-sm text-primary block font-bold">
                      Atelier Lab // Personalización
                    </span>
                    <span className="font-body-sm text-xs text-[#46464b]">
                      Bordado artesanal de precisión en taller de Oporto
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-caps text-xs bg-[#ffdad2] text-[#891d00] px-2 py-0.5 rounded font-bold">
                    +15,00 €
                  </span>
                  <input 
                    type="checkbox"
                    checked={isCustomEnabled}
                    onChange={(e) => setIsCustomEnabled(e.target.checked)}
                    className="w-5 h-5 rounded accent-black cursor-pointer"
                  />
                </div>
              </div>

              {/* Customization Options */}
              {isCustomEnabled && (
                <div className="flex flex-col gap-4 pt-2 border-t border-[#edeeef] animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Initials */}
                    <div className="flex flex-col gap-1">
                      <label className="font-label-caps text-xs uppercase text-black font-bold">
                        Tus Iniciales (Max 3)
                      </label>
                      <div className="relative">
                        <input 
                          type="text"
                          maxLength={3}
                          value={monogramText}
                          onChange={(e) => setMonogramText(e.target.value.toUpperCase().slice(0, 3))}
                          placeholder="KR"
                          className="w-full bg-[#f3f4f5] rounded-lg px-3 py-2 uppercase tracking-widest font-headline-md text-xl text-primary text-center focus:outline-none focus:ring-1 focus:ring-black border border-black/5 font-bold"
                        />
                        <span className="absolute right-3 top-3 text-[10px] font-label-caps text-[#76777b]">
                          {monogramText.length}/3 CAR
                        </span>
                      </div>
                    </div>

                    {/* Thread Color */}
                    <div className="flex flex-col gap-1">
                      <label className="font-label-caps text-xs uppercase text-black font-bold">
                        Tono del Hilo
                      </label>
                      <div className="grid grid-cols-2 gap-2 h-full">
                        <button
                          type="button"
                          onClick={() => setThreadColor('tonal')}
                          className={`flex items-center justify-center gap-1.5 p-2 rounded-lg cursor-pointer transition-all border-2 ${
                            threadColor === 'tonal'
                              ? 'border-black bg-[#f3f4f5]'
                              : 'border-transparent bg-[#f3f4f5] hover:bg-[#edeeef]'
                          }`}
                        >
                          <span className="w-3.5 h-3.5 rounded-full bg-[#52555a]"></span>
                          <span className="font-label-ui text-[11px] font-bold text-primary">Tonal Discreto</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setThreadColor('terracota')}
                          className={`flex items-center justify-center gap-1.5 p-2 rounded-lg cursor-pointer transition-all border-2 ${
                            threadColor === 'terracota'
                              ? 'border-[#ab3516] bg-[#ffdad2]/30'
                              : 'border-transparent bg-[#f3f4f5] hover:bg-[#edeeef]'
                          }`}
                        >
                          <span className="w-3.5 h-3.5 rounded-full bg-[#ab3516]"></span>
                          <span className="font-label-ui text-[11px] font-bold text-primary">Terracota</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Embroidery Placement */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-caps text-xs uppercase text-black font-bold">
                      Ubicación del Bordado
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPlacement('chest')}
                        className={`py-2 px-2 rounded-lg font-label-ui text-xs font-semibold text-center transition-all ${
                          placement === 'chest'
                            ? 'bg-[#121316] text-white shadow-xs'
                            : 'bg-[#f3f4f5] text-[#191c1d] hover:bg-[#edeeef]'
                        }`}
                      >
                        Pecho Izq.
                      </button>
                      <button
                        type="button"
                        onClick={() => setPlacement('cuff')}
                        className={`py-2 px-2 rounded-lg font-label-ui text-xs font-semibold text-center transition-all ${
                          placement === 'cuff'
                            ? 'bg-[#121316] text-white shadow-xs'
                            : 'bg-[#f3f4f5] text-[#191c1d] hover:bg-[#edeeef]'
                        }`}
                      >
                        Puño Derecho
                      </button>
                      <button
                        type="button"
                        onClick={() => setPlacement('hood')}
                        className={`py-2 px-2 rounded-lg font-label-ui text-xs font-semibold text-center transition-all ${
                          placement === 'hood'
                            ? 'bg-[#121316] text-white shadow-xs'
                            : 'bg-[#f3f4f5] text-[#191c1d] hover:bg-[#edeeef]'
                        }`}
                      >
                        Bajo Capucha
                      </button>
                    </div>
                  </div>

                  {/* Monogram Live Visualizer Box */}
                  <div className="bg-[#f3f4f5] rounded-xl p-3.5 flex items-center justify-between border border-black/5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#e1e3e4] flex items-center justify-center shadow-inner">
                        <span className={`font-headline-md text-xl tracking-wider font-bold ${
                          threadColor === 'terracota' ? 'text-[#ab3516]' : 'text-primary'
                        }`}>
                          {monogramText || 'KR'}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-ui text-xs font-bold text-primary">
                          Previsualización de Hilo {threadColor === 'terracota' ? 'Terracota' : 'Tonal'}
                        </span>
                        <span className="font-body-sm text-[11px] text-[#46464b]">
                          +2 días adicionales de confección ética
                        </span>
                      </div>
                    </div>
                    <span className="font-label-caps text-xs font-bold text-[#ab3516] tracking-widest">
                      +15,00 €
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* ================= PRIMARY PURCHASE ACTIONS ================= */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-md flex flex-col gap-4 border border-black/5">
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                {/* Add to Cart Primary Button */}
                <button 
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 py-4 px-6 rounded-lg bg-[#121316] hover:bg-[#2e3132] text-white font-label-ui text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-2.5 active:scale-[0.99]"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  <span>Añadir al Carrito — {totalPrice.toFixed(2).replace('.', ',')} €</span>
                </button>

                {/* Wishlist Secondary Button */}
                <button 
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  aria-label="Añadir a lista de deseos"
                  className={`p-4 rounded-lg transition-all flex items-center justify-center gap-2 group ${
                    isWishlisted 
                      ? 'bg-[#ffdad2] text-[#ab3516]' 
                      : 'bg-[#f3f4f5] hover:bg-[#edeeef] text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {isWishlisted ? 'favorite' : 'favorite_border'}
                  </span>
                  <span className="hidden sm:inline font-label-caps text-xs font-bold">2.4K</span>
                </button>
              </div>

              {/* Free Shipping & Reassurance Note */}
              <div className="flex items-center gap-2 text-[#46464b] pt-1 justify-center sm:justify-start">
                <span className="material-symbols-outlined text-[#ab3516] text-[18px]">verified_user</span>
                <span className="font-body-sm text-xs font-medium">
                  Garantía KURA: Cambios de talla gratis en 48 horas sin papeleo.
                </span>
              </div>

              {/* Animated Confirmation Toast */}
              {showToast && (
                <div className="bg-[#bceecf] text-[#002112] p-3 rounded-lg flex items-center justify-between shadow-xs animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    <span className="font-label-ui text-xs font-bold">
                      ¡Añadido con éxito! Hoodie personalizado reservado por 15 min.
                    </span>
                  </div>
                  <button 
                    onClick={() => onNavigate('cart')}
                    className="font-label-caps text-xs uppercase font-bold underline"
                  >
                    Ver Carrito
                  </button>
                </div>
              )}
            </div>

            {/* ================= ACCORDIONS: Clean Information Architecture ================= */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-md flex flex-col gap-2 border border-black/5">
              
              {/* Accordion 1 */}
              <div className="rounded-xl bg-[#f3f4f5] overflow-hidden transition-all border border-black/5">
                <button 
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
                  className="w-full p-4 flex items-center justify-between text-left font-title-sm text-sm text-primary font-bold"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#46464b]">texture</span>
                    Especificaciones Técnicas (450 GSM)
                  </span>
                  <span className={`material-symbols-outlined transition-transform duration-200 ${openAccordion === 1 ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                {openAccordion === 1 && (
                  <div className="px-4 pb-4 text-[#46464b] font-body-sm text-xs flex flex-col gap-2 border-t border-[#edeeef] pt-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="font-label-caps text-[10px] uppercase text-black font-bold">Gramaje</span>
                        <span>450 GSM Heavyweight Fleece</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-caps text-[10px] uppercase text-black font-bold">Composición</span>
                        <span>100% Algodón Peinado Orgánico</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-caps text-[10px] uppercase text-black font-bold">Tratamiento</span>
                        <span>Lavado a la piedra pre-encogido</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-caps text-[10px] uppercase text-black font-bold">Corte</span>
                        <span>Boxy / Hombro Caído Estructurado</span>
                      </div>
                    </div>
                    <p className="pt-1 text-[11px] leading-relaxed">
                      Capucha de doble capa sin cordones para estética limpia. Remates de canalé 2x2 de alta elasticidad que no se deforman con el uso continuado.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 2 */}
              <div className="rounded-xl bg-[#f3f4f5] overflow-hidden transition-all border border-black/5">
                <button 
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
                  className="w-full p-4 flex items-center justify-between text-left font-title-sm text-sm text-primary font-bold"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#46464b]">eco</span>
                    Producción Ética en Portugal & Sostenibilidad
                  </span>
                  <span className={`material-symbols-outlined transition-transform duration-200 ${openAccordion === 2 ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                {openAccordion === 2 && (
                  <div className="px-4 pb-4 text-[#46464b] font-body-sm text-xs flex flex-col gap-2 border-t border-[#edeeef] pt-3">
                    <p className="leading-relaxed">
                      Tejido, confeccionado y teñido a menos de 40 km de Braga, Portugal. Nuestros talleres certificados por OEKO-TEX® Standard 100 operan con un 85% de energía solar y circuitos cerrados de reciclaje de agua para tintura sostenible.
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="bg-[#e1e3e4] px-2 py-1 rounded text-primary font-label-caps text-[9px] font-bold">
                        GOTS CERTIFIED
                      </span>
                      <span className="bg-[#e1e3e4] px-2 py-1 rounded text-primary font-label-caps text-[9px] font-bold">
                        CARBON NEUTRAL SHIP
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3 */}
              <div className="rounded-xl bg-[#f3f4f5] overflow-hidden transition-all border border-black/5">
                <button 
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
                  className="w-full p-4 flex items-center justify-between text-left font-title-sm text-sm text-primary font-bold"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#46464b]">sync_alt</span>
                    Envíos, Devoluciones y Garantía 30 Días
                  </span>
                  <span className={`material-symbols-outlined transition-transform duration-200 ${openAccordion === 3 ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                {openAccordion === 3 && (
                  <div className="px-4 pb-4 text-[#46464b] font-body-sm text-xs flex flex-col gap-2 border-t border-[#edeeef] pt-3">
                    <p className="leading-relaxed">
                      Envío gratuito para toda la península ibérica e islas en pedidos superiores a 80€. Preparación en 24 horas laborables.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-[11px]">
                      <li>España peninsular: 24/48 horas vía DHL Express.</li>
                      <li>Unión Europea: 3 a 5 días laborables.</li>
                      <li>Devoluciones y cambios de talla gratuitos desde tu domicilio sin imprimir etiquetas.</li>
                    </ul>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* ================= FLOATING GLASS NOTIFICATION FOOTER ================= */}
        <div className="mt-8 bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 border border-black/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#ffdad2] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#891d00] text-[24px]">verified</span>
            </div>
            <div>
              <h2 className="font-headline-md text-lg text-primary font-bold">
                Compromiso KURA de Durabilidad Textil
              </h2>
              <p className="font-body-sm text-xs text-[#46464b]">
                Cada sudadera 450GSM incluye 2 años de garantía de costura y reposición de piezas estructurales.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button 
              type="button" 
              onClick={() => onNavigate('sostenibilidad')}
              className="px-4 py-2.5 rounded-lg bg-[#f3f4f5] text-primary hover:bg-[#edeeef] font-label-ui text-xs font-semibold transition-colors"
            >
              Leer Manifiesto
            </button>
            <a 
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-lg bg-[#121316] text-white font-label-ui text-xs font-bold hover:bg-[#2e3132] transition-colors"
            >
              Contactar con Atelier
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
