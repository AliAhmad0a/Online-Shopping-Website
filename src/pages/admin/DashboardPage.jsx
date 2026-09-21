import React from 'react';
import { DollarSign, ShoppingBag, Users, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatsCard from '../../components/admin/StatsCard';
import ChartPlaceholder from '../../components/admin/ChartPlaceholder';
import { products } from '../../data/products';
import { orders } from '../../data/orders';
import { users } from '../../data/users';
import { formatPrice, getTimeAgo } from '../../utils/helpers';

const DashboardPage = () => {
  // Mock recent orders
  const recentOrders = orders.slice(0, 5);
  
  // Mock top products (sort by rating and reviews)
  const topProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'shipped': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  return (
    <div className="page-enter space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Revenue" 
          value="$45,250" 
          change="12.5" 
          changeType="increase" 
          icon={DollarSign} 
          color="green" 
        />
        <StatsCard 
          title="Total Orders" 
          value="156" 
          change="8.2" 
          changeType="increase" 
          icon={ShoppingBag} 
          color="blue" 
        />
        <StatsCard 
          title="Total Customers" 
          value={users.length.toString()} 
          change="5.1" 
          changeType="increase" 
          icon={Users} 
          color="purple" 
        />
        <StatsCard 
          title="Total Products" 
          value={products.length.toString()} 
          change="2.4" 
          changeType="increase" 
          icon={Package} 
          color="yellow" 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartPlaceholder title="Monthly Revenue" type="bar" height="h-72" />
        <ChartPlaceholder title="Order Statistics" type="line" height="h-72" />
        <ChartPlaceholder title="Customer Growth" type="line" height="h-72" />
        
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Recent Orders</h3>
            <Link to="/admin/orders" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Customer</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Items</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Total</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                    <td className="py-3 text-sm text-gray-700 dark:text-gray-300">
                      {users.find(u => u.id === order.userId)?.name || 'Guest User'}
                    </td>
                    <td className="py-3 text-sm text-gray-700 dark:text-gray-300">{order.items.length} items</td>
                    <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">{formatPrice(order.totalAmount)}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-500 dark:text-gray-400 text-right">{getTimeAgo(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="card">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Top Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-3">
                <div className="w-6 font-bold text-gray-400 dark:text-gray-500 text-center">#{index + 1}</div>
                <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-md object-cover bg-gray-100 dark:bg-gray-800" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{product.name}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                    <p className="text-sm font-bold text-primary-600 dark:text-primary-400">{formatPrice(product.price)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/admin/products" className="btn-secondary w-full justify-center mt-6">
            Manage Products
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mt-8 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/admin/products/new" className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-card hover:border-primary-500 dark:hover:border-primary-500 transition-all group text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Package size={24} />
          </div>
          <span className="font-medium text-gray-900 dark:text-white">Add Product</span>
        </Link>
        <Link to="/admin/orders" className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-card hover:border-blue-500 dark:hover:border-blue-500 transition-all group text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShoppingBag size={24} />
          </div>
          <span className="font-medium text-gray-900 dark:text-white">View Orders</span>
        </Link>
        <Link to="/admin/users" className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-card hover:border-purple-500 dark:hover:border-purple-500 transition-all group text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users size={24} />
          </div>
          <span className="font-medium text-gray-900 dark:text-white">Manage Users</span>
        </Link>
        <Link to="/admin/settings" className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-card hover:border-gray-500 dark:hover:border-gray-500 transition-all group text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Settings size={24} />
          </div>
          <span className="font-medium text-gray-900 dark:text-white">Settings</span>
        </Link>
      </div>
    </div>
  );
};

// Import settings icon that was missing above
import { Settings } from 'lucide-react';

export default DashboardPage;

