import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ShoppingCart, Heart, Truck, Shield, RefreshCw, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import ProductImageGallery from '../../components/user/ProductImageGallery';
import StarRating from "../../components/user/StarRating";
import ReviewCard from '../../components/user/ReviewCard';
import ErrorState from '../../components/shared/ErrorState';
import ProductCard from '../../components/user/ProductCard';
import { products } from '../../data/products';
import { reviews } from '../../data/reviews';
import { getStockStatus, formatPrice } from '../../utils/helpers';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = products.find(p => p.slug === slug || p.id.toString() === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.colors?.length) setSelectedColor(foundProduct.colors[0]);
      if (foundProduct.sizes?.length) setSelectedSize(foundProduct.sizes[0]);
    }
  }, [slug]);

  if (!product) return <ErrorState title="Product Not Found" message="The product you are looking for does not exist." />;

  const stockStatus = getStockStatus(product.stock);
  const productReviews = reviews.filter(r => r.productId === product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    toast.success('Added to cart!');
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="page-enter bg-white dark:bg-gray-900 min-h-screen pb-16">
      <div className="container-custom pt-6">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1">
            <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li><Link to={`/products?category=${product.category}`} className="hover:text-primary-600 capitalize">{product.category}</Link></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-xs">{product.name}</li>
          </ol>
        </nav>

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <ProductImageGallery images={product.images || [product.image]} />
          
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{product.brand}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <StarRating rating={product.rating} />
              <button 
                onClick={() => setActiveTab('reviews')} 
                className="text-sm text-primary-600 hover:underline"
              >
                {product.reviewCount || productReviews.length} Reviews
              </button>
            </div>
            
            <div className="flex items-end gap-4 mb-6">
              <span className="text-4xl font-bold text-primary-600">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through mb-1">{formatPrice(product.originalPrice)}</span>
              )}
              {product.discount > 0 && (
                <span className="badge-accent mb-2">{product.discount}% OFF</span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">{product.shortDescription || product.description?.substring(0, 150) + '...'}</p>
            
            <div className={`inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full text-sm font-medium w-max ${stockStatus.color}`}>
              <div className="w-2 h-2 rounded-full bg-current"></div>
              {stockStatus.label}
            </div>

            {/* Selectors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-primary-600 scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-md font-medium transition-colors ${
                        selectedSize === size 
                          ? 'border-primary-600 bg-primary-50 text-primary-600 dark:bg-primary-900/20' 
                          : 'border-gray-300 text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:text-gray-300'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quantity</h3>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg w-max">
                <button 
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-l-lg transition-colors"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >-</button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button 
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                >+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button 
                className="btn-primary flex-1 flex justify-center items-center gap-2 py-3 text-lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button 
                className="btn-accent flex-1 py-3 text-lg"
                disabled={product.stock === 0}
              >
                Buy Now
              </button>
              <button 
                className={`p-3 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  isInWishlist(product.id) 
                    ? 'border-red-500 text-red-500 bg-red-50' 
                    : 'border-gray-300 text-gray-600 hover:border-gray-400 dark:border-gray-600 dark:text-gray-400'
                }`}
                onClick={handleWishlistToggle}
              >
                <Heart size={24} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex items-center gap-3">
                <Truck className="text-primary-600 w-6 h-6" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Free Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-primary-600 w-6 h-6" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">1 Year Warranty</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="text-primary-600 w-6 h-6" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">30-Day Returns</span>
              </div>
            </div>
            
            <div className="mt-6 text-sm text-gray-500 flex flex-col gap-1">
              <p>SKU: <span className="font-medium text-gray-700 dark:text-gray-300">{product.id.toString().padStart(6, '0')}</span></p>
              <p>Category: <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{product.category}</span></p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button
                key={tab}
                className={`py-4 px-8 font-medium text-lg capitalize whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab 
                    ? 'border-primary-600 text-primary-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="min-h-[300px]">
            {activeTab === 'description' && (
              <div className="prose max-w-none dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {product.description || 'No detailed description available.'}
                </p>
                {product.features && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {product.specifications ? Object.entries(product.specifications).map(([key, value], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : ''}>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-gray-100 capitalize w-1/3">{key}</td>
                        <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">{value}</td>
                      </tr>
                    )) : (
                      <tr><td className="py-4 px-6 text-center text-gray-500">No specifications available</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex flex-col md:flex-row gap-8 mb-10 items-center md:items-start bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl">
                  <div className="text-center md:w-1/3">
                    <h3 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">{product.rating.toFixed(1)}</h3>
                    <div className="flex justify-center mb-2"><StarRating rating={product.rating} /></div>
                    <p className="text-gray-500">Based on {product.reviewCount || productReviews.length} reviews</p>
                  </div>
                  <div className="w-full md:w-1/3 flex flex-col gap-2">
                    {[5, 4, 3, 2, 1].map(star => {
                      const count = productReviews.filter(r => r.rating === star).length;
                      const percent = productReviews.length ? (count / productReviews.length) * 100 : 0;
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="w-3 text-sm">{star}</span>
                          <span className="text-yellow-400">★</span>
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400" style={{ width: `${percent}%` }}></div>
                          </div>
                          <span className="w-8 text-xs text-right text-gray-500">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                  <div className="md:w-1/3 flex justify-center md:justify-end items-center">
                    <button 
                      className="btn-secondary"
                      onClick={() => toast.success('Review form opened (Demo)')}
                    >
                      Write a Review
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {productReviews.length > 0 ? productReviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                  )) : (
                    <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to review this product!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
