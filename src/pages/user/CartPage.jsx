import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/user/CartItem';
import EmptyState from '../../components/shared/EmptyState';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { cart, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - discount;

  const handleApplyCoupon = () => {
    if (couponCode === 'SAVE10') {
      setDiscount(subtotal * 0.1);
      toast.success('Coupon applied! 10% off');
    } else if (couponCode === 'SAVE20') {
      setDiscount(subtotal * 0.2);
      toast.success('Coupon applied! 20% off');
    } else {
      setDiscount(0);
      toast.error('Invalid coupon code');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container-custom py-16">
        <EmptyState 
          title="Your cart is empty" 
          description="Looks like you haven't added anything to your cart yet."
          icon={ShoppingCart}
          actionLabel="Start Shopping"
          onAction={() => navigate('/products')}
        />
      </div>
    );
  }

  return (
    <div className="page-enter bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1">
            <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">Shopping Cart</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 mb-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold">Items ({cart.length})</h2>
                <button 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm font-medium"
                >
                  <Trash2 size={16} /> Clear Cart
                </button>
              </div>
              
              <div className="flex flex-col gap-6">
                {cart.map(item => (
                  <CartItem key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">Order Summary</h2>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900 dark:text-white">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatPrice(tax)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 mb-6">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Coupon code" 
                    className="input-field flex-1"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button onClick={handleApplyCoupon} className="btn-secondary whitespace-nowrap">Apply</button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Try 'SAVE10' or 'SAVE20'</p>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-primary-600">{formatPrice(Math.max(0, total))}</span>
                </div>
              </div>

              <button 
                className="btn-primary w-full py-4 text-lg mb-4"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
              
              <div className="text-center">
                <Link to="/products" className="text-primary-600 hover:underline font-medium">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
