import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, ShoppingCart, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/helpers';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const outOfStock = product.stock === 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (outOfStock) return;
    if (!inCart) {
      addToCart(product, 1);
      toast.success('Added to cart!');
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  return (
    <div className="card card-hover group flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden relative border border-gray-100 dark:border-gray-700">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        {product.discount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </span>
        )}
      </div>

      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={handleWishlistToggle}
          className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
        >
          <Heart size={18} className={`${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
      </div>

      <Link to={`/products/${product.slug}`} className="block relative overflow-hidden aspect-square">
        <img
          src={product.images?.[0] || product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {outOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg border-2 border-white px-4 py-2 rotate-[-12deg]">
              SOLD OUT
            </span>
          </div>
        )}
        
        {/* Quick actions overlay */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
          <button className="bg-white text-gray-900 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors" title="Quick View">
            <Eye size={20} />
          </button>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">{product.category}</span>
        <Link to={`/products/${product.slug}`} className="hover:text-primary-600 transition-colors">
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="mb-3">
          <StarRating rating={product.rating} count={product.reviewCount} size="sm" showCount={true} />
        </div>

        <div className="mt-auto flex items-end justify-between mb-4">
          <div className="flex flex-col">
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={outOfStock}
          className={`w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
            inCart
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : outOfStock
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {inCart ? (
            <>
              <Check size={18} /> In Cart
            </>
          ) : (
            <>
              <ShoppingCart size={18} /> {outOfStock ? 'Out of Stock' : 'Add to Cart'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
