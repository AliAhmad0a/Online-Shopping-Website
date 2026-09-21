import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Sun, Moon, ShoppingBag, Heart, ShoppingCart, User, Menu, X, Search, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import categories from '../../data/categories';
import products from '../../data/products';

const Navbar = () => {
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { wishlistItems } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const query = searchQuery.toLowerCase();
      const results = products.filter(
        p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
      ).slice(0, 5);
      setSearchResults(results);
      setShowSearchDropdown(true);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 w-full bg-white dark:bg-gray-900 transition-shadow duration-300 ${isScrolled ? 'shadow-nav' : ''}`}>
      {/* Top bar */}
      <div className="bg-primary-600 dark:bg-primary-900 text-white py-1">
        <div className="container-custom flex justify-between items-center text-xs sm:text-sm">
          <p className="hidden sm:block">Free shipping on orders over $50!</p>
          <p className="sm:hidden">Free shipping over $50!</p>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:block">Contact: support@shopsphere.com</span>
            <button onClick={toggleTheme} className="p-1 rounded-full hover:bg-primary-500 dark:hover:bg-primary-800 transition-colors focus:outline-none" aria-label="Toggle dark mode">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-custom py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary-600 dark:text-primary-400">
            <ShoppingBag size={28} className="text-accent-500" />
            <span>ShopSphere</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white rounded-full p-1.5 hover:bg-primary-700 transition-colors">
                <Search size={14} />
              </button>
            </form>
          </div>

          {/* Nav Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link to="/account/wishlist" className="relative text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <Heart size={24} />
              {wishlistItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="hidden sm:block relative group">
              <Link to={isAuthenticated ? "/account" : "/login"} className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <User size={24} />
              </Link>
              {isAuthenticated && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">My Profile</Link>
                  <Link to="/account/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">My Orders</Link>
                  {isAdmin && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-primary-600 dark:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <LayoutDashboard size={14} className="inline mr-2" /> Admin Dashboard
                    </Link>
                  )}
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
                    <LogOut size={14} className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Category Bar (Desktop) */}
      <div className="hidden md:block container-custom">
        <ul className="flex space-x-8 py-3 text-sm font-medium text-gray-700 dark:text-gray-200">
          <li>
            <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">All Products</Link>
          </li>
          {categories?.slice(0, 6).map(category => (
            <li key={category.id}>
              <Link to={`/products?category=${category.slug}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={closeMobileMenu}></div>
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-primary-600 dark:text-primary-400" onClick={closeMobileMenu}>
            <ShoppingBag size={24} className="text-accent-500" />
            <span>ShopSphere</span>
          </Link>
          <button onClick={closeMobileMenu} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </form>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            <li>
              <Link to="/" className="block px-4 py-2 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" onClick={closeMobileMenu}>Home</Link>
            </li>
            <li>
              <Link to="/products" className="block px-4 py-2 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" onClick={closeMobileMenu}>Products</Link>
            </li>
            <li>
              <div className="px-4 py-2 text-base font-medium text-gray-900 dark:text-gray-100 flex justify-between items-center" onClick={() => setShowCategories(!showCategories)}>
                Categories <ChevronDown size={18} className={`transform transition-transform ${showCategories ? 'rotate-180' : ''}`} />
              </div>
              {showCategories && (
                <ul className="pl-6 space-y-1 mt-1">
                  {categories?.map(category => (
                    <li key={category.id}>
                      <Link to={`/products?category=${category.slug}`} className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400" onClick={closeMobileMenu}>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="my-2 border-t border-gray-200 dark:border-gray-800"></li>
            <li>
              <Link to="/account/orders" className="block px-4 py-2 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" onClick={closeMobileMenu}>My Orders</Link>
            </li>
            <li>
              <Link to="/account/wishlist" className="block px-4 py-2 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" onClick={closeMobileMenu}>Wishlist</Link>
            </li>
            {isAdmin && (
              <li>
                <Link to="/admin" className="block px-4 py-2 text-base font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg" onClick={closeMobileMenu}>Admin Dashboard</Link>
              </li>
            )}
          </ul>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          {isAuthenticated ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>
              <button onClick={() => { logout(); closeMobileMenu(); }} className="w-full py-2 px-4 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex justify-center items-center">
                <LogOut size={18} className="mr-2" /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex justify-center items-center" onClick={closeMobileMenu}>
              <User size={18} className="mr-2" /> Login / Register
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

