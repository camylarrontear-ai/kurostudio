import React, { useState, useEffect } from 'react';
import { CartItem, ActiveScreen } from '../types';
import { COMPLEMENTARY_ITEMS } from '../data/products';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRequestDelete: (item: CartItem) => void;
  onRequestEdit: (item: CartItem) => void;
  onSaveForLater: (item: CartItem) => void;
  onAddComplement: (comp: typeof COMPLEMENTARY_ITEMS[0]) => void;
  onProceedToCheckout: () => void;
  onNavigate: (screen: ActiveScreen, productId?: string) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRequestDelete,
  onRequestEdit,
  onSaveForLater,
  onAddComplement,
  onProceedToCheckout,
  onNavigate,
}) => {
  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Reservation countdown timer: 14m 52s initial
  const [secondsRemaining, setSecondsRemaining] = useState(14 * 60 + 52);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} MIN`;
  };

  // Calculations
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon === 'ESTUDIANTE10' ? rawSubtotal * 0.10 : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const freeShippingThreshold = 80;
  const isFreeShipping = rawSubtotal >= freeShippingThreshold || cartItems.length > 0;
  const shippingProgress = Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'ESTUDIANTE10') {
      setAppliedCoupon('ESTUDIANTE10');
      setCouponError(null);
    } else {
      setCouponError('Código no válido. Prueba con ESTUDIANTE10');
    }
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[85vh] py-8">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 flex flex-col gap-8">
        
        {/* Stepper de Navegación UX (Don Norman: Estado y Orientación Espacial) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="font-label-caps text-xs tracking-widest text-[#76777b] uppercase block mb-1 font-bold">
              Tu Selección Actual
            </span>
            <h1 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl tracking-tight text-primary font-bold">
              Bolsa de Compra <span className="font-body-md text-base text-[#46464b] font-normal">({totalItemCount} Artículos)</span>
            </h1>
          </div>

          {/* Steps Glass Pill */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-[#edeeef]/70 backdrop-blur-md self-start md:self-auto shadow-xs border border-black/5">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121316] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fd6f4b] animate-pulse"></span>
              <span className="font-label-caps text-[10px] uppercase tracking-wider font-bold">1. Bolsa</span>
            </div>
            <span className="material-symbols-outlined text-[14px] text-[#76777b]">chevron_right</span>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full text-[#46464b]">
              <span className="font-label-caps text-[10px] uppercase tracking-wider font-semibold">2. Envío</span>
            </div>
            <span className="material-symbols-outlined text-[14px] text-[#76777b]">chevron_right</span>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full text-[#46464b]">
              <span className="font-label-caps text-[10px] uppercase tracking-wider font-semibold">3. Pago Seguro</span>
            </div>
          </div>
        </div>

        {/* Banner Glassmorphic de Progreso: Envío Express Gratuito */}
        <div className="w-full p-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 border border-black/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#bceecf] text-[#002112] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-ui text-xs font-bold text-primary">
                  ¡Tienes Envío Express Gratuito!
                </span>
                <span className="px-2 py-0.5 rounded bg-[#bceecf] text-[#002112] font-label-caps text-[9px] font-bold">
                  AHORRAS 8,50€
                </span>
              </div>
              <p className="font-body-sm text-xs text-[#46464b] mt-0.5">
                Has superado el umbral de 80€ para entregas neutras en carbono en España y Portugal peninsular.
              </p>
            </div>
          </div>

          <div className="w-full md:w-64 flex flex-col gap-1.5 shrink-0">
            <div className="flex justify-between font-label-caps text-[10px] text-primary font-bold">
              <span>80€ OBJETIVO SUPERADO</span>
              <span className="text-[#224f39]">100% COMPLETADO</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#edeeef] overflow-hidden">
              <div 
                className="h-full bg-[#224f39] rounded-full transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Layout Dividido Asimétrico: Lista de Artículos (7 Cols) vs Resumen de Pago (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= Columna Principal: Lista de Artículos ================= */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* Timer de Reserva de Stock Activo */}
            <div className="px-4 py-2.5 rounded-xl bg-[#e7e8e9]/80 backdrop-blur-sm flex items-center justify-between text-primary border border-black/5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#ab3516]">timer</span>
                <span className="font-body-sm text-xs font-semibold">
                  Tus prendas seleccionadas están reservadas en inventario
                </span>
              </div>
              <span className="font-label-caps text-xs font-bold tracking-widest px-2.5 py-0.5 rounded bg-white shadow-xs text-[#ab3516]">
                {formatTimer(secondsRemaining)}
              </span>
            </div>

            {/* Empty State */}
            {cartItems.length === 0 ? (
              <div className="p-12 rounded-2xl bg-white shadow-xs text-center flex flex-col items-center gap-4 border border-black/5">
                <span className="material-symbols-outlined text-[48px] text-[#c7c6cb]">shopping_bag</span>
                <h3 className="font-headline-md text-xl text-primary font-bold">Tu bolsa está vacía</h3>
                <p className="font-body-sm text-xs text-[#46464b] max-w-sm">
                  Explora nuestras piezas en algodón pesado de 450GSM o personaliza tu hoodie en el Atelier.
                </p>
                <button 
                  onClick={() => onNavigate('home')}
                  className="mt-2 py-3 px-6 bg-[#121316] text-white font-label-ui text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-[#2e3132] transition-all shadow-md"
                >
                  Explorar Colección
                </button>
              </div>
            ) : (
              /* Items Loop */
              cartItems.map((item) => (
                <article 
                  key={item.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white shadow-xs transition-all duration-300 border border-black/5 flex flex-col gap-4"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Fotografía de Prenda */}
                    <div 
                      onClick={() => onNavigate('pdp', item.productId)}
                      className="w-full sm:w-36 sm:h-44 rounded-xl overflow-hidden shrink-0 bg-[#edeeef] relative cursor-pointer group"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-white font-label-caps text-[9px] tracking-wider uppercase font-bold">
                        {item.weightGsm} GSM
                      </span>
                    </div>

                    {/* Información y Control de Prenda */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <span className="font-label-caps text-[10px] text-[#76777b] tracking-wider uppercase font-bold">
                              {item.subtitle}
                            </span>
                            <h2 
                              onClick={() => onNavigate('pdp', item.productId)}
                              className="font-title-sm text-sm sm:text-base text-primary font-bold hover:underline cursor-pointer"
                            >
                              {item.name}
                            </h2>
                          </div>
                          <span className="font-headline-md text-base sm:text-lg text-primary tracking-tight font-bold whitespace-nowrap">
                            {(item.price * item.quantity).toFixed(2).replace('.', ',')}€
                          </span>
                        </div>

                        {/* Atributos Seleccionados */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-2.5 py-2 px-3 rounded-lg bg-[#f8f9fa] border border-black/5">
                          <div className="flex flex-col">
                            <span className="font-label-caps text-[9px] text-[#76777b] uppercase font-bold">Talla</span>
                            <span className="font-label-ui text-xs font-bold text-primary">{item.size}</span>
                          </div>
                          
                          <div className="flex flex-col">
                            <span className="font-label-caps text-[9px] text-[#76777b] uppercase font-bold">Color</span>
                            <div className="flex items-center gap-1.5">
                              <span 
                                className="w-2.5 h-2.5 rounded-full border border-black/20"
                                style={{ backgroundColor: item.colorHex }}
                              />
                              <span className="font-label-ui text-xs font-bold text-primary">{item.colorName}</span>
                            </div>
                          </div>

                          {item.customization?.enabled ? (
                            <div className="col-span-2 sm:col-span-1 flex flex-col">
                              <span className="font-label-caps text-[9px] text-[#76777b] uppercase font-bold">Personalización</span>
                              <span className="font-label-ui text-xs font-bold text-[#ab3516]">
                                Bordado &apos;{item.customization.monogram}&apos; (+15€)
                              </span>
                            </div>
                          ) : (
                            <div className="col-span-2 sm:col-span-1 flex flex-col">
                              <span className="font-label-caps text-[9px] text-[#76777b] uppercase font-bold">Acabado</span>
                              <span className="font-label-ui text-xs font-semibold text-primary">Versión Estándar</span>
                            </div>
                          )}
                        </div>

                        {item.stockNote && (
                          <div className="flex items-center gap-1.5 text-[#224f39]">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            <span className="font-body-sm text-[11px] font-semibold">{item.stockNote}</span>
                          </div>
                        )}
                      </div>

                      {/* Controles de Cantidad y Acciones de Usuario (Norman: Prevención de Errores) */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-2 border-t border-[#edeeef]">
                        {/* Counter Táctil de Cantidad */}
                        <div className="flex items-center gap-1 p-1 rounded-lg bg-[#f3f4f5]">
                          <button 
                            type="button"
                            aria-label="Disminuir cantidad"
                            onClick={() => {
                              if (item.quantity > 1) {
                                onUpdateQuantity(item.id, -1);
                              } else {
                                onRequestDelete(item);
                              }
                            }}
                            className="w-7 h-7 rounded flex items-center justify-center text-primary hover:bg-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">remove</span>
                          </button>
                          <span className="w-7 text-center font-label-ui text-xs font-bold text-primary select-none">
                            {item.quantity}
                          </span>
                          <button 
                            type="button"
                            aria-label="Aumentar cantidad"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-7 h-7 rounded flex items-center justify-center text-primary hover:bg-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                          </button>
                        </div>

                        {/* Acciones Secundarias */}
                        <div className="flex items-center gap-3 text-[#46464b]">
                          <button 
                            type="button"
                            onClick={() => onRequestEdit(item)}
                            className="font-label-ui text-xs hover:text-black transition-colors flex items-center gap-1 font-semibold"
                          >
                            <span className="material-symbols-outlined text-[16px]">tune</span>
                            <span>Modificar</span>
                          </button>
                          <button 
                            type="button"
                            onClick={() => onSaveForLater(item)}
                            className="font-label-ui text-xs hover:text-black transition-colors flex items-center gap-1 font-semibold"
                          >
                            <span className="material-symbols-outlined text-[16px]">bookmark</span>
                            <span>Guardar para luego</span>
                          </button>
                          <button 
                            type="button"
                            onClick={() => onRequestDelete(item)}
                            title="Eliminar artículo"
                            className="font-label-ui text-xs text-[#ba1a1a]/80 hover:text-[#ba1a1a] transition-colors flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}

            {/* Banner de Garantía Arquitectónica Kura Studio */}
            <div className="p-4 rounded-xl bg-[#f3f4f5] flex items-start gap-3 text-primary border border-black/5">
              <span className="material-symbols-outlined text-[22px] text-[#121316] shrink-0">
                published_with_changes
              </span>
              <div>
                <span className="font-label-ui text-xs font-bold block">
                  Garantía Arquitectónica Kura Studio
                </span>
                <p className="font-body-sm text-xs text-[#46464b] mt-0.5 leading-relaxed">
                  Dispones de 30 días para probar la caída de la tela en tu propio espejo. Si el corte o la textura no superan tus expectativas, gestionamos la recogida gratuita en tu puerta sin cuestionamientos.
                </p>
              </div>
            </div>

          </div>

          {/* ================= Columna Lateral Sticky: Resumen Financiero Glassmorphic ================= */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-xl flex flex-col gap-4 border border-black/5">
              
              <div className="flex items-center justify-between pb-2 border-b border-[#edeeef]">
                <span className="font-headline-md text-xl text-primary font-bold">Resumen de Pedido</span>
                <span className="font-label-caps text-xs px-2.5 py-0.5 rounded-full bg-[#f3f4f5] text-[#46464b] font-bold">
                  {totalItemCount} ÍTEMS
                </span>
              </div>

              {/* Desglose de Precios */}
              <div className="flex flex-col gap-2.5 text-xs text-primary font-body-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[#46464b]">Subtotal de artículos</span>
                  <span className="font-label-ui text-xs font-bold">{rawSubtotal.toFixed(2).replace('.', ',')}€</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#46464b]">Envío Express (Península)</span>
                    <span className="material-symbols-outlined text-[15px] text-[#76777b]" title="Envío neutro en carbono por DHL Express 24/48h">info</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="line-through text-[#76777b] text-xs">8,50€</span>
                    <span className="font-label-ui text-xs font-bold text-[#224f39]">GRATIS</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[#46464b]">
                  <span>Impuestos directos (IVA 21%)</span>
                  <span>Incluido ({((rawSubtotal * 0.21) / 1.21).toFixed(2).replace('.', ',')}€)</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between items-center text-[#ab3516] bg-[#ffdad2]/30 p-2 rounded-lg font-semibold">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">sell</span>
                      <span>Descuento aplicado ({appliedCoupon} -10%)</span>
                    </div>
                    <span className="font-bold">-{discountAmount.toFixed(2).replace('.', ',')}€</span>
                  </div>
                )}
              </div>

              {/* Input Código de Descuento */}
              <div className="pt-2 border-t border-[#edeeef]">
                <label className="font-label-caps text-[10px] uppercase text-[#76777b] block mb-1 font-bold">
                  Código Promocional o Regalo
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Ej: ESTUDIANTE10"
                    className="flex-1 px-3 py-2 rounded-lg bg-[#f8f9fa] text-primary font-label-ui text-xs uppercase tracking-wider placeholder:normal-case placeholder:text-[#76777b] focus:outline-none focus:bg-white border border-black/10"
                  />
                  <button 
                    type="button"
                    onClick={() => handleApplyCoupon()}
                    className="px-4 py-2 rounded-lg bg-[#121316] text-white font-label-ui text-xs uppercase tracking-wider font-bold hover:bg-[#2e3132] transition-all"
                  >
                    Aplicar
                  </button>
                </div>

                {couponError && (
                  <span className="text-[11px] text-[#ba1a1a] block mt-1">{couponError}</span>
                )}

                <button 
                  type="button"
                  onClick={() => {
                    setCouponCode('ESTUDIANTE10');
                    setAppliedCoupon('ESTUDIANTE10');
                    setCouponError(null);
                  }}
                  className="font-body-sm text-[11px] text-[#ab3516] mt-2 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span className="material-symbols-outlined text-[14px]">local_offer</span>
                  <span>¿Eres estudiante? Usa ESTUDIANTE10 (-10%)</span>
                </button>
              </div>

              {/* Total Final */}
              <div className="pt-3 border-t border-[#edeeef] flex items-end justify-between">
                <div>
                  <span className="font-label-caps text-xs text-[#76777b] uppercase tracking-widest block font-bold">
                    Total Final
                  </span>
                  <span className="font-body-sm text-[11px] text-[#46464b]">
                    Con garantía de transporte incluida
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-headline-lg text-2xl sm:text-3xl tracking-tight text-primary font-bold">
                    {finalTotal.toFixed(2).replace('.', ',')}€
                  </span>
                </div>
              </div>

              {/* Botón CTA Principal de Conversión */}
              <button 
                type="button"
                disabled={cartItems.length === 0}
                onClick={onProceedToCheckout}
                className="w-full py-4 px-4 rounded-lg bg-[#121316] text-white font-label-ui text-xs uppercase tracking-widest font-bold hover:bg-[#2e3132] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[20px]">lock</span>
                <span>Proceder al Pago Seguro</span>
              </button>

              {/* Métodos de Pago Aceptados con Micro-distintivos */}
              <div className="flex flex-col items-center gap-2 pt-1">
                <div className="flex items-center justify-center gap-1.5 w-full flex-wrap">
                  <span className="px-2 py-1 rounded bg-[#f3f4f5] font-label-caps text-[9px] font-bold text-primary tracking-wider">
                    APPLE PAY
                  </span>
                  <span className="px-2 py-1 rounded bg-[#f3f4f5] font-label-caps text-[9px] font-bold text-primary tracking-wider">
                    GOOGLE PAY
                  </span>
                  <span className="px-2 py-1 rounded bg-[#f3f4f5] font-label-caps text-[9px] font-bold text-primary tracking-wider">
                    VISA
                  </span>
                  <span className="px-2 py-1 rounded bg-[#f3f4f5] font-label-caps text-[9px] font-bold text-primary tracking-wider">
                    MASTERCARD
                  </span>
                  <span className="px-2 py-1 rounded bg-[#ffdad2] text-[#891d00] font-label-caps text-[9px] font-bold tracking-wider">
                    KLARNA (3X SIN INTERÉS)
                  </span>
                </div>
              </div>

              {/* Micro-tarjetas de Confianza & Heurísticas de Usabilidad */}
              <div className="grid grid-cols-1 gap-2 pt-2 text-[#46464b] font-body-sm text-xs border-t border-[#edeeef]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#224f39] shrink-0">verified_user</span>
                  <span>Cifrado SSL de 256 bits y pasarela bancaria PSD2 europea</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#224f39] shrink-0">support_agent</span>
                  <span>Soporte en vivo vía WhatsApp con diseñadores de KURA (media 4 min)</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ================= Sección Inferior: 'Completa tu Conjunto' / Match Arquitectónico ================= */}
        <section className="mt-12 pt-8 border-t border-[#edeeef]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-6">
            <div>
              <span className="font-label-caps text-xs uppercase tracking-widest text-[#76777b] block mb-1 font-bold">
                Match Arquitectónico
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-primary font-bold">
                Completa tu Conjunto
              </h2>
            </div>
            <p className="font-body-sm text-xs text-[#46464b] max-w-md">
              Seleccionados por nuestro taller para emparejar la caída de peso 450GSM con proporciones simétricas.
            </p>
          </div>

          {/* Bento Grid Horizontal de Complementos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPLEMENTARY_ITEMS.map((comp) => (
              <div 
                key={comp.id}
                className="group rounded-2xl p-5 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-black/5"
              >
                <div>
                  <div className="w-full h-56 rounded-xl overflow-hidden bg-[#edeeef] mb-3 relative">
                    <img 
                      src={comp.image} 
                      alt={comp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 font-label-caps text-[9px] font-bold text-primary backdrop-blur-sm shadow-xs">
                      {comp.badge}
                    </span>
                  </div>

                  <span className="font-label-caps text-[9px] text-[#76777b] uppercase tracking-wider block font-bold">
                    {comp.category}
                  </span>
                  <h3 className="font-title-sm text-sm text-primary mt-1 font-bold">
                    {comp.name}
                  </h3>
                  <p className="font-body-sm text-xs text-[#46464b] line-clamp-2 mt-1">
                    {comp.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#edeeef]">
                  <span className="font-headline-md text-base font-bold text-primary">
                    {comp.price},00€
                  </span>
                  <button 
                    type="button"
                    onClick={() => onAddComplement(comp)}
                    className="px-4 py-2 rounded-lg bg-[#f3f4f5] hover:bg-[#121316] hover:text-white text-primary font-label-ui text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Añadir</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
