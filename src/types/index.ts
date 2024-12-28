export interface ProductDetailProps {
  products: Product[];
  addToCart: (item: CartItem) => void;
}

export interface ProductAttributes {
  [key: string]: string[]; // Example: { color: ['red', 'blue'], size: ['S', 'M', 'L'] }
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedAttributes: SelectedAttributes;
  images: string;
}

export interface SelectedAttributes {
  [attribute: string]: string; // e.g., { color: 'red', size: 'M' }
}
export interface Product {
  id: string;
  name: string;
  price: number;
  images: string;
  inStock: boolean;
  attributes: ProductAttributes;
}

