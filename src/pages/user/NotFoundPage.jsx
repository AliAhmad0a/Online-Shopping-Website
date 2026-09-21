import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="page-enter min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-xl">
        <div className="relative inline-block mb-8">
          <h1 className="text-[150px] font-black text-gray-200 dark:text-gray-800 leading-none select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 px-4">Oops!</span>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary flex justify-center items-center gap-2 py-3 px-8">
            <Home size={20} /> Back to Home
          </Link>
          <Link to="/products" className="btn-secondary flex justify-center items-center gap-2 py-3 px-8">
            <ShoppingBag size={20} /> Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
