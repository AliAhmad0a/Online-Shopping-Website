import React from 'react';

const PageLoader = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-800"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading ShopSphere...</p>
    </div>
  );
};

export default PageLoader;
