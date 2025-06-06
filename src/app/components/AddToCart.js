'use client';
import { useState, useEffect } from 'react';
import { useCart } from '../Context/CartContext';

export default function AddToCart({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);
  const { addToCart, cartItems } = useCart();

  // Update quantity based on existing cart item
  useEffect(() => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setQuantity(existingItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItems, product.id]);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleAddToCart = () => {
    const existingItem = cartItems.find(item => item.id === product.id);
    const quantityToAdd = existingItem ? quantity - existingItem.quantity : quantity;
    
    if (quantityToAdd > 0) {
      addToCart(product, quantityToAdd);
      
      // Show success message
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  };

  return (
    <div className="flex items-center gap-4 my-4 relative">
      <div className="flex items-center border border-gray-300 rounded">
        <button 
          onClick={handleDecrement}
          className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed border-none px-3 py-2 cursor-pointer text-lg min-w-[40px]"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="px-4 py-2 font-bold min-w-[2rem] text-center">{quantity}</span>
        <button 
          onClick={handleIncrement}
          className="bg-gray-100 hover:bg-gray-200 border-none px-3 py-2 cursor-pointer text-lg min-w-[40px]"
        >
          +
        </button>
      </div>
      
      <button 
        onClick={handleAddToCart}
        className="bg-[#1C1C1C] hover:bg-[#1ceff4] hover:text-black text-white border-none px-6 py-3 rounded cursor-pointer font-bold transition-all duration-300"
      >
        Add to Cart
      </button>

      {showMessage && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#1ceff4] text-black px-4 py-2 rounded text-sm whitespace-nowrap z-10 animate-fade">
          {quantity === 1 ? '1 item' : `${quantity} items`} added to cart!
        </div>
      )}
    </div>
  );
}