import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  total,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<2 | 3 | 4>(2);
  const [fullName, setFullName] = useState('Carlos Arronte');
  const [email, setEmail] = useState('carlos@kura-studio.com');
  const [address, setAddress] = useState('Passeig de Gràcia 42, 3º 1ª');
  const [city, setCity] = useState('Barcelona');
  const [postalCode, setPostalCode] = useState('08007');
  const [country, setCountry] = useState('España');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'klarna'>('apple_pay');
  const [processing, setProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setOrderNumber(`KR-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep(4); // Order Confirmed
      onOrderSuccess();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#121316]/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget && step !== 4) onClose(); }}
    >
      <div className="w-full max-w-xl p-6 sm:p-8 rounded-2xl bg-white shadow-2xl flex flex-col gap-6 border border-black/5 max-h-[92vh] overflow-y-auto">
        
        {/* Stepper Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#edeeef]">
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-xs px-2.5 py-1 rounded-full bg-[#f3f4f5] text-black font-bold">
              PASO {step < 4 ? step : '✓'} DE 3
            </span>
            <span className="font-headline-md text-base text-primary font-bold">
              {step === 2 && 'Datos de Envío Express'}
              {step === 3 && 'Pasarela de Pago Seguro PSD2'}
              {step === 4 && '¡Pedido Confirmado!'}
            </span>
          </div>
          {step !== 4 && (
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f3f4f5] flex items-center justify-center text-[#76777b] hover:text-black transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* STEP 2: SHIPPING */}
        {step === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="flex flex-col gap-4">
            <div className="p-3.5 bg-[#f3f4f5] rounded-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-[#224f39] text-[22px]">eco</span>
              <div>
                <span className="font-label-ui text-xs font-bold text-black block">DHL Express Neutro en Carbono</span>
                <span className="text-[11px] text-[#46464b]">Entrega 24/48h garantizada desde Oporto/Barcelona</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="font-label-caps text-[10px] uppercase text-[#76777b]">Nombre Completo</label>
                <input 
                  type="text" 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="px-3 py-2.5 rounded-lg bg-[#f8f9fa] border border-black/10 text-xs font-body-md focus:border-black focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="font-label-caps text-[10px] uppercase text-[#76777b]">Email para Seguimiento</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-2.5 rounded-lg bg-[#f8f9fa] border border-black/10 text-xs font-body-md focus:border-black focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="font-label-caps text-[10px] uppercase text-[#76777b]">Dirección de Entrega</label>
                <input 
                  type="text" 
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="px-3 py-2.5 rounded-lg bg-[#f8f9fa] border border-black/10 text-xs font-body-md focus:border-black focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-[10px] uppercase text-[#76777b]">Ciudad</label>
                <input 
                  type="text" 
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="px-3 py-2.5 rounded-lg bg-[#f8f9fa] border border-black/10 text-xs font-body-md focus:border-black focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-[10px] uppercase text-[#76777b]">Código Postal</label>
                <input 
                  type="text" 
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="px-3 py-2.5 rounded-lg bg-[#f8f9fa] border border-black/10 text-xs font-body-md focus:border-black focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-[#edeeef]">
              <span className="font-title-sm text-sm text-primary">Total: <strong>{total.toFixed(2).replace('.', ',')}€</strong></span>
              <button 
                type="submit"
                className="py-3 px-6 bg-[#121316] text-white font-label-ui text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-[#2e3132] transition-all"
              >
                Continuar al Pago
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: PAYMENT METHOD */}
        {step === 3 && (
          <form onSubmit={handlePay} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-[10px] uppercase text-[#76777b]">Selecciona Método de Pago</label>
              
              <div 
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'apple_pay'
                    ? 'border-black bg-[#f3f4f5] ring-1 ring-black'
                    : 'border-black/10 hover:bg-[#f8f9fa]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">phone_iphone</span>
                  <span className="font-label-ui text-xs font-bold text-black">Apple Pay / Google Pay</span>
                </div>
                <span className="font-label-caps text-[10px] px-2 py-0.5 rounded bg-black text-white font-bold">1-CLIC</span>
              </div>

              <div 
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-black bg-[#f3f4f5] ring-1 ring-black'
                    : 'border-black/10 hover:bg-[#f8f9fa]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">credit_card</span>
                  <span className="font-label-ui text-xs font-bold text-black">Tarjeta de Crédito / Débito (Visa, MC)</span>
                </div>
                <span className="font-label-caps text-[10px] text-[#76777b]">3DS SECURE</span>
              </div>

              <div 
                onClick={() => setPaymentMethod('klarna')}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'klarna'
                    ? 'border-black bg-[#ffdad2]/30 ring-1 ring-[#ab3516]'
                    : 'border-black/10 hover:bg-[#f8f9fa]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-[#ab3516]">payments</span>
                  <span className="font-label-ui text-xs font-bold text-black">Klarna: Paga en 3 plazos de {(total / 3).toFixed(2).replace('.', ',')}€</span>
                </div>
                <span className="font-label-caps text-[10px] px-2 py-0.5 rounded bg-[#ffdad2] text-[#891d00] font-bold">0% TAE</span>
              </div>
            </div>

            {/* Simulated Card input if card chosen */}
            {paymentMethod === 'card' && (
              <div className="p-3 bg-[#f8f9fa] rounded-lg border border-black/5 flex flex-col gap-2">
                <input 
                  type="text" 
                  placeholder="Número de tarjeta: 4532 •••• •••• 8821" 
                  defaultValue="4532 9812 3421 8821"
                  className="px-3 py-2 bg-white rounded border border-black/10 text-xs font-body-md"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    placeholder="MM/AA" 
                    defaultValue="10/28"
                    className="px-3 py-2 bg-white rounded border border-black/10 text-xs font-body-md text-center"
                  />
                  <input 
                    type="text" 
                    placeholder="CVC" 
                    defaultValue="482"
                    className="px-3 py-2 bg-white rounded border border-black/10 text-xs font-body-md text-center"
                  />
                </div>
              </div>
            )}

            {/* Total breakdown */}
            <div className="p-3.5 bg-[#f3f4f5] rounded-xl flex flex-col gap-1.5 text-xs">
              <div className="flex justify-between text-[#46464b]">
                <span>Artículos ({cartItems.length}):</span>
                <span>{total.toFixed(2).replace('.', ',')}€</span>
              </div>
              <div className="flex justify-between text-[#224f39] font-semibold">
                <span>Envío express DHL (Península):</span>
                <span>GRATIS</span>
              </div>
              <div className="pt-2 border-t border-[#edeeef] flex justify-between font-bold text-base text-black">
                <span>Total a Pagar:</span>
                <span>{total.toFixed(2).replace('.', ',')}€</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                onClick={() => setStep(2)}
                className="py-3 px-5 bg-[#edeeef] text-black font-label-ui text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-[#e7e8e9]"
              >
                Volver
              </button>
              <button 
                type="submit"
                disabled={processing}
                className="flex-1 py-3.5 bg-[#121316] text-white font-label-ui text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-[#2e3132] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                    <span>Procesando pago seguro...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    <span>Pagar {total.toFixed(2).replace('.', ',')}€</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: ORDER CONFIRMED */}
        {step === 4 && (
          <div className="flex flex-col items-center text-center gap-5 py-4">
            <div className="w-16 h-16 rounded-full bg-[#bceecf] text-[#002112] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>
            
            <div>
              <span className="font-label-caps text-xs text-[#224f39] uppercase font-bold tracking-widest">
                ¡Gracias por tu pedido en KURA STUDIO!
              </span>
              <h3 className="font-headline-md text-2xl text-primary font-bold mt-1">
                Pedido {orderNumber}
              </h3>
              <p className="font-body-md text-xs text-[#46464b] max-w-sm mx-auto mt-2 leading-relaxed">
                Hemos enviado la confirmación y el comprobante de trazabilidad textil al email <strong>{email}</strong>.
              </p>
            </div>

            <div className="w-full p-4 rounded-xl bg-[#f8f9fa] border border-black/5 text-left text-xs flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[#76777b]">Destino:</span>
                <span className="font-semibold text-black">{address}, {city}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#76777b]">Transportista:</span>
                <span className="font-semibold text-black">DHL Express Neutro en Carbono</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#76777b]">Entrega Estimada:</span>
                <span className="font-semibold text-[#224f39]">24/48 Horas Laborables</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={onClose}
              className="w-full py-3.5 bg-[#121316] text-white font-label-ui text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-[#2e3132] transition-all"
            >
              Volver a la Colección
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
