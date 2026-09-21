import React, { useState } from 'react';
import { Save, AlertTriangle, Moon, Sun } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'ShopSphere',
    storeEmail: 'contact@shopsphere.com',
    storePhone: '+1 (555) 123-4567',
    currency: 'USD',
    address: '123 E-commerce Blvd, Suite 100, Tech City, TC 12345'
  });

  const [notifications, setNotifications] = useState({
    orderAlerts: true,
    lowStock: true,
    newUsers: false,
    newsletter: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleStoreChange = (e) => {
    setStoreSettings({ ...storeSettings, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleSaveStoreSettings = (e) => {
    e.preventDefault();
    toast.success('Store settings updated successfully');
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    toast.success('Password updated successfully');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleResetData = () => {
    if (window.confirm('WARNING: This will reset all store data (products, orders, users) to default values. Are you absolutely sure?')) {
      toast.success('Store data reset successful');
    }
  };

  return (
    <div className="page-enter max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your store configuration and preferences</p>
      </div>

      {/* Store Settings */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Store Profile</h3>
        <form onSubmit={handleSaveStoreSettings} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Store Name</label>
              <input type="text" name="storeName" value={storeSettings.storeName} onChange={handleStoreChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency</label>
              <select name="currency" value={storeSettings.currency} onChange={handleStoreChange} className="input-field">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Store Email</label>
              <input type="email" name="storeEmail" value={storeSettings.storeEmail} onChange={handleStoreChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Store Phone</label>
              <input type="tel" name="storePhone" value={storeSettings.storePhone} onChange={handleStoreChange} className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Store Address</label>
            <textarea name="address" value={storeSettings.address} onChange={handleStoreChange} rows="2" className="input-field"></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              <Save size={18} className="mr-2" /> Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* Appearance */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Theme Preference</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark mode</p>
          </div>
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'dark' ? (
              <><Sun size={18} className="text-amber-500" /> <span>Light Mode</span></>
            ) : (
              <><Moon size={18} className="text-primary-600" /> <span>Dark Mode</span></>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'orderAlerts', label: 'New Order Alerts', desc: 'Receive an email when a new order is placed' },
            { key: 'lowStock', label: 'Low Stock Alerts', desc: 'Get notified when a product inventory drops below 20' },
            { key: 'newUsers', label: 'New Registrations', desc: 'Receive an email for every new customer registration' },
            { key: 'newsletter', label: 'Newsletter Subscriptions', desc: 'Get weekly summary of new newsletter subscribers' }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notifications[item.key]}
                  onChange={() => handleNotificationChange(item.key)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Account Security */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Account Security</h3>
        <form onSubmit={handleSavePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
            <input type="password" value={passwordForm.currentPassword} onChange={e => setPasswordForm({...passwordForm, currentPassword: e.target.value})} className="input-field max-w-md" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
            <input type="password" value={passwordForm.newPassword} onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})} className="input-field max-w-md" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
            <input type="password" value={passwordForm.confirmPassword} onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} className="input-field max-w-md" required />
          </div>
          <div className="flex justify-start">
            <button type="submit" className="btn-secondary">Update Password</button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="card border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
          <AlertTriangle size={20} /> Danger Zone
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Reset All Data</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete all custom data and restore defaults.</p>
          </div>
          <button 
            onClick={handleResetData}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Reset Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
