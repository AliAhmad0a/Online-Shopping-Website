import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

const Breadcrumb = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className="flex text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap overflow-x-auto py-3 no-scrollbar" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <Home size={16} className="mr-1" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHiddenOnMobile = items.length > 3 && index > 0 && index < items.length - 1;
          
          return (
            <li key={index} className={isHiddenOnMobile ? 'hidden sm:flex' : 'flex'}>
              <div className="flex items-center">
                <ChevronRight size={16} className="text-gray-400 mx-1" />
                {isLast ? (
                  <span className="text-gray-900 dark:text-gray-200 font-medium truncate max-w-[150px] sm:max-w-[300px]" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    to={item.path} 
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors truncate max-w-[100px] sm:max-w-none"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
