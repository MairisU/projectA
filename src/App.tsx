import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import { Product, CartItem } from './types';
import './App.css';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Nike Air Huarache Le',
    price: 144.69,
    description: 'Great sneakers for everyday use!',
    image: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
      category: 'clothes',
    inStock: true,
    attributes: {
      bootsizes: ['40', '41', '42', '43'],
    },
    images: [ 
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087",
    ],
  },
  {
    id: '2',
    name: 'Jacket',
    price: 518.47,
    description: 'Awesome winter jacket',
    image: 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg',
    category: 'clothes',
    inStock: true,
    attributes: {
      sizes: ['S', 'M', 'L', 'XL'],
    },
    images: [
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg",
      "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png",
      "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png"
    ],
  },
  {
    id: '3',
    name: 'PlayStation 5',
    price: 844.02,
    description: 'A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha',
    image: 'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg',
    category: 'tech',
    inStock: true,
    attributes: {
      colors: ['Green', 'Cyan', 'Blue', 'Black', 'White'],
      capacity: ['512GB', '1TB'],
    },
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg",
    ],
  },
  {
    id: '4',
    name: 'Xbox Series S 512GB',
    price: 333.99,
    description: 'Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer. Spiele Games mit bis zu 120 Bilder pro Sekunde. Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen. Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst. Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen. Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben. Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus. Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher. Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr. Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr',
    image: 'https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg',
    category: 'tech',
    inStock: false,
    attributes: {
      colors: ['Green', 'Cyan', 'Blue', 'Black', 'White'],
      capacity: ['512GB', '1TB'],
    },
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg",
    ],
  },
  {
    id: '5',
    name: 'iMac 2021',
    price: 1688.03,
    description: 'The new iMac!',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000',
    category: 'tech',
    inStock: true,
    attributes: {
      capacity: ['256GB', '512GB'],
      usbports: ['YES', 'NO'],
      touchid: ['YES', 'NO'],
    },
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000",
    ],
  },
  {
    id: '6',
    name: 'iPhone 12 Pro',
    price: 1000.76,
    description: 'This is iPhone 12. Nothing else to say.',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000',
    category: 'tech',
    inStock: true,
    attributes: {
      capacity: ['512GB', '1TB'],
      colors: ['Green', 'Cyan', 'Blue', 'Black', 'White'],
    },
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000",
    ],
  },
  {
    id: '7',
    name: 'AirPods Pro',
    price: 300.23,
    description: 'Magic like you’ve never heard. AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they’re ready to use right out of the case. Active Noise Cancellation: Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you’re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls. Transparency mode: Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you’re talking to people around you. All-new design: AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation. Amazing audio quality: A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience. Even more magical: The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000',
    category: 'tech',
    inStock: false,
    attributes: {
    },
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000",
    ],
  },
  {
    id: '8',
    name: 'AirTag',
    price: 120.57,
    description: 'Lose your knack for losing things. AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000',
    category: 'tech',
    inStock: true,
    attributes: {
    },
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000",
    ],
  },
];

const CategoryRoute: React.FC<{
  products: Product[];
  addToCart: (product: Product) => void;
}> = ({ products, addToCart }) => {
  const { category } = useParams<{ category: string }>();
  const filteredProducts = products.filter(
    product => product.category?.toLowerCase() === category?.toLowerCase()
  );

  if (filteredProducts.length === 0){
    return <p>No products found in this category.</p>;
  }

  return (
    <div className="grid">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setIsCartOpen(false);
  }, [location]);

  const clearCart = () => {
    setCartItems([]);
  }

  const addToCart = (
    product: Product,
    selectedAttributes: Record<string, string> = {}
  ) => {
    const attributes =
      Object.keys(product.attributes || {}).length > 0
        ? selectedAttributes
        : {};
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id &&
          JSON.stringify(item.selectedAttributes) === JSON.stringify(attributes)
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item === existingItem
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevItems,
        { ...product, quantity: 1, selectedAttributes: attributes },
      ];
    });
  };
  
  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  return (
    <Router>
      <div className="app">
        <Header
          cartItemsCount={cartItems.length}
          toggleCart={toggleCart}
        />
        <main className="content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="grid">
                  {PRODUCTS.map((product) => (
                    <div className="product" key={product.id}>
                      <div className="product-image-wrapper">
                      <ProductCard
                        product={product}
                        addToCart={(product, attributes) =>
                          addToCart(product, attributes) // Pass attributes from within ProductCard
                        }
                      />
                      </div>
                    </div>
                ))}
                </div>
              }
            />
            <Route
              path="/category/:category"
              element={
                <CategoryRoute
                  products={PRODUCTS}
                  addToCart={addToCart}
                /> 
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetail
                  products={PRODUCTS}
                  addToCart={addToCart}
                />
              }
            />
          </Routes>
        </main>
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          clearCart={clearCart}
        />
      </div>
    </Router>
  );
};

export default App;

