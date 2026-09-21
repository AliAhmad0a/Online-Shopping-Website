import React, { useState } from 'react';
import { ShieldCheck, Camera, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || ''
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPwd, setShowPwd] = useState({ current: false, new: false, confirm: false });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile(formData);
      toast.success('Admin profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.new.length < 8) return toast.error('New password must be at least 8 characters');
    if (passwordData.new !== passwordData.confirm) return toast.error('Passwords do not match');
    
    setIsSaving(true);
    setTimeout(() => {
      toast.success('Password updated successfully');
      setPasswordData({ current: '', new: '', confirm: '' });
      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto page-enter dark:bg-gray-900 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Profile</h1>
            <ShieldCheck className="text-primary-600 w-6 h-6" />
          </div>
          <div className="text-sm breadcrumbs text-gray-500">
            <Link to="/admin" className="hover:text-primary-600">Dashboard</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">Profile</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card shadow-card p-6 dark:bg-gray-800 flex flex-col items-center">
            <div className="relative mb-6 group cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 text-4xl font-bold overflow-hidden border-4 border-white dark:border-gray-700 shadow-md">
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
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-1">{user?.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 text-center">{user?.email}</p>
            <span className="bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Administrator
            </span>
            
            <div className="w-full pt-6 border-t border-gray-100 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
                Member since {new Date(user?.joinedAt || Date.now()).toLocaleDateString()}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">124</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Products Managed</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">892</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Orders Processed</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg col-span-2">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">3,421</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Users Registered</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Forms */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card shadow-card p-6 dark:bg-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">Basic Information</h3>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input type="text" className="input-field w-full" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address (Read Only)</label>
                  <input type="email" className="input-field w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed" value={user?.email || ''} disabled />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                  <input type="text" className="input-field w-full" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button type="submit" disabled={isSaving} className="btn-primary py-2 px-6">
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>

          <div className="card shadow-card p-6 dark:bg-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">Security</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
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
              <div className="pt-4 flex justify-end">
                <button type="submit" disabled={isSaving} className="btn-secondary py-2 px-6 text-primary-600 border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
