import React from 'react';
import { CartItem } from '../types';

interface CartDeleteModalProps {
  item: CartItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: (itemId: string) => void;
  onSaveToWishlist: (item: CartItem) => void;
}

export const CartDeleteModal: React.FC<CartDeleteModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirmDelete,
  onSaveToWishlist,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#121316]/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md p-6 sm:p-8 rounded-xl bg-white shadow-2xl flex flex-col gap-5 border border-black/5">
        
        {/* Warning Icon */}
        <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
          <span className="material-symbols-outlined text-[28px]">delete_forever</span>
        </div>

        {/* Content */}
        <div>
          <h4 className="font-headline-md text-xl text-primary font-bold">
            ¿Retirar prenda del carrito?
          </h4>
          <p className="font-body-md text-xs text-[#46464b] mt-2 leading-relaxed">
            Estás a punto de liberar tu reserva de <strong className="text-black font-semibold">&quot;{item.name}&quot;</strong>. ¿Prefieres guardarlo en tu lista de deseos para asegurar tu talla más adelante?
          </p>
        </div>

        {/* Actions Grid */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <button 
            type="button"
            onClick={() => {
              onSaveToWishlist(item);
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-lg bg-[#f3f4f5] hover:bg-[#edeeef] text-primary font-label-ui text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">bookmark</span>
            <span>Mover a Deseos</span>
          </button>
          
          <button 
            type="button"
            onClick={() => {
              onConfirmDelete(item.id);
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-lg bg-[#ba1a1a] text-white font-label-ui text-xs font-bold hover:bg-[#93000a] transition-all text-center"
          >
            Sí, Eliminar
          </button>
        </div>

        <button 
          type="button"
          onClick={onClose}
          className="font-label-ui text-xs text-[#76777b] hover:text-black text-center pt-1"
        >
          Cancelar y Mantener en Bolsa
        </button>

      </div>
    </div>
  );
};
