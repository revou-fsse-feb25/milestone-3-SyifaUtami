'use client';
import { useCart } from '@/app/Context/CartContext';

export default function ProductTile({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="product-tile">
      {/* Product Image */}
      <div className="product-image">
        <img 
          src={item.images?.[0] || item.image} 
          alt={item.title}
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{item.title}</h3>
        <p className="product-price">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="quantity-controls">
        <button 
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="quantity-btn"
        >
          -
        </button>
        <span className="quantity">{item.quantity}</span>
        <button 
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="quantity-btn"
        >
          +
        </button>
      </div>
      
      <div className="item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      
      <button onClick={handleRemove} className="remove-btn">
        Remove
      </button>

      <style jsx>{`
        .product-tile {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-bottom: 1rem;
          background: white;
        }
        
        .product-image {
          width: 80px;
          height: 80px;
          margin-right: 1rem;
          flex-shrink: 0;
        }
        
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }
        
        .product-info {
          flex: 1;
        }
        
        .product-name {
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
          font-weight: bold;
        }
        
        .product-price {
          margin: 0;
          color: #666;
        }
        
        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0 1rem;
        }
        
        .quantity-btn {
          background: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 30px;
          height: 30px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .quantity-btn:hover {
          background: #e0e0e0;
        }
        
        .quantity {
          font-weight: bold;
          min-width: 2rem;
          text-align: center;
        }
        
        .item-total {
          font-weight: bold;
          font-size: 1.1rem;
          margin: 0 1rem;
          min-width: 4rem;
          text-align: right;
        }
        
        .remove-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
        }
        
        .remove-btn:hover {
          background: #c82333;
        }
      `}</style>
    </div>
  );
}