import React, { useState, useMemo } from 'react';
import { Download, X } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/admin/DataTable';
import { orders as initialOrders } from '../../data/orders';
import { users } from '../../data/users';
import { formatPrice, getTimeAgo } from '../../utils/helpers';

const ManageOrdersPage = () => {
  const [ordersList, setOrdersList] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');

  const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  // Count orders per status
  const counts = tabs.reduce((acc, tab) => {
    if (tab === 'All') {
      acc[tab] = ordersList.length;
    } else {
      acc[tab] = ordersList.filter(o => o.status.toLowerCase() === tab.toLowerCase()).length;
    }
    return acc;
  }, {});

  const filteredOrders = useMemo(() => {
    if (activeTab === 'All') return ordersList;
    return ordersList.filter(o => o.status.toLowerCase() === activeTab.toLowerCase());
  }, [ordersList, activeTab]);

  const handleStatusUpdate = () => {
    if (!updateStatus || !selectedOrder) return;
    
    setOrdersList(prev => prev.map(order => 
      order.id === selectedOrder.id ? { ...order, status: updateStatus } : order
    ));
    
    setSelectedOrder(prev => ({ ...prev, status: updateStatus }));
    toast.success(`Order status updated to ${updateStatus}`);
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setUpdateStatus(order.status);
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
    }
  };

  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      render: (val) => <span className="font-semibold text-gray-900 dark:text-white">{val}</span>
    },
    {
      key: 'userId',
      label: 'Customer',
      render: (val) => {
        const user = users.find(u => u.id === val);
        return (
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'Guest User'}</p>
            <p className="text-xs text-gray-500">{user?.email || 'N/A'}</p>
          </div>
        );
      }
    },
    {
      key: 'items',
      label: 'Items',
      render: (val) => (
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {val.slice(0, 3).map((item, idx) => (
              <img key={idx} src={item.images?.[0] || item.image} alt="item" className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 object-cover bg-gray-100" />
            ))}
          </div>
          <span className="text-xs text-gray-500">{val.length} items</span>
        </div>
      ),
      sortable: false
    },
    {
      key: 'totalAmount',
      label: 'Total',
      render: (val) => <span className="font-medium text-gray-900 dark:text-white">{formatPrice(val)}</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (val, item) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(val)}`}>
          {val}
        </span>
      )
    },
    {
      key: 'paymentMethod',
      label: 'Payment',
      render: (val) => <span className="text-gray-600 dark:text-gray-300 capitalize">{val.replace('_', ' ')}</span>
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (val) => (
        <div>
          <p className="text-gray-900 dark:text-white">{new Date(val).toLocaleDateString()}</p>
          <p className="text-xs text-gray-500">{getTimeAgo(val)}</p>
        </div>
      )
    }
  ];

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and track customer orders</p>
        </div>
        <button className="btn-secondary">
          <Download size={18} className="mr-2" /> Export CSV
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-6 border-b border-gray-200 dark:border-gray-800 hide-scrollbar">
        <div className="flex space-x-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap flex items-center gap-2
                ${activeTab === tab 
                  ? 'bg-white dark:bg-gray-900 text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}
              `}
            >
              {tab}
              <span className={`
                px-2 py-0.5 rounded-full text-xs
                ${activeTab === tab ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}
              `}>
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <DataTable 
        columns={columns}
        data={filteredOrders}
        searchable={true}
        searchKeys={['id', 'status', 'paymentMethod']}
        onView={openOrderModal}
        itemsPerPage={10}
      />

      {/* Order Detail Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  Order Details
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </h3>
                <p className="text-sm text-gray-500 mt-1">ID: {selectedOrder.id} • {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Items */}
                <div className="card">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Order Items</h4>
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="py-3 flex gap-4">
                        <img src={item.images?.[0] || item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-gray-50" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                        </div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="card grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Shipping Address</h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.shippingAddress.fullName}</p>
                      <p>{selectedOrder.shippingAddress.address}</p>
                      <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</p>
                      <p>{selectedOrder.shippingAddress.country}</p>
                      <p className="pt-2">Phone: {selectedOrder.shippingAddress.phone}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Customer Info</h4>
                    {(() => {
                      const user = users.find(u => u.id === selectedOrder.userId);
                      return user ? (
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                          <p>{user.email}</p>
                        </div>
                      ) : <p className="text-sm text-gray-500">Guest User</p>;
                    })()}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Order Summary */}
                <div className="card bg-gray-50 dark:bg-gray-800/50 border-none">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Subtotal</span>
                      <span>{formatPrice(selectedOrder.totalAmount - 15 - 5)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Shipping</span>
                      <span>$15.00</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Tax</span>
                      <span>$5.00</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>{formatPrice(selectedOrder.totalAmount)}</span>
                    </div>
                  </div>
                </div>

                {/* Update Status Actions */}
                <div className="card">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Update Status</h4>
                  <div className="space-y-3">
                    <select 
                      value={updateStatus} 
                      onChange={(e) => setUpdateStatus(e.target.value)}
                      className="input-field w-full"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button 
                      onClick={handleStatusUpdate}
                      disabled={updateStatus === selectedOrder.status}
                      className="btn-primary w-full justify-center disabled:opacity-50"
                    >
                      Update Order Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrdersPage;
