'use client';
import { useCart } from '@/app/Context/CartContext';
import ProductTile from '@/app/components/ProductTile';
import Link from "next/link";

export default function CartPage() {
  const { cartItems, getCartTotal, getCartItemCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="p-6">
        <h1>Your Cart</h1>
        <p className="text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1>Your Cart ({getCartItemCount()} items)</h1>
      
      <div className="space-y-4">
        {cartItems.map(item => (
          <ProductTile key={item.id} item={item} />
        ))}
      </div>
      
      <div className="p-6">
        <h2 className="py-8">Total: ${getCartTotal().toFixed(2)}</h2>
        <Link href="/checkout"> 
          <button className="bg-[#1ceff4] hover:bg-[#11989c] text-[#1C1C1C] px-8 py-3 rounded font-bold text-lg"> 
          Proceed to Checkout
        </button> </Link>
      </div>
    </div>
  );
}