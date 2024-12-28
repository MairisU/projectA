import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';
import './Cart.css';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, updateQuantity, removeItem, clearCart }) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const renderAttributes = (productId: string, selectedAttributes: any = {}) => {
    switch (productId) {
      case '1':
        return (
          <div key={productId} className="size-shoes" data-testid="cart-item-attribute-shoe">BOOTSIZE:
            {['40', '41', '42', '43'].map((bootsize) => (
              <button
              disabled
                key={bootsize}
                className={`size-shoe-btn ${selectedAttributes?.bootsize === bootsize ? 'selected' : ''}`}
                data-testid={`cart-item-attribute-shoe-${bootsize.toLowerCase()}`}
              >
                {bootsize}
              </button>
            ))}
          </div>
        );
  
      case '2':
        return (
          <div key={productId} className="size-clothes" data-testid="cart-item-attribute-clothes">SIZE:
            {['S', 'M', 'L', 'XL'].map((size) => (
              <button
              disabled
                key={size}
                className={`size-clothes-btn ${selectedAttributes?.size === size ? 'selected' : ''}`}
                data-testid={`cart-item-attribute-clothes-${size.toLowerCase()}`}
              >
                {size}
              </button>
            ))}
          </div>
        );
  
      case '3':
        return (
          <div key={productId} className="attributes-container">
            <div className="color-options" data-testid="cart-item-attribute-color">
              COLOR:
              {['Green', 'Cyan', 'Blue', 'Black', 'White'].map((color) => (
                <button
                disabled
                  key={color}
                  className={`color-btn ${selectedAttributes?.color === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  data-testid={`cart-item-attribute-color-${color.toLowerCase()}`}
                >
                  {color}
                </button>
              ))}
            </div>
            <div className="capacity-options" data-testid="cart-item-attribute-capacity">
              CAPACITY: 
              {['512GB', '1TB'].map((capacity) => (
                <button
                disabled
                  key={capacity}
                  className={`capacity-btn ${selectedAttributes?.capacity === capacity ? 'selected' : ''}`}
                  data-testid={`cart-item-attribute-capacity-${capacity.toLowerCase()}`}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>
        );
  
      case '5':
        return (
          <div key={productId} className="attributes-container">
            <div className="capacity-options" data-testid="cart-item-attribute-capacity">
              CAPACITY:
              {['256GB', '512GB'].map((capacity) => (
                <button
                disabled
                  key={capacity}
                  className={`capacity-btn ${selectedAttributes?.capacity === capacity ? 'selected' : ''}`}
                  data-testid={`cart-item-attribute-capacity-${capacity.toLowerCase()}`}
                >
                  {capacity}
                </button>
              ))}
            </div>
            <div className="usbports-options" data-testid="cart-item-attribute-usbports">
              With USB 3 ports:
              {['YES', 'NO'].map((usbports) => (
                <button
                disabled
                  key={usbports}
                  className={`usbports-btn ${selectedAttributes?.usbports === usbports ? 'selected' : ''}`}
                  data-testid={`cart-item-attribute-usbports-${usbports.toLowerCase()}`}
                >
                  {usbports}
                </button>
              ))}
            </div>
            <div className="touchid-options" data-testid="cart-item-attribute-touchid">
              Touch ID in keyboard:
              {['YES', 'NO'].map((touchid) => (
                <button
                disabled
                  key={touchid}
                  className={`touchid-btn ${selectedAttributes?.touchid === touchid ? 'selected' : ''}`}
                  data-testid={`cart-item-attribute-touchid-${touchid.toLowerCase()}`}
                >
                  {touchid}
                </button>
              ))}
            </div>
          </div>
        );
  
      case '6':
        return (
          <div key={productId} className="attributes-container">
            <div className="capacity-options" data-testid="cart-item-attribute-capacity">
              CAPACITY:
              {['512GB', '1TB'].map((capacity) => (
                <button
                disabled
                  key={capacity}
                  className={`capacity-btn ${selectedAttributes?.capacity === capacity ? 'selected' : ''}`}
                  data-testid={`cart-item-attribute-capacity-${capacity.toLowerCase()}`}
                >
                  {capacity}
                </button>
              ))}
            </div>
            <div className="color-options" data-testid="cart-item-attribute-color">
              COLOR:
              {['Green', 'Cyan', 'Blue', 'Black', 'White'].map((color) => (
                <button
                disabled
                  key={color}
                  className={`color-btn ${selectedAttributes?.color === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  data-testid={`cart-item-attribute-color-${color.toLowerCase()}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return <p key={productId} />;
    }
  };

  const getItemKey = (item: CartItem) => `${item.id}-${JSON.stringify(item.selectedAttributes)}`;

  return (
    <>
      <div className="page-overlay" onClick={onClose} />
        <div className="cart-container">
          <div className="cart-header">
            <h2 className="cart-header-title">My Bag, {items.length} {items.length === 1 ? 'item' : 'items'}</h2>
              <button onClick={onClose} className="close-btn" data-testid="cart-close-btn">
                <X size={20} />
              </button>
          </div>

          <div className="cart-items">
            {items.map((item) => (
              <div key={getItemKey(item)}
              className="cart-item"
              data-testid={`cart-item-attribute-${item.id}`}>
                <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                      <div className="item-header">
                        <h3 className="item-name">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="remove-btn" data-testid="cart-item-remove">
                            <X size={16} />
                          </button>
                      </div>
                      <p className="item-price">{formatPrice(item.price)}</p>
                      {renderAttributes(item.id, item.selectedAttributes)}
                        <div className="item-attributes">
                          {Object.entries(item.selectedAttributes).map(([key, value]) => (
                            <div key={key} className="item-attribute-display"
                            data-testid={`cart-item-attribute-${key.toLowerCase()}`}>
                              <p>{key.toUpperCase()}:</p> 
                                <button className="attribute-btn selected" disabled>
                                  {value}
                                </button>
                            </div>
                          ))}
                        </div>
                      <div className="quantity-controls">
                        <button
                          onClick={() => {
                            if (item.quantity === 1) {
                              removeItem(item.id);
                            }else{ 
                              updateQuantity(item.id, -1);
                            }
                            }}
                          className="quantity-btn"
                          data-testid="cart-item-amount-decrease"
                        >-
                          <Minus size={20} />
                        </button>
                          <span className="quantity" data-testid="cart-item-amount">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="quantity-btn"
                            data-testid="cart-item-amount-increase"
                          >+
                            <Plus size={20} />
                          </button>
                      </div>
                  </div>
              </div>
            ))}
          </div>
            <div className="cart-footer">
              <div className="total">
                <span>Total</span>
                <span data-testid="cart-total">${total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" disabled={total === 0} data-testid="cart-place-order-btn" onClick={() => {
                clearCart();
              }} 
              >
                PLACE ORDER
              </button>
            </div>
        </div>
    </>
  );
};

export default Cart;

