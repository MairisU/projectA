export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: 'clothes' | 'tech';
    inStock: boolean;
    attributes: {
      bootsizes?: string[];
      sizes?: string[];
      colors?: string[];
      capacity?: string[];
      usbports?: string[];
      touchid?: string[];
    };
    images: string[];
  }
  
  export interface CartItem extends Product {
    quantity: number;
    selectedAttributes: {
      bootsize?: string;
      size?: string;
      color?: string;
      capacity?: string;
      usbports?: string;
      touchid?: string;
    };
    images: string[];
  }
  
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
    image: string;
  }
  
  export type SelectedAttributes = {
    [key: string]: string; // Example: { color: 'red', size: 'M' }
  };
  
  export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
  }
  
  