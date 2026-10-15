import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (productId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    p.sku.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    `${p.weightGsm}gsm`.toLowerCase().includes(query.toLowerCase())
  );

  const frequentSearches = [
    '#450GSM Boxy',
    'Hoodie Lavado Slate',
    'Sin Cordones Minimal',
    'Crudo Raw Sand',
    'Cremallera 500GSM'
  ];

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#121316]/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-xl max-w-2xl w-full shadow-2xl border border-black/5 overflow-hidden flex flex-col">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#edeeef] flex items-center gap-3">
          <span className="material-symbols-outlined text-[#76777b] text-[22px]">search</span>
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, gramaje (450GSM), fit o color..."
            className="flex-1 bg-transparent text-sm text-[#191c1d] placeholder:text-[#76777b] focus:outline-none font-body-md"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-[#76777b] hover:text-black rounded"
            >
              <span className="material-symbols-outlined text-[16px]">clear</span>
            </button>
          )}
          <kbd className="hidden sm:inline-block font-label-caps text-[10px] bg-[#f3f4f5] px-2 py-1 rounded border border-[#c7c6cb]/40 text-[#46464b]">
            ESC
          </kbd>
        </div>

        {/* Frequent Searches Tags */}
        <div className="px-4 py-3 bg-[#f8f9fa] border-b border-[#edeeef] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="font-label-caps text-[10px] uppercase text-[#76777b] shrink-0">Búsquedas:</span>
          {frequentSearches.map(tag => (
            <button
              key={tag}
              onClick={() => setQuery(tag.replace('#', ''))}
              className="px-2.5 py-1 rounded bg-[#edeeef] hover:bg-[#121316] hover:text-white text-[#191c1d] text-xs font-label-ui transition-all shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 flex flex-col gap-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[#76777b] text-sm">
              <span className="material-symbols-outlined text-[36px] mb-2 block text-[#c7c6cb]">search_off</span>
              No se han encontrado piezas para &quot;{query}&quot;. Intenta con &quot;450&quot;, &quot;Hoodie&quot; o &quot;Slate&quot;.
            </div>
          ) : (
            filtered.map(product => (
              <div 
                key={product.id}
                onClick={() => {
                  onSelectProduct(product.id);
                  onClose();
                }}
                className="group flex items-center justify-between p-3 rounded-lg hover:bg-[#f3f4f5] cursor-pointer transition-all border border-transparent hover:border-black/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-16 rounded overflow-hidden bg-[#e7e8e9] shrink-0">
                    <img 
                      src={product.images[0]?.url} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <span className="font-label-caps text-[10px] text-[#76777b] uppercase">{product.sku} • {product.weightGsm} GSM</span>
                    <h4 className="font-title-sm text-sm text-primary font-bold">{product.name}</h4>
                    <span className="text-xs text-[#76777b]">{product.subtitle}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-headline-md text-sm font-bold text-primary">{product.price}€</span>
                  <span className="block text-[11px] text-[#224f39] font-semibold">En Stock</span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
