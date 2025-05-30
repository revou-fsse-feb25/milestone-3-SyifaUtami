'use client';
import { useState } from 'react';
import { useCart } from '../Context/CartContext';

export default function AddToCart({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optional: Reset quantity after adding
    setQuantity(1);
  };

  return (
    <div className="add-to-cart-container">
      <div className="quantity-selector">
        <button 
          onClick={handleDecrement}
          className="quantity-btn"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="quantity-display">{quantity}</span>
        <button 
          onClick={handleIncrement}
          className="quantity-btn"
        >
          +
        </button>
      </div>
      
      <button 
        onClick={handleAddToCart}
        className="add-to-cart-btn"
      >
        Add to Cart
      </button>

      <style jsx>{`
        .add-to-cart-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1rem 0;
        }
        
        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        .quantity-btn {
          background: #f5f5f5;
          border: none;
          padding: 0.5rem 0.75rem;
          cursor: pointer;
          font-size: 1.2rem;
          min-width: 40px;
        }
        
        .quantity-btn:hover:not(:disabled) {
          background: #e0e0e0;
        }
        
        .quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .quantity-display {
          padding: 0.5rem 1rem;
          font-weight: bold;
          min-width: 2rem;
          text-align: center;
        }
        
        .add-to-cart-btn {
          background:#1C1C1C;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: bold;
        }
        
        .add-to-cart-btn:hover {
          background:#1ceff4;
        }
          color: black;
      `}</style>
    </div>
  );
}