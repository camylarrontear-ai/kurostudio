import React, { useState } from 'react';
import { CartItem } from '../types';

interface CustomStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const CustomStudioModal: React.FC<CustomStudioModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [monogram, setMonogram] = useState('KR');
  const [threadColor, setThreadColor] = useState<'tonal' | 'terracota'>('tonal');
  const [placement, setPlacement] = useState<'chest' | 'cuff' | 'hood'>('chest');
  const [baseColor, setBaseColor] = useState<'slate' | 'sand'>('slate');
  const [size, setSize] = useState('L');
  const [added, setAdded] = useState(false);

  if (!isOpen) return null;

  const handleMonogramChange = (val: string) => {
    const clean = val.toUpperCase().slice(0, 3);
    setMonogram(clean);
  };

  const handleConfirm = () => {
    const customItem: CartItem = {
      id: `custom-${Date.now()}`,
      productId: '04-atelier-custom-hoodie',
      sku: 'KR-LAB-001',
      name: '04 // Atelier Custom Hoodie',
      subtitle: `DROP 04 / ATELIER LAB (${placement === 'chest' ? 'Pecho Izq.' : placement === 'cuff' ? 'Puño Derecho' : 'Bajo Capucha'})`,
      price: 105,
      image: baseColor === 'slate'
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpyFesvt24MwAji3puF3uGBr5zQRqlk1_mZneRNnyb4AAdjDtVVPwqwUoFL2cPPLncb9yboJ-pH2EZIWrDmcx-2YWSV2u36xYbK3dpv_Yzjm1dYebGZoU6Or9umJ5bfBFxiQxzweYvXz4rhV-TTNMtDLTnsJY6BTlzr6TRklDQHF63Pwagb9el9tqRTPQ-gJmse8ehlClTVs3NUuJJZAoI7zfi8TOt1_Mq7xIWdooc3ma64NNuI_XB'
        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoQBCvfwlTIDOLatTRvbydpRlfvNlW1mqAurrvrBCjzvCBhMFMI499eR9leAoo9bc0XypcPStGdjEFwYj5qB_OOAWOXa85R2L9fBWdjqDi0XP1q6dEQnVxIwl38qlUJiz1lP20uU7lpQ9lVJbkUEh-1OgmtRaAyKDRNdW8dDvTSIZ3UGgTBP_svsAuSMVih6mODKIxGQhDpLzNvfrp8ZmqjZ9c9yx41Jvg7mnAnFXe1FiT0IbbbI4P',
      weightGsm: 450,
      size: `${size} (Boxy Fit)`,
      colorName: baseColor === 'slate' ? 'Washed Slate' : 'Raw Sand',
      colorHex: baseColor === 'slate' ? '#4A4D52' : '#E5DFD4',
      customization: {
        enabled: true,
        monogram: monogram || 'KR',
        threadColor,
        placement,
        extraPrice: 10
      },
      quantity: 1,
      stockNote: 'Confección artesanal individualizada en taller de Oporto'
    };

    onAddToCart(customItem);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const getPlacementLabel = () => {
    switch (placement) {
      case 'chest': return 'Pecho Izq.';
      case 'cuff': return 'Puño Derecho';
      case 'hood': return 'Bajo Capucha';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#121316]/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto border border-black/5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#edeeef]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ffdad2] text-[#ab3516] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">tune</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-md text-xl text-primary uppercase font-bold">
                  KURA Atelier Custom Studio
                </h3>
                <span className="font-label-caps text-[9px] bg-[#ab3516] text-white px-2 py-0.5 rounded font-bold">
                  LAB 3D
                </span>
              </div>
              <span className="font-body-sm text-xs text-[#46464b]">
                Bordado artesanal de alta densidad en taller de Oporto
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f3f4f5] flex items-center justify-center text-[#191c1d] hover:bg-[#edeeef] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          
          {/* Left Controls (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            
            {/* Base Fabric Color */}
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs text-[#191c1d] uppercase font-bold tracking-wider">
                1. Selecciona Tonalidad Base (450 GSM)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBaseColor('slate')}
                  className={`p-3 rounded-lg border flex items-center gap-2.5 transition-all ${
                    baseColor === 'slate'
                      ? 'border-black bg-[#f3f4f5] ring-1 ring-black'
                      : 'border-black/10 hover:bg-[#f8f9fa]'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-[#4A4D52] shadow-inner"></span>
                  <div className="text-left">
                    <span className="block font-label-ui text-xs font-bold text-black">Washed Slate</span>
                    <span className="text-[10px] text-[#76777b]">Lavado mineral</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setBaseColor('sand')}
                  className={`p-3 rounded-lg border flex items-center gap-2.5 transition-all ${
                    baseColor === 'sand'
                      ? 'border-black bg-[#f3f4f5] ring-1 ring-black'
                      : 'border-black/10 hover:bg-[#f8f9fa]'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-[#E5DFD4] shadow-inner"></span>
                  <div className="text-left">
                    <span className="block font-label-ui text-xs font-bold text-black">Raw Sand</span>
                    <span className="text-[10px] text-[#76777b]">Crudo orgánico</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Monogram Input */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="font-label-caps text-xs text-[#191c1d] uppercase font-bold tracking-wider">
                  2. Iniciales Monograma (Máximo 3)
                </label>
                <span className="font-label-caps text-[10px] text-[#76777b]">
                  {monogram.length}/3 CARACTERES
                </span>
              </div>
              <input 
                type="text"
                value={monogram}
                onChange={(e) => handleMonogramChange(e.target.value)}
                maxLength={3}
                placeholder="KR"
                className="w-full bg-[#f3f4f5] border border-black/10 rounded-lg px-4 py-3 text-center uppercase tracking-widest font-headline-md text-2xl text-black focus:outline-none focus:border-black"
              />
            </div>

            {/* Thread Choice */}
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs text-[#191c1d] uppercase font-bold tracking-wider">
                3. Tono del Hilo
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setThreadColor('tonal')}
                  className={`p-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                    threadColor === 'tonal'
                      ? 'border-black bg-[#f3f4f5] ring-1 ring-black'
                      : 'border-black/10 hover:bg-[#f8f9fa]'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#52555a]"></span>
                  <span className="font-label-ui text-xs font-semibold text-black">Tonal Discreto</span>
                </button>

                <button
                  type="button"
                  onClick={() => setThreadColor('terracota')}
                  className={`p-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                    threadColor === 'terracota'
                      ? 'border-[#ab3516] bg-[#ffdad2]/30 ring-1 ring-[#ab3516]'
                      : 'border-black/10 hover:bg-[#f8f9fa]'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ab3516]"></span>
                  <span className="font-label-ui text-xs font-semibold text-black">Terracota KURA</span>
                </button>
              </div>
            </div>

            {/* Placement */}
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs text-[#191c1d] uppercase font-bold tracking-wider">
                4. Ubicación del Bordado
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPlacement('chest')}
                  className={`py-2 px-3 rounded-lg text-xs font-label-ui text-center transition-all ${
                    placement === 'chest'
                      ? 'bg-[#121316] text-white font-bold'
                      : 'bg-[#f3f4f5] text-[#191c1d] hover:bg-[#edeeef]'
                  }`}
                >
                  Pecho Izq.
                </button>
                <button
                  type="button"
                  onClick={() => setPlacement('cuff')}
                  className={`py-2 px-3 rounded-lg text-xs font-label-ui text-center transition-all ${
                    placement === 'cuff'
                      ? 'bg-[#121316] text-white font-bold'
                      : 'bg-[#f3f4f5] text-[#191c1d] hover:bg-[#edeeef]'
                  }`}
                >
                  Puño Derecho
                </button>
                <button
                  type="button"
                  onClick={() => setPlacement('hood')}
                  className={`py-2 px-3 rounded-lg text-xs font-label-ui text-center transition-all ${
                    placement === 'hood'
                      ? 'bg-[#121316] text-white font-bold'
                      : 'bg-[#f3f4f5] text-[#191c1d] hover:bg-[#edeeef]'
                  }`}
                >
                  Bajo Capucha
                </button>
              </div>
            </div>

            {/* Size */}
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs text-[#191c1d] uppercase font-bold tracking-wider">
                5. Talla (Corte Boxy)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['S', 'M', 'L', 'XL'].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`py-2 rounded-lg text-xs font-label-ui font-semibold transition-all ${
                      size === s
                        ? 'bg-[#121316] text-white'
                        : 'bg-[#f3f4f5] text-[#191c1d] hover:bg-[#edeeef]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Live Visualizer (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6 bg-[#f8f9fa] p-6 rounded-xl border border-black/5">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-inner flex items-center justify-center bg-[#edeeef]">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoQBCvfwlTIDOLatTRvbydpRlfvNlW1mqAurrvrBCjzvCBhMFMI499eR9leAoo9bc0XypcPStGdjEFwYj5qB_OOAWOXa85R2L9fBWdjqDi0XP1q6dEQnVxIwl38qlUJiz1lP20uU7lpQ9lVJbkUEh-1OgmtRaAyKDRNdW8dDvTSIZ3UGgTBP_svsAuSMVih6mODKIxGQhDpLzNvfrp8ZmqjZ9c9yx41Jvg7mnAnFXe1FiT0IbbbI4P"
                alt="Hoodie canvas"
                className={`w-full h-full object-cover transition-opacity duration-300 ${baseColor === 'slate' ? 'filter contrast-125 brightness-75' : ''}`}
              />

              {/* Live Overlay Badge with Real-time Monogram */}
              <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/10">
                <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl flex flex-col items-center gap-2 text-center border border-white/60">
                  <span className="font-label-caps text-[10px] text-[#46464b] uppercase tracking-widest">
                    Bordado Posición: {getPlacementLabel()}
                  </span>
                  <span 
                    className={`font-display-hero text-4xl sm:text-5xl tracking-widest font-bold ${
                      threadColor === 'terracota' ? 'text-[#ab3516]' : 'text-primary'
                    }`}
                  >
                    {monogram || 'KR'}
                  </span>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span 
                      className={`w-2 h-2 rounded-full ${threadColor === 'terracota' ? 'bg-[#ab3516]' : 'bg-[#52555a]'}`}
                    ></span>
                    <span className="font-label-caps text-[10px] text-[#46464b] uppercase font-semibold">
                      Hilo {threadColor === 'terracota' ? 'Terracota KURA' : 'Tonal Discreto'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tag handmade */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-white/90 backdrop-blur-sm shadow-xs font-label-caps text-[9px] text-primary uppercase font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#ab3516]">verified</span>
                Hecho a mano en Oporto
              </div>
            </div>

            {/* Price breakdown and Action */}
            <div className="p-4 rounded-lg bg-white shadow-xs flex flex-col gap-2">
              <div className="flex justify-between font-label-ui text-xs">
                <span className="text-[#46464b]">Base Heavyweight {baseColor === 'slate' ? 'Slate' : 'Raw Sand'}:</span>
                <span className="font-semibold text-primary">95,00 €</span>
              </div>
              <div className="flex justify-between font-label-ui text-xs">
                <span className="text-[#46464b]">Bordado 3D Táctil Atelier:</span>
                <span className="font-semibold text-[#ab3516]">+10,00 €</span>
              </div>
              <div className="pt-2 border-t border-[#edeeef] flex justify-between font-headline-md text-base text-primary font-bold">
                <span>Total Prenda Personalizada:</span>
                <span>105,00 €</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-[#edeeef] text-[#191c1d] hover:bg-[#e7e8e9] rounded-lg font-label-ui text-xs uppercase tracking-wider font-semibold transition-all text-center"
              >
                Volver
              </button>
              <button 
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-3 bg-[#121316] text-white hover:bg-[#2e3132] rounded-lg font-label-ui text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] text-[#bceecf]">check_circle</span>
                    <span>¡Añadido a la Bolsa!</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    <span>Añadir al Carrito</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
