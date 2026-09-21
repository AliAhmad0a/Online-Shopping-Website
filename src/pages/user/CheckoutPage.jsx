import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, DollarSign, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState(null);
  
  const [shippingData, setShippingData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardHolder: ''
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const placeOrder = () => {
    const newOrderId = 'ORD-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    setOrderId(newOrderId);
    clearCart();
    setStep(4); // Success step
    toast.success('Order placed successfully!');
  };

  if (cart.length === 0 && step < 4) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="page-enter bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container-custom max-w-6xl">
        
        {step < 4 && (
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Checkout</h1>
            
            {/* Stepper */}
            <div className="flex items-center justify-center max-w-2xl mx-auto">
              {['Shipping', 'Payment', 'Review'].map((s, i) => (
                <React.Fragment key={s}>
                  <div className="flex flex-col items-center relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 ${
                      step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700'
                    }`}>
                      {step > i + 1 ? <CheckCircle size={20} /> : i + 1}
                    </div>
                    <span className={`mt-2 text-sm font-medium ${step >= i + 1 ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{s}</span>
                  </div>
                  {i < 2 && (
                    <div className={`flex-1 h-1 mx-4 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {step === 4 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-12 text-center max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <CheckCircle size={80} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Order Confirmed!</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Thank you for your purchase. Your order ID is <strong className="text-primary-600">{orderId}</strong>.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/products" className="btn-primary">Continue Shopping</Link>
              <Link to="/profile/orders" className="btn-secondary">View Orders</Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 md:p-8">
                
                {/* Step 1: Shipping */}
                {step === 1 && (
                  <form onSubmit={handleShippingSubmit}>
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-4 dark:border-gray-700">Shipping Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div><label className="block text-sm font-medium mb-1">First Name</label><input required className="input-field" value={shippingData.firstName} onChange={e=>setShippingData({...shippingData, firstName: e.target.value})} /></div>
                      <div><label className="block text-sm font-medium mb-1">Last Name</label><input required className="input-field" value={shippingData.lastName} onChange={e=>setShippingData({...shippingData, lastName: e.target.value})} /></div>
                      <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" required className="input-field" value={shippingData.email} onChange={e=>setShippingData({...shippingData, email: e.target.value})} /></div>
                      <div><label className="block text-sm font-medium mb-1">Phone</label><input required className="input-field" value={shippingData.phone} onChange={e=>setShippingData({...shippingData, phone: e.target.value})} /></div>
                      <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Address</label><input required className="input-field" value={shippingData.address} onChange={e=>setShippingData({...shippingData, address: e.target.value})} /></div>
                      <div><label className="block text-sm font-medium mb-1">City</label><input required className="input-field" value={shippingData.city} onChange={e=>setShippingData({...shippingData, city: e.target.value})} /></div>
                      <div><label className="block text-sm font-medium mb-1">State</label><input required className="input-field" value={shippingData.state} onChange={e=>setShippingData({...shippingData, state: e.target.value})} /></div>
                      <div><label className="block text-sm font-medium mb-1">Zip Code</label><input required className="input-field" value={shippingData.zipCode} onChange={e=>setShippingData({...shippingData, zipCode: e.target.value})} /></div>
                      <div><label className="block text-sm font-medium mb-1">Country</label>
                        <select className="input-field" value={shippingData.country} onChange={e=>setShippingData({...shippingData, country: e.target.value})}>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="btn-primary w-full py-3">Continue to Payment</button>
                  </form>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <form onSubmit={handlePaymentSubmit}>
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-4 dark:border-gray-700">Payment Method</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                      <label className={`border-2 rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-colors ${paymentMethod === 'credit_card' ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                        <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'credit_card'} onChange={() => setPaymentMethod('credit_card')} />
                        <CreditCard className={paymentMethod === 'credit_card' ? 'text-primary-600' : 'text-gray-400'} size={32} />
                        <span className="font-medium text-sm">Credit Card</span>
                      </label>
                      <label className={`border-2 rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                        <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} />
                        <span className="font-bold text-blue-800 text-xl italic my-auto">PayPal</span>
                      </label>
                      <label className={`border-2 rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                        <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                        <DollarSign className={paymentMethod === 'cod' ? 'text-primary-600' : 'text-gray-400'} size={32} />
                        <span className="font-medium text-sm text-center">Cash on Delivery</span>
                      </label>
                    </div>

                    {paymentMethod === 'credit_card' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Card Number</label><input required className="input-field" placeholder="0000 0000 0000 0000" /></div>
                        <div><label className="block text-sm font-medium mb-1">Expiry Date</label><input required className="input-field" placeholder="MM/YY" /></div>
                        <div><label className="block text-sm font-medium mb-1">CVV</label><input required className="input-field" placeholder="123" /></div>
                        <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Cardholder Name</label><input required className="input-field" placeholder="John Doe" /></div>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 py-3">Back</button>
                      <button type="submit" className="btn-primary flex-1 py-3">Review Order</button>
                    </div>
                  </form>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-4 dark:border-gray-700">Review Order</h2>
                    
                    <div className="mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                      <h3 className="font-bold mb-2 flex items-center gap-2"><Truck size={18}/> Shipping Address</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {shippingData.firstName} {shippingData.lastName}<br/>
                        {shippingData.address}, {shippingData.city}<br/>
                        {shippingData.state}, {shippingData.zipCode} {shippingData.country}<br/>
                        {shippingData.phone}
                      </p>
                    </div>

                    <div className="mb-8">
                      <h3 className="font-bold mb-4">Items ({cart.length})</h3>
                      <div className="space-y-4">
                        {cart.map((item, idx) => (
                          <div key={idx} className="flex gap-4 items-center border-b dark:border-gray-700 pb-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button type="button" onClick={() => setStep(2)} className="btn-secondary flex-1 py-3">Back</button>
                      <button onClick={placeOrder} className="btn-primary flex-1 py-3">Place Order</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6 border-b pb-4 dark:border-gray-700">Order Summary</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 mb-6">
                  <div className="flex justify-between"><span>Subtotal</span><span className="font-medium text-gray-900 dark:text-white">{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span className="font-medium text-gray-900 dark:text-white">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
                  <div className="flex justify-between"><span>Tax (8%)</span><span className="font-medium text-gray-900 dark:text-white">{formatPrice(tax)}</span></div>
                </div>
                <div className="border-t pt-4 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-primary-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CheckoutPage;
