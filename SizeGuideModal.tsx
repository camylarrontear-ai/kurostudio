import React from 'react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: string) => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectSize,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#121316]/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-xl max-w-xl w-full p-6 sm:p-8 shadow-2xl flex flex-col gap-6 border border-black/5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#edeeef] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#ab3516] text-[24px]">straighten</span>
            <div>
              <h2 className="font-headline-md text-xl text-primary font-bold">
                Tabla de Medidas Anatómicas (cm)
              </h2>
              <span className="font-label-caps text-[10px] text-[#46464b] uppercase tracking-wider">
                Patronaje Boxy 450GSM Drop Shoulder
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f3f4f5] flex items-center justify-center text-[#191c1d] hover:bg-[#edeeef] transition-colors"
            type="button"
            aria-label="Cerrar modal"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Narrative Description */}
        <p className="font-body-sm text-xs text-[#46464b] leading-relaxed">
          Medidas tomadas en plano. Nuestra silueta Boxy posee 4 cm adicionales de holgura en pecho y hombros respecto a un corte estándar europeo para permitir caída pesada sin tensión.
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-xs">
            <thead>
              <tr className="bg-[#f3f4f5] text-primary font-label-caps text-[10px] uppercase">
                <th className="p-3 rounded-l">Talla</th>
                <th className="p-3">Pecho (A)</th>
                <th className="p-3">Largo (B)</th>
                <th className="p-3">Manga (C)</th>
                <th className="p-3 rounded-r">Recomendación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edeeef]">
              <tr className="hover:bg-[#f8f9fa] transition-colors">
                <td className="p-3 font-bold text-primary">XS</td>
                <td className="p-3">58 cm</td>
                <td className="p-3">64 cm</td>
                <td className="p-3">56 cm</td>
                <td className="p-3 text-[11px] text-[#46464b]">&lt; 1,68 m · &lt; 62 kg</td>
              </tr>
              <tr className="hover:bg-[#f8f9fa] transition-colors">
                <td className="p-3 font-bold text-primary">S</td>
                <td className="p-3">61 cm</td>
                <td className="p-3">66 cm</td>
                <td className="p-3">58 cm</td>
                <td className="p-3 text-[11px] text-[#46464b]">1,68 - 1,75 m · 62-70 kg</td>
              </tr>
              <tr className="hover:bg-[#f8f9fa] transition-colors">
                <td className="p-3 font-bold text-primary">M</td>
                <td className="p-3">64 cm</td>
                <td className="p-3">68 cm</td>
                <td className="p-3">60 cm</td>
                <td className="p-3 text-[11px] text-[#46464b]">1,75 - 1,82 m · 70-76 kg</td>
              </tr>
              <tr className="bg-[#e7e8e9]/70 font-semibold text-primary">
                <td className="p-3 font-bold text-[#ab3516] flex items-center gap-1">
                  <span>L</span>
                  <span className="font-label-caps text-[9px] bg-white px-1.5 py-0.5 rounded text-[#ab3516]">Modelo</span>
                </td>
                <td className="p-3">67 cm</td>
                <td className="p-3">70 cm</td>
                <td className="p-3">62 cm</td>
                <td className="p-3 text-[11px] font-bold text-primary">1,82 - 1,89 m · 76-85 kg</td>
              </tr>
              <tr className="hover:bg-[#f8f9fa] transition-colors">
                <td className="p-3 font-bold text-primary">XL</td>
                <td className="p-3">70 cm</td>
                <td className="p-3">72 cm</td>
                <td className="p-3">64 cm</td>
                <td className="p-3 text-[11px] text-[#46464b]">1,88 - 1,96 m · 85-95 kg</td>
              </tr>
              <tr className="hover:bg-[#f8f9fa] transition-colors">
                <td className="p-3 font-bold text-primary">XXL</td>
                <td className="p-3">73 cm</td>
                <td className="p-3">74 cm</td>
                <td className="p-3">65 cm</td>
                <td className="p-3 text-[11px] text-[#46464b]">&gt; 1,95 m · &gt; 95 kg</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom Note & Action */}
        <div className="bg-[#f3f4f5] p-3.5 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#ab3516]">help_outline</span>
            <span className="font-body-sm text-xs text-[#191c1d]">
              ¿Dudas entre dos tallas? Selecciona la menor para un look contemporáneo ajustado.
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#121316] text-white font-label-caps text-xs uppercase rounded-lg font-bold hover:bg-[#2e3132] transition-colors shrink-0"
            type="button"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
