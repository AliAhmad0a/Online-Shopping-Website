import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import EmptyState from '../../components/shared/EmptyState';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    toast.success('Moved to cart');
  };

  if (wishlist.length === 0) {
    return (
      <div className="container-custom py-16 min-h-[60vh] flex flex-col justify-center">
        <EmptyState 
          title="Your wishlist is empty" 
          description="Save items you love by clicking the heart icon on products."
          icon={Heart}
          actionLabel="Explore Products"
          onAction={() => window.location.href = '/products'}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-end mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
          <span className="text-gray-500">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <div key={product.id} className="card group relative">
              <Link to={`/product/${product.slug}`} className="block relative overflow-hidden aspect-[4/3] rounded-t-2xl">
                <img 
                  src={product.images?.[0] || product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </Link>
              <div className="p-4 flex flex-col h-full">
                <Link to={`/product/${product.slug}`} className="block mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-primary-600 transition-colors">{product.name}</h3>
                </Link>
                <p className="text-xl font-bold text-primary-600 mb-4">{formatPrice(product.price)}</p>
                <div className="mt-auto flex flex-col gap-2">
                  <button 
                    className="btn-primary w-full flex justify-center items-center gap-2"
                    onClick={() => handleMoveToCart(product)}
                  >
                    <ShoppingCart size={18} /> Move to Cart
                  </button>
                  <button 
                    className="btn-ghost text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 w-full flex justify-center items-center gap-2"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Trash2 size={18} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
