'use client';
import { useCart } from '@/app/Context/CartContext';

export default function ProductTile({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  // Add safety checks
  const price = item?.price ?? 0;
  const quantity = item?.quantity ?? 1;
  const title = item?.title ?? 'Unknown Product';
  const imageUrl = item?.images?.[0] || item?.image || '/placeholder-image.jpg';

  const handleQuantityChange = (newQuantity) => {
    // Prevent negative quantities
    const validQuantity = Math.max(0, newQuantity);
    updateQuantity(item.id, validQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg mb-4 bg-white">
      {/* Product Image */}
      <div className="w-20 h-20 mr-4 flex-shrink-0">
        <img 
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
      </div>
      
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600 m-0">${price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-2 mx-4">
        <button 
          onClick={() => handleQuantityChange(quantity - 1)}
          className="bg-gray-100 border border-gray-300 rounded w-8 h-8 cursor-pointer flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="font-bold min-w-8 text-center">{quantity}</span>
        <button 
          onClick={() => handleQuantityChange(quantity + 1)}
          className="bg-gray-100 border border-gray-300 rounded w-8 h-8 cursor-pointer flex items-center justify-center hover:bg-gray-200"
        >
          +
        </button>
      </div>
      
      <div className="font-bold text-lg mx-4 min-w-16 text-right">
        ${(price * quantity).toFixed(2)}
      </div>
      
      <button 
        onClick={handleRemove} 
        className="bg-red-600 text-white border-none px-4 py-2 rounded cursor-pointer text-sm hover:bg-red-700"
      >
        Remove
      </button>
    </div>
  );
}