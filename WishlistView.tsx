import React from 'react';
import { Product, CartItem, ActiveScreen } from '../types';

interface WishlistViewProps {
  wishlistIds: string[];
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onAddToCart: (item: CartItem) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onNavigate: (screen: ActiveScreen) => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlistIds,
  products,
  onSelectProduct,
  onAddToCart,
  onRemoveFromWishlist,
  onNavigate,
}) => {
  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));

  const handleMoveToCart = (product: Product) => {
    const item: CartItem = {
      id: `${product.id}-L-${Date.now()}`,
      productId: product.id,
      sku: product.sku,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      image: product.images[0]?.url || '',
      weightGsm: product.weightGsm,
      size: 'L (Boxy Oversize)',
      colorName: product.colors[0]?.name || 'Washed Slate',
      colorHex: product.colors[0]?.hex || '#4A4D52',
      quantity: 1,
      stockNote: 'Pieza transferida desde tu lista de deseos'
    };
    onAddToCart(item);
    onRemoveFromWishlist(product.id);
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[80vh] py-10">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 flex flex-col gap-8">
        
        <div className="flex flex-col gap-1">
          <span className="font-label-caps text-xs uppercase tracking-widest text-[#ab3516] font-bold">
            Tu Selección Guardada
          </span>
          <h1 className="font-headline-lg text-3xl sm:text-4xl text-primary font-bold">
            Lista de Deseos ({wishlistedProducts.length})
          </h1>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="p-12 rounded-2xl bg-white shadow-xs text-center flex flex-col items-center gap-4 border border-black/5">
            <span className="material-symbols-outlined text-[48px] text-[#c7c6cb]">favorite_border</span>
            <h3 className="font-headline-md text-xl text-primary font-bold">No tienes piezas guardadas</h3>
            <p className="font-body-sm text-xs text-[#46464b] max-w-sm">
              Haz clic en el icono de corazón en cualquier producto para guardarlo aquí y asegurar tu talla más tarde.
            </p>
            <button 
              onClick={() => onNavigate('home')}
              className="mt-2 py-3 px-6 bg-[#121316] text-white font-label-ui text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-[#2e3132] transition-all shadow-md"
            >
              Explorar Colección
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map(product => (
              <div 
                key={product.id}
                className="group rounded-2xl bg-white p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-black/5"
              >
                <div>
                  <div 
                    onClick={() => onSelectProduct(product.id)}
                    className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#edeeef] relative cursor-pointer"
                  >
                    <img 
                      src={product.images[0]?.url} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromWishlist(product.id);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 text-[#ba1a1a] flex items-center justify-center hover:bg-[#ffdad6] shadow-xs"
                      title="Quitar de deseos"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>

                  <span className="font-label-caps text-[9px] text-[#76777b] uppercase tracking-wider block mt-3 font-bold">
                    {product.sku} • {product.weightGsm} GSM
                  </span>
                  <h3 
                    onClick={() => onSelectProduct(product.id)}
                    className="font-title-sm text-sm text-primary font-bold mt-0.5 cursor-pointer hover:underline"
                  >
                    {product.name}
                  </h3>
                  <span className="font-headline-md text-sm font-bold text-primary block mt-1">
                    {product.price},00€
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-[#edeeef]">
                  <button 
                    type="button"
                    onClick={() => handleMoveToCart(product)}
                    className="w-full py-2.5 bg-[#121316] hover:bg-[#2e3132] text-white rounded-lg font-label-ui text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                    <span>Mover a la Bolsa</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
