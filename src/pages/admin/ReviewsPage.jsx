import React from 'react';
import { Star } from 'lucide-react';

const AdminReviewsPage = () => {
  return (
    <div className="page-enter space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reviews</h1>
      <div className="card">
        <p className="text-gray-500 dark:text-gray-400">Manage customer reviews here.</p>
        
        {/* Placeholder for reviews list */}
        <div className="mt-6 space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">John Doe</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">Oct 24, 2023</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Great Product!</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">I really loved this mechanical keyboard. Highly recommended.</p>
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">Product: Keychron K2 Wireless Mechanical Keyboard</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReviewsPage;
