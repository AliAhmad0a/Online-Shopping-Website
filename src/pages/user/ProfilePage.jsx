import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Edit3, MapPin, Package, Heart, ShieldCheck, LogOut, Camera, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { user, logout, updateProfile, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  
  // Edit Profile State
  const [editData, setEditData] = useState({ name: user?.name || '', phone: user?.phone || '', avatar: user?.avatar || '' });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Address State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({ label: 'Home', street: '', city: '', state: '', zip: '', country: '', phone: '' });

  // Password State
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [showPwd, setShowPwd] = useState({ current: false, new: false, confirm: false });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      await updateProfile(editData);
      toast.success('Profile updated successfully');
      setActiveTab('info');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAddressId) {
        await updateAddress(editingAddressId, addressForm);
        toast.success('Address updated successfully');
      } else {
        await addAddress(addressForm);
        toast.success('Address added successfully');
      }
      setShowAddressForm(false);
      setEditingAddressId(null);
      setAddressForm({ label: 'Home', street: '', city: '', state: '', zip: '', country: '', phone: '' });
    } catch (err) {
      toast.error('Failed to save address');
    }
  };

  const handleEditAddress = (addr) => {
    setAddressForm(addr);
    setEditingAddressId(addr.id);
    setShowAddressForm(true);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.new.length < 8) return toast.error('New password must be at least 8 characters');
    if (passwordData.new !== passwordData.confirm) return toast.error('Passwords do not match');
    
    setIsUpdatingPassword(true);
    setTimeout(() => {
      toast.success('Password changed successfully');
      setIsUpdatingPassword(false);
      setPasswordData({ current: '', new: '', confirm: '' });
      setActiveTab('info');
    }, 800);
  };

  const tabs = [
    { id: 'info', label: 'Profile Information', icon: User },
    { id: 'edit', label: 'Edit Profile', icon: Edit3 },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'password', label: 'Change Password', icon: ShieldCheck },
  ];

  return (
    <div className="container-custom py-8 page-enter min-h-screen">
      <div className="text-sm breadcrumbs text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">My Account</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="card p-6 shadow-card mb-6 flex flex-col items-center dark:bg-gray-800">
            <div className="relative mb-4 group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 text-3xl font-bold overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user?.name?.charAt(0).toUpperCase()
                )}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white w-8 h-8" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">{user?.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 text-center">{user?.email}</p>
            {user?.role === 'admin' && (
              <span className="badge-primary px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">Admin</span>
            )}
          </div>

          <div className="card shadow-card overflow-hidden dark:bg-gray-800">
            <nav className="flex flex-col">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-6 py-4 text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 border-l-4 border-primary-600'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 border-l-4 border-transparent'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <Link to="/orders" className="flex items-center gap-3 px-6 py-4 text-left text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 border-l-4 border-transparent">
                <Package className="w-5 h-5" />
                <span className="font-medium">My Orders</span>
              </Link>
              <Link to="/wishlist" className="flex items-center gap-3 px-6 py-4 text-left text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 border-l-4 border-transparent">
                <Heart className="w-5 h-5" />
                <span className="font-medium">Wishlist</span>
              </Link>
              <button onClick={logout} className="flex items-center gap-3 px-6 py-4 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-l-4 border-transparent transition-colors mt-2">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full lg:w-3/4 animate-fade-in">
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="card p-6 shadow-card dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Full Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email Address</p>
                    <p className="font-medium text-gray-900 dark:text-white">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone Number</p>
                    <p className="font-medium text-gray-900 dark:text-white">{user?.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Member Since</p>
                    <p className="font-medium text-gray-900 dark:text-white">{new Date(user?.joinedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-6 shadow-card dark:bg-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Shopping Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Total Orders</span>
                      <span className="font-bold text-gray-900 dark:text-white">{user?.totalOrders || 0}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Total Spent</span>
                      <span className="font-bold text-primary-600 dark:text-primary-400">${(user?.totalSpent || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="card p-6 shadow-card dark:bg-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Default Address</h3>
                  {user?.addresses?.find(a => a.isDefault) ? (
                    <div className="text-gray-600 dark:text-gray-300 space-y-1">
                      {(() => {
                        const addr = user.addresses.find(a => a.isDefault);
                        return (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="badge-primary px-2 py-0.5 rounded text-xs">{addr.label}</span>
                            </div>
                            <p>{addr.street}</p>
                            <p>{addr.city}, {addr.state} {addr.zip}</p>
                            <p>{addr.country}</p>
                            <p className="pt-2 text-sm">Phone: {addr.phone}</p>
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <p className="mb-4">No default address set.</p>
                      <button onClick={() => setActiveTab('addresses')} className="text-primary-600 hover:underline font-medium">Manage Addresses</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'edit' && (
            <div className="card p-6 shadow-card dark:bg-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Edit Profile</h3>
              <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input type="text" className="input-field w-full" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email (Cannot be changed)</label>
                  <input type="email" className="input-field w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed" value={user?.email} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                  <input type="text" className="input-field w-full" value={editData.phone} onChange={e => setEditData({...editData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avatar URL</label>
                  <input type="url" className="input-field w-full" placeholder="https://example.com/avatar.jpg" value={editData.avatar} onChange={e => setEditData({...editData, avatar: e.target.value})} />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button type="submit" disabled={isUpdatingProfile} className="btn-primary py-2 px-6">
                    {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button type="button" onClick={() => setActiveTab('info')} className="btn-secondary py-2 px-6">Cancel</button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">My Addresses</h3>
                {!showAddressForm && (
                  <button onClick={() => { setAddressForm({ label: 'Home', street: '', city: '', state: '', zip: '', country: '', phone: '' }); setEditingAddressId(null); setShowAddressForm(true); }} className="btn-primary py-2 px-4 text-sm">
                    + Add New Address
                  </button>
                )}
              </div>

              {showAddressForm ? (
                <div className="card p-6 shadow-card dark:bg-gray-800">
                  <h4 className="text-lg font-semibold mb-4">{editingAddressId ? 'Edit Address' : 'Add New Address'}</h4>
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Label</label>
                        <select className="input-field w-full" value={addressForm.label} onChange={e => setAddressForm({...addressForm, label: e.target.value})}>
                          <option value="Home">Home</option>
                          <option value="Work">Work</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input type="text" className="input-field w-full" required value={addressForm.phone} onChange={e => setAddressForm({...addressForm, phone: e.target.value})} />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Street Address</label>
                        <input type="text" className="input-field w-full" required value={addressForm.street} onChange={e => setAddressForm({...addressForm, street: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">City</label>
                        <input type="text" className="input-field w-full" required value={addressForm.city} onChange={e => setAddressForm({...addressForm, city: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">State / Province</label>
                        <input type="text" className="input-field w-full" required value={addressForm.state} onChange={e => setAddressForm({...addressForm, state: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">ZIP / Postal Code</label>
                        <input type="text" className="input-field w-full" required value={addressForm.zip} onChange={e => setAddressForm({...addressForm, zip: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Country</label>
                        <input type="text" className="input-field w-full" required value={addressForm.country} onChange={e => setAddressForm({...addressForm, country: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button type="submit" className="btn-primary py-2 px-6">Save Address</button>
                      <button type="button" onClick={() => setShowAddressForm(false)} className="btn-secondary py-2 px-6">Cancel</button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user?.addresses?.length > 0 ? user.addresses.map((addr) => (
                    <div key={addr.id} className={`card p-6 shadow-soft hover:shadow-card-hover transition-shadow relative border-2 ${addr.isDefault ? 'border-primary-500' : 'border-transparent'} dark:bg-gray-800`}>
                      {addr.isDefault && (
                        <span className="absolute top-4 right-4 text-xs font-bold bg-primary-100 text-primary-700 px-2 py-1 rounded dark:bg-primary-900 dark:text-primary-300">Default</span>
                      )}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-gray-900 dark:text-white">{addr.label}</span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 text-sm space-y-1 mb-4">
                        <p>{addr.street}</p>
                        <p>{addr.city}, {addr.state} {addr.zip}</p>
                        <p>{addr.country}</p>
                        <p>Phone: {addr.phone}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <button onClick={() => handleEditAddress(addr)} className="text-sm font-medium text-gray-600 hover:text-primary-600 dark:text-gray-400">Edit</button>
                        <span className="text-gray-300 dark:text-gray-600">|</span>
                        <button onClick={() => { deleteAddress(addr.id); toast.success('Address deleted'); }} className="text-sm font-medium text-red-600 hover:text-red-700">Delete</button>
                        {!addr.isDefault && (
                          <>
                            <span className="text-gray-300 dark:text-gray-600">|</span>
                            <button onClick={() => { setDefaultAddress(addr.id); toast.success('Set as default'); }} className="text-sm font-medium text-primary-600 hover:text-primary-700">Set as Default</button>
                          </>
                        )}
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full card p-12 text-center text-gray-500 dark:bg-gray-800">
                      <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p>You haven't saved any addresses yet.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'password' && (
            <div className="card p-6 shadow-card dark:bg-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Change Password</h3>
              <form onSubmit={handleUpdatePassword} className="space-y-6 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                  <div className="relative">
                    <input type={showPwd.current ? "text" : "password"} className="input-field w-full pr-10" required value={passwordData.current} onChange={e => setPasswordData({...passwordData, current: e.target.value})} />
                    <button type="button" onClick={() => setShowPwd({...showPwd, current: !showPwd.current})} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                      {showPwd.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                  <div className="relative">
                    <input type={showPwd.new ? "text" : "password"} className="input-field w-full pr-10" required minLength="8" value={passwordData.new} onChange={e => setPasswordData({...passwordData, new: e.target.value})} />
                    <button type="button" onClick={() => setShowPwd({...showPwd, new: !showPwd.new})} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                      {showPwd.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                  <div className="relative">
                    <input type={showPwd.confirm ? "text" : "password"} className="input-field w-full pr-10" required value={passwordData.confirm} onChange={e => setPasswordData({...passwordData, confirm: e.target.value})} />
                    <button type="button" onClick={() => setShowPwd({...showPwd, confirm: !showPwd.confirm})} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                      {showPwd.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button type="submit" disabled={isUpdatingPassword} className="btn-primary w-full py-2.5">
                    {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
