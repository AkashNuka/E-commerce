
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Trash2 } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-brand-primary">Your Shopping Bag is Empty</h1>
        <p className="mt-4 text-gray-600">Looks like you haven't added anything to your bag yet.</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-brand-secondary text-white font-bold py-3 px-8 rounded-md hover:bg-yellow-600 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-brand-primary">Your Bag</h1>
            <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                <Trash2 size={16}/> Clear Bag
            </button>
        </div>
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
              <img src={item.imageUrl} alt={item.name} className="w-24 h-32 object-cover rounded-md" />
              <div className="ml-4 flex-grow">
                <p className="font-bold text-gray-800">{item.brand}</p>
                <p className="text-gray-600">{item.name}</p>
                <p className="font-semibold text-brand-primary mt-1">₹{item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                  <Plus size={16} />
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="ml-6 text-gray-400 hover:text-red-500">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
          <h2 className="text-xl font-bold text-brand-primary border-b pb-4">Order Summary</h2>
          <div className="space-y-4 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-green-600">FREE</span>
            </div>
            <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
          </div>
          <button className="mt-6 w-full bg-brand-secondary text-white font-bold py-3 rounded-md hover:bg-yellow-600 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
