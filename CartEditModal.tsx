import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartEditModalProps {
  item: CartItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (itemId: string, newSize: string, newColor: string, newColorHex: string) => void;
}

export const CartEditModal: React.FC<CartEditModalProps> = ({
  item,
  isOpen,
  onClose,
  onSave,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [selectedColor, setSelectedColor] = useState<string>('Washed Slate');
  const [selectedHex, setSelectedHex] = useState<string>('#4A4D52');

  React.useEffect(() => {
    if (item) {
      setSelectedSize(item.size.split(' ')[0] || 'L');
      setSelectedColor(item.colorName);
      setSelectedHex(item.colorHex);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleConfirm = () => {
    const formattedSize = `${selectedSize} (${selectedSize === 'L' ? 'Boxy Oversize' : 'Regular Arch'})`;
    onSave(item.id, formattedSize, selectedColor, selectedHex);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#121316]/50 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-lg p-6 sm:p-8 rounded-xl bg-white shadow-2xl flex flex-col gap-6 border border-black/5">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#edeeef] pb-4">
          <div>
            <span className="font-label-caps text-[10px] uppercase text-[#76777b] tracking-wider block mb-1">
              Ajuste Inmediato en Inventario
            </span>
            <h4 className="font-headline-md text-xl text-primary font-bold">
              Modificar {item.name}
            </h4>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#f3f4f5] text-[#76777b] hover:text-black transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Size Selection */}
        <div className="flex flex-col gap-2">
          <label className="font-label-caps text-xs uppercase text-black font-bold tracking-wider">
            Selecciona Nueva Talla
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['S', 'M', 'L', 'XL'].map((s) => (
              <button 
                key={s}
                type="button"
                onClick={() => setSelectedSize(s)}
                className={`py-3 rounded-lg font-label-ui text-xs font-semibold transition-all ${
                  selectedSize === s
                    ? 'bg-[#121316] text-white shadow-sm'
                    : 'bg-[#f3f4f5] text-[#191c1d] hover:bg-[#edeeef]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Color Tonalities */}
        <div className="flex flex-col gap-2">
          <label className="font-label-caps text-xs uppercase text-black font-bold tracking-wider">
            Tonalidad Textil
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div 
              onClick={() => {
                setSelectedColor('Washed Slate');
                setSelectedHex('#4A4D52');
              }}
              className={`p-3 rounded-lg flex items-center gap-2.5 cursor-pointer transition-all ${
                selectedColor === 'Washed Slate'
                  ? 'bg-[#f3f4f5] ring-2 ring-black'
                  : 'bg-[#f8f9fa] border border-black/5 hover:bg-[#f3f4f5]'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-[#4A4D52] shadow-inner"></span>
              <span className="font-label-ui text-xs font-medium text-black">Washed Slate</span>
            </div>

            <div 
              onClick={() => {
                setSelectedColor('Raw Sand');
                setSelectedHex('#E5DFD4');
              }}
              className={`p-3 rounded-lg flex items-center gap-2.5 cursor-pointer transition-all ${
                selectedColor === 'Raw Sand'
                  ? 'bg-[#f3f4f5] ring-2 ring-black'
                  : 'bg-[#f8f9fa] border border-black/5 hover:bg-[#f3f4f5]'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-[#E5DFD4] shadow-inner"></span>
              <span className="font-label-ui text-xs font-medium text-black">Raw Sand</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button 
          onClick={handleConfirm}
          className="w-full py-3.5 rounded-lg bg-[#121316] text-white font-label-ui text-xs uppercase tracking-wider font-bold hover:bg-[#2e3132] transition-all shadow-md mt-2"
          type="button"
        >
          Actualizar Prenda
        </button>

      </div>
    </div>
  );
};
