import React, { useState } from 'react';
import { ActiveScreen, CartItem, Product } from './types';
import { PRODUCTS, INITIAL_CART, COMPLEMENTARY_ITEMS } from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { PdpView } from './views/PdpView';
import { CartView } from './views/CartView';
import { LookbookView } from './views/LookbookView';
import { SustainabilityView } from './views/SustainabilityView';
import { WishlistView } from './views/WishlistView';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SearchModal } from './components/SearchModal';
import { CustomStudioModal } from './components/CustomStudioModal';
import { CartEditModal } from './components/CartEditModal';
import { CartDeleteModal } from './components/CartDeleteModal';
import { CheckoutModal } from './components/CheckoutModal';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('01-heavyweight-boxy-hoodie');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    '01-heavyweight-boxy-hoodie',
    '02-raw-sand-minimalist-fleece',
    '03-studio-zip-up-500gsm',
    '04-atelier-custom-hoodie',
  ]);

  // Modals state
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCustomStudioOpen, setIsCustomStudioOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Cart item editing and deletion
  const [editingCartItem, setEditingCartItem] = useState<CartItem | null>(null);
  const [deletingCartItem, setDeletingCartItem] = useState<CartItem | null>(null);

  // Derived calculations
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavigate = (screen: ActiveScreen, productId?: string) => {
    setActiveScreen(screen);
    if (productId) {
      setSelectedProductId(productId);
      setSelectedImageIndex(0);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (productId: string, imageIndex?: number) => {
    setSelectedProductId(productId);
    setSelectedImageIndex(imageIndex ?? 0);
    setActiveScreen('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      // Check if duplicate item exists with same options
      const existingIdx = prev.findIndex(
        i => i.productId === item.productId && 
             i.size === item.size && 
             i.colorName === item.colorName &&
             i.customization?.monogram === item.customization?.monogram
      );

      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += item.quantity;
        return copy;
      }
      return [item, ...prev];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const handleSaveEditedItem = (
    itemId: string, 
    newSize: string, 
    newColor: string, 
    newColorHex: string
  ) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          size: newSize,
          colorName: newColor,
          colorHex: newColorHex,
        };
      }
      return item;
    }));
  };

  const handleConfirmDelete = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleSaveToWishlist = (item: CartItem) => {
    if (!wishlistIds.includes(item.productId)) {
      setWishlistIds(prev => [...prev, item.productId]);
    }
    setCartItems(prev => prev.filter(i => i.id !== item.id));
  };

  const handleAddComplement = (comp: typeof COMPLEMENTARY_ITEMS[0]) => {
    const newItem: CartItem = {
      id: `${comp.id}-${Date.now()}`,
      productId: comp.id,
      sku: comp.id.toUpperCase(),
      name: comp.name,
      subtitle: `${comp.category} // MATCH ARQUITECTÓNICO`,
      price: comp.price,
      image: comp.image,
      weightGsm: comp.weightGsm,
      size: 'L (Match)',
      colorName: 'Washed Slate',
      colorHex: '#4A4D52',
      quantity: 1,
      stockNote: 'Pieza seleccionada por el Atelier para emparejar proporciones'
    };
    handleAddToCart(newItem);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const activeProduct = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-[#191c1d] selection:bg-[#121316] selection:text-white">
      {/* Header */}
      <Header 
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlistCount={wishlistIds.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => handleNavigate('wishlist')}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20">
        {activeScreen === 'home' && (
          <HomeView 
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onOpenCustomStudio={() => setIsCustomStudioOpen(true)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        )}

        {activeScreen === 'pdp' && (
          <PdpView 
            product={activeProduct}
            onAddToCart={handleAddToCart}
            onOpenSizeModal={() => setIsSizeModalOpen(true)}
            onNavigate={handleNavigate}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(activeProduct.id)}
          />
        )}

        {activeScreen === 'cart' && (
          <CartView 
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRequestDelete={(item) => setDeletingCartItem(item)}
            onRequestEdit={(item) => setEditingCartItem(item)}
            onSaveForLater={handleSaveToWishlist}
            onAddComplement={handleAddComplement}
            onProceedToCheckout={() => setIsCheckoutOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {activeScreen === 'lookbook' && (
          <LookbookView 
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {activeScreen === 'sostenibilidad' && (
          <SustainabilityView />
        )}

        {activeScreen === 'wishlist' && (
          <WishlistView 
            wishlistIds={wishlistIds}
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onRemoveFromWishlist={(id) => handleToggleWishlist(id)}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenSizeModal={() => setIsSizeModalOpen(true)}
      />

      {/* ================= MODALS ================= */}
      {/* 1. Size Guide Modal */}
      <SizeGuideModal 
        isOpen={isSizeModalOpen}
        onClose={() => setIsSizeModalOpen(false)}
      />

      {/* 2. Global Search ⌘K Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
      />

      {/* 3. Custom Studio Atelier Modal */}
      <CustomStudioModal 
        isOpen={isCustomStudioOpen}
        onClose={() => setIsCustomStudioOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* 4. Cart Quick Edit Modal */}
      <CartEditModal 
        item={editingCartItem}
        isOpen={Boolean(editingCartItem)}
        onClose={() => setEditingCartItem(null)}
        onSave={handleSaveEditedItem}
      />

      {/* 5. Cart Delete Modal (Don Norman Error Prevention) */}
      <CartDeleteModal 
        item={deletingCartItem}
        isOpen={Boolean(deletingCartItem)}
        onClose={() => setDeletingCartItem(null)}
        onConfirmDelete={handleConfirmDelete}
        onSaveToWishlist={handleSaveToWishlist}
      />

      {/* 6. Checkout Step Flow Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={cartTotal}
        onOrderSuccess={() => {
          setCartItems([]);
        }}
      />
    </div>
  );
}
