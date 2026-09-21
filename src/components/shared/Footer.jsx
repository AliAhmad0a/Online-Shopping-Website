import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 transition-colors duration-300">
      <div className="container-custom">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm mb-12 border border-gray-100 dark:border-gray-700">
          <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Subscribe to our newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400">Get the latest updates on new products and upcoming sales.</p>
          </div>
          <form className="w-full md:w-auto flex-1 max-w-md flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
            <button type="submit" className="btn-primary whitespace-nowrap px-6 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors">
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary-600 dark:text-primary-400">
              <ShoppingBag size={28} className="text-accent-500" />
              <span>ShopSphere</span>
            </Link>
            <p className="text-sm leading-relaxed mt-4">
              Your one-stop destination for all your shopping needs. We provide high-quality products with the best customer service and fast delivery worldwide.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="Youtube" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Products</Link></li>
              <li><Link to="/about" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li><Link to="/faq" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Return Policy</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
                <span>123 Commerce Blvd, Suite 400<br/>New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-primary-600 dark:text-primary-400 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-primary-600 dark:text-primary-400 shrink-0" />
                <span>support@shopsphere.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
          <p>&copy; 2024 ShopSphere. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-500">Secure Payments:</span>
            <span className="font-bold">Visa</span>
            <span className="font-bold">Mastercard</span>
            <span className="font-bold">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
