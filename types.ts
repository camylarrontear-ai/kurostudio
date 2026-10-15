export interface Product {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  weightGsm: number;
  fabric: string;
  fit: string;
  badge?: string;
  badgeType?: 'stock' | 'eco' | 'heavy' | 'custom' | 'limited';
  rating: number;
  reviewsCount: number;
  description: string;
  origin: string;
  composition: string;
  treatment: string;
  stockStatus: 'in_stock' | 'low_stock' | 'sold_out';
  stockCount?: number;
  colors: {
    name: string;
    hex: string;
    image: string;
  }[];
  images: {
    label: string;
    url: string;
    alt: string;
  }[];
  availableSizes: {
    size: string;
    chestWidth: string;
    stock: 'in' | 'low' | 'out';
    unitsLeft?: number;
  }[];
}

export interface CustomizationOption {
  enabled: boolean;
  monogram: string;
  threadColor: 'tonal' | 'terracota';
  placement: 'chest' | 'cuff' | 'hood';
  extraPrice: number;
}

export interface CartItem {
  id: string;
  productId: string;
  sku: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  weightGsm: number;
  size: string;
  colorName: string;
  colorHex: string;
  customization?: CustomizationOption;
  quantity: number;
  stockNote?: string;
}

export interface CatalogCardItem {
  id: string;
  productId: string;
  imageIndex: number;
  sku: string;
  name: string;
  viewName: string;
  subtitle: string;
  price: number;
  weightGsm: number;
  image: string;
  badge: string;
  badgeType: 'stock' | 'eco' | 'heavy' | 'custom' | 'limited';
  rating: number;
  reviewsCount: number;
  fit: string;
}

export type ActiveScreen = 'home' | 'pdp' | 'cart' | 'lookbook' | 'sostenibilidad' | 'wishlist';
