import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Package, ChevronDown, ChevronUp } from 'lucide-react';
import { orders } from '../../data/orders';
import { formatPrice } from '../../utils/helpers';
import EmptyState from '../../components/shared/EmptyState';
import { useAuth } from '../../context/AuthContext';

const OrdersPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);

  // In real app, filter by user.id
  const userOrders = orders; 

  const tabs = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  
  const filteredOrders = activeTab === 'all' 
    ? userOrders 
    : userOrders.filter(o => o.status.toLowerCase() === activeTab);

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'shipped': return 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400';
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto">
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 shadow-soft'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft py-16">
            <EmptyState 
              title="No orders found" 
              description={`You don't have any ${activeTab !== 'all' ? activeTab : ''} orders yet.`}
              icon={Package}
              actionLabel="Start Shopping"
              onAction={() => window.location.href = '/products'}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold">Order #{order.id}</h3>
                      <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary-600">{formatPrice(order.totalAmount)}</p>
                      <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 overflow-x-auto py-2">
                    {order.items.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="w-16 h-16 rounded-md bg-gray-100 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center text-xs text-gray-500 overflow-hidden relative group">
                        <img src={`https://via.placeholder.com/150?text=Item+${item.productId}`} alt="Item" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white">x{item.quantity}</div>
                      </div>
                    ))}
                    {order.items.length > 4 && (
                      <div className="w-16 h-16 rounded-md bg-gray-100 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center text-sm font-medium text-gray-600">
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>

                  <button 
                    className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    {expandedOrder === order.id ? <><ChevronUp size={16}/> Hide Details</> : <><ChevronDown size={16}/> View Details</>}
                  </button>
                </div>

                {expandedOrder === order.id && (
                  <div className="border-t border-gray-100 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold mb-4 border-b pb-2 dark:border-gray-700">Order Items</h4>
                        <div className="space-y-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white rounded shadow-sm overflow-hidden">
                                  <img src={`https://via.placeholder.com/150?text=Product`} alt="" />
                                </div>
                                <div>
                                  <p className="font-medium text-sm">Product {item.productId}</p>
                                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <span className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4 border-b pb-2 dark:border-gray-700">Shipping Details</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                          {order.shippingAddress.address}<br/>
                          {order.shippingAddress.city}, {order.shippingAddress.country}
                        </p>
                        {order.trackingNumber && (
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                            <p className="text-xs text-gray-500 mb-1">Tracking Number</p>
                            <p className="font-mono text-sm font-medium text-primary-600">{order.trackingNumber}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
