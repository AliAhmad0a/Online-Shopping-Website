import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const ErrorState = ({ 
  title = 'Something went wrong', 
  message = 'An unexpected error occurred while loading this page. Please try again later.', 
  onRetry, 
  showHomeLink = true 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle size={40} className="text-red-500 dark:text-red-400" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
        {title}
      </h2>
      
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        {message}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        {onRetry && (
          <button 
            onClick={onRetry}
            className="flex items-center justify-center px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-sm"
          >
            <RefreshCw size={18} className="mr-2" />
            Try Again
          </button>
        )}
        
        {showHomeLink && (
          <Link 
            to="/"
            className="flex items-center justify-center px-6 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium shadow-sm"
          >
            Back to Home
          </Link>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
