import React from 'react';
import { Package, Heart, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useWishlist } from '../../../context/WishlistContext';
import { orders } from '../../../data/orders';

const OverviewPage = () => {
  const { user } = useAuth();
  const { wishlist } = useWishlist();

  const userOrders = orders.filter(o => o.userId === user?.id);
  const totalOrders = userOrders.length;
  const pendingOrders = userOrders.filter(o => o.status === 'Processing' || o.status === 'Shipped').length;
  const completedOrders = userOrders.filter(o => o.status === 'Delivered').length;
  const wishlistCount = wishlist?.length || 0;

  const stats = [
    { label: 'Total Orders', value: totalOrders, icon: Package, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Pending Orders', value: pendingOrders, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
    { label: 'Completed Orders', value: completedOrders, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'Wishlist Items', value: wishlistCount, icon: Heart, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6 shadow-soft flex items-center gap-4 dark:bg-gray-800">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card p-6 shadow-card dark:bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Orders</h2>
          <Link to="/account/orders" className="text-primary-600 hover:text-primary-700 font-medium text-sm">View All</Link>
        </div>
        {userOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                  <th className="pb-3 font-medium px-4">Order ID</th>
                  <th className="pb-3 font-medium px-4">Date</th>
                  <th className="pb-3 font-medium px-4">Status</th>
                  <th className="pb-3 font-medium px-4">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {userOrders.slice(0, 5).map(order => (
                  <tr key={order.id}>
                    <td className="py-4 text-sm font-medium text-gray-900 dark:text-white px-4">{order.id}</td>
                    <td className="py-4 text-sm text-gray-500 dark:text-gray-400 px-4">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="py-4 text-sm px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        order.status === 'Processing' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm font-medium text-gray-900 dark:text-white px-4">${order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>You have no recent orders.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewPage;
