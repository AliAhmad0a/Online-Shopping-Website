import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, ShoppingBag, X } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import { users } from '../../data/users';
import { orders } from '../../data/orders';
import { formatPrice } from '../../utils/helpers';

const ManageUsersPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate stats for users
  const usersWithStats = users.map(user => {
    const userOrders = orders.filter(o => o.userId === user.id);
    const totalSpent = userOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    return {
      ...user,
      totalOrders: userOrders.length,
      totalSpent
    };
  });

  const openUserModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const columns = [
    {
      key: 'user',
      label: 'Customer',
      render: (_, item) => (
        <div className="flex items-center gap-3">
          <img 
            src={item.avatar || `https://ui-avatars.com/api/?name=${item.name}&background=random`} 
            alt={item.name} 
            className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" 
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
            <p className="text-xs text-gray-500">{item.email}</p>
          </div>
        </div>
      ),
      sortable: true
    },
    {
      key: 'role',
      label: 'Role',
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
          val === 'admin' 
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
        }`}>
          {val.charAt(0).toUpperCase() + val.slice(1)}
        </span>
      ),
      sortable: true
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (val) => <span className="text-sm text-gray-600 dark:text-gray-400">{val || 'N/A'}</span>
    },
    {
      key: 'createdAt',
      label: 'Joined',
      render: (val) => <span className="text-sm text-gray-600 dark:text-gray-400">{new Date(val).toLocaleDateString()}</span>,
      sortable: true
    },
    {
      key: 'totalOrders',
      label: 'Orders',
      render: (val) => <span className="text-sm font-medium text-gray-900 dark:text-white">{val}</span>,
      sortable: true
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      render: (val) => <span className="text-sm font-medium text-gray-900 dark:text-white">{formatPrice(val)}</span>,
      sortable: true
    }
  ];

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total {users.length} registered customers</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable 
        columns={columns}
        data={usersWithStats}
        searchable={true}
        searchKeys={['name', 'email', 'phone']}
        onView={openUserModal}
        itemsPerPage={10}
      />

      {/* User Detail Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Modal Header & Cover Image */}
            <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-400 rounded-t-xl relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md">
                <X size={20} />
              </button>
            </div>

            {/* Profile Info */}
            <div className="px-6 pb-6">
              <div className="relative flex justify-between items-end -mt-12 mb-6">
                <img 
                  src={selectedUser.avatar || `https://ui-avatars.com/api/?name=${selectedUser.name}&background=random`} 
                  alt={selectedUser.name} 
                  className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 object-cover bg-white" 
                />
                <span className={`px-3 py-1 rounded-full text-xs font-bold border mb-2 ${
                  selectedUser.role === 'admin' 
                    ? 'bg-primary-100 text-primary-700 border-primary-200 dark:bg-primary-900/30 dark:text-primary-400' 
                    : 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400'
                }`}>
                  {selectedUser.role.toUpperCase()}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedUser.name}</h3>
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <Mail size={16} /> {selectedUser.email}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Contact Details</h4>
                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-start gap-3">
                      <Phone size={18} className="text-gray-400 mt-0.5" />
                      <span>{selectedUser.phone || 'No phone provided'}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-gray-400 mt-0.5" />
                      <span>
                        {selectedUser.address ? (
                          <>
                            {selectedUser.address.street}<br/>
                            {selectedUser.address.city}, {selectedUser.address.state} {selectedUser.address.zipCode}<br/>
                            {selectedUser.address.country}
                          </>
                        ) : 'No address provided'}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar size={18} className="text-gray-400 mt-0.5" />
                      <span>Joined {new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Order Stats */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Customer Summary</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <ShoppingBag size={16} />
                        <span className="text-xs font-medium uppercase tracking-wider">Total Orders</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedUser.totalOrders}</p>
                    </div>
                    <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-xl border border-primary-100 dark:border-primary-900/50">
                      <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-1">
                        <span className="text-xs font-medium uppercase tracking-wider">Total Spent</span>
                      </div>
                      <p className="text-2xl font-bold text-primary-700 dark:text-primary-300">{formatPrice(selectedUser.totalSpent)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-3">
                <button className="flex-1 btn-primary justify-center">Message User</button>
                <button className="flex-1 btn-secondary justify-center text-red-600 hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:border-red-800">Suspend Account</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsersPage;
