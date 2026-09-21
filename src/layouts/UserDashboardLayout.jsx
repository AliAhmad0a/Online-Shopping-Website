import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LayoutDashboard, Package, Heart, MessageSquare, Star, Settings, LogOut } from 'lucide-react';

const UserDashboardLayout = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/account', label: 'Overview', icon: LayoutDashboard },
    { path: '/account/orders', label: 'My Orders', icon: Package },
    { path: '/account/wishlist', label: 'Wishlist', icon: Heart },
    { path: '/account/messages', label: 'Messages', icon: MessageSquare },
    { path: '/account/reviews', label: 'Reviews', icon: Star },
    { path: '/account/settings', label: 'Settings', icon: Settings },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="container-custom py-8 page-enter min-h-screen flex flex-col md:flex-row gap-8">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-card">
        <span className="font-bold text-gray-900 dark:text-white">Dashboard Menu</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 dark:text-gray-300">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`md:w-64 flex-shrink-0 ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
        <div className="card shadow-card overflow-hidden dark:bg-gray-800 sticky top-24">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 flex items-center justify-center text-2xl font-bold mb-4 overflow-hidden">
              {user?.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : user?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="font-bold text-gray-900 dark:text-white text-center">{user?.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center truncate w-full">{user?.email}</p>
          </div>
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path || (link.path !== '/account' && location.pathname.startsWith(link.path) && location.pathname !== '/account');
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 border-l-4 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 border-l-4 border-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
            <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
            <button
              onClick={logout}
              className="flex items-center gap-3 px-6 py-3 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-l-4 border-transparent transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 animate-fade-in w-full max-w-full overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboardLayout;
