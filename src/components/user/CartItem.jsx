import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (item.quantity < 99) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    toast.success('Item removed from cart');
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b border-gray-200 dark:border-gray-700">
      <Link to={`/products/${item.slug}`} className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md bg-gray-100"
        />
      </Link>
      
      <div className="flex-grow text-center sm:text-left w-full">
        <Link to={`/products/${item.slug}`} className="font-medium text-gray-900 dark:text-white hover:text-primary-600">
          {item.name}
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.category}</p>
        {(item.color || item.size) && (
          <p className="text-xs text-gray-400 mt-1">
            {item.color && `Color: ${item.color}`} {item.size && `Size: ${item.size}`}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
        <div className="text-lg font-medium text-gray-900 dark:text-white sm:w-24 text-center">
          {formatPrice(item.price)}
        </div>
        
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
          <button
            onClick={handleDecrease}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
            disabled={item.quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center text-sm font-medium dark:text-white">{item.quantity}</span>
          <button
            onClick={handleIncrease}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
            disabled={item.quantity >= 99}
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="text-lg font-bold text-gray-900 dark:text-white sm:w-24 text-right">
          {formatPrice(item.price * item.quantity)}
        </div>

        <button
          onClick={handleRemove}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
          title="Remove item"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
