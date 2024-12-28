import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductDetailProps, CartItem, SelectedAttributes } from '../types';
import './ProductDetail.css';

const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-') 
    .toLowerCase();
};

const ProductDetail: React.FC<ProductDetailProps> = ({ products, addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttributes>({});
  const [isLoading, setIsLoading] = useState(false);

  const product = useMemo(() => products.find((p) => p.id === id), [products, id]);

  if (!product) {
    return (
      <div className="product-detail">
        <h1 className="product-title">Product not found</h1>
        <button
          onClick={() => navigate('/')}
          className="add-to-cart-button"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  const validateAttributes = (): boolean => {
    const requiredAttributes = Object.entries(product.attributes)
      .filter(([_, values]) => Array.isArray(values) && values.length > 0)
      .map(([key]) => key);

    return requiredAttributes.every((attr) => selectedAttributes[attr]);
  };

  const handleAddToCart = async () => {
    if (!validateAttributes()) {
      alert('Please select all required options');
      return;
    }
  
    setIsLoading(true);
    try {
      const cartItem: CartItem = {
        ...product,
        quantity: 1,
        selectedAttributes, // Make sure this is included
      };
      addToCart(cartItem); // Add the item to the cart
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderAttributeSelector = (attributeName: string, options: string[]) => {
    const isColorAttribute = attributeName.toLowerCase().includes('color');
    const isBooleanAttribute = ['usbport', 'touched'].includes(attributeName.toLowerCase());

    return (
      <div
        key={attributeName}
        className="attribute-options"
        data-testid={`product-attribute-${toKebabCase(attributeName)}`}
      >
        <label className="product-title capitalize">
          {attributeName}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className={`attribute-options ${isColorAttribute ? 'color' : 'size'}`}>
        {isColorAttribute
          ? ['green', 'cyan', 'blue', 'black', 'white'].map((color) => (
              <button
                key={color}
                onClick={() =>
                  setSelectedAttributes((prev) => ({
                    ...prev,
                    [attributeName]: color,
                  }))
                }
                className={`color-swatch-button ${
                  selectedAttributes[attributeName] === color ? 'selected' : ''
                }`}
                aria-pressed={selectedAttributes[attributeName] === color}
              >
                <span
                  className="color-swatch"
                  style={{ backgroundColor: color }}
                />
              </button>
            ))
          : options.map((option) => (
              <button
                key={option}
                onClick={() =>
                  setSelectedAttributes((prev) => ({
                    ...prev,
                    [attributeName]: option,
                  }))
                }
                className={`${
                  selectedAttributes[attributeName] === option
                    ? 'attribute-options button selected'
                    : 'attribute-options button'
                }`}
                aria-pressed={selectedAttributes[attributeName] === option}
              >
                {isBooleanAttribute ? option : option}
              </button>
            ))}
      </div>
    </div>
  );
};

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : product.images.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < product.images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="product-detail">
      <div className="section-container">
        {/* Thumbnails on the Left */}
        <div className="thumbnails-container">
          <button
            className="arrow-button arrow-left"
            onClick={handlePreviousImage}
            disabled={product.images.length <= 1}
          >{'<'}
            <ChevronLeft />
          </button>
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail-image ${
                currentImageIndex === index ? 'selected-thumbnail' : ''
              }`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
          <button
            className="arrow-button arrow-right"
            onClick={handleNextImage}
            disabled={product.images.length <= 1}
          >{'>'}
            <ChevronRight />
          </button>
        </div>

        <div className="product-image-container" data-testid="product-gallery">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            loading="lazy"
          />
        </div>

        {/* Product Details on the Right */}
        <div className="product-detail-container">
          <h1 className="product-title">{product.name}</h1>
          <div className="attribute-options">
            {Object.entries(product.attributes).map(([key, values]) =>
              Array.isArray(values) && values.length > 0
                ? renderAttributeSelector(key, values)
                : null
            )}
          </div>
          <p className="price" data-testid="product-price">
            PRICE: {formatPrice(product.price)}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isLoading || !validateAttributes()}
            className="add-to-cart-button"
            data-testid="add-to-cart"
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <div
            className="product-description"
            data-testid="product-description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
