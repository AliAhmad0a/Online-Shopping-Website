import React from 'react';
import { ThumbsUp } from 'lucide-react';
import StarRating from './StarRating';

export default function ReviewCard({ review }) {
  const getTimeAgo = (date) => {
    // Basic placeholder for time ago if not pre-formatted
    return date || 'Recently';
  };

  return (
    <div className="py-6 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(review.name)}
            alt={review.name}
            className="w-10 h-10 rounded-full object-cover bg-gray-100"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 dark:text-white">{review.name}</span>
              {review.isVerified && (
                <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                  Verified Purchase
                </span>
              )}
            </div>
            <StarRating rating={review.rating} showCount={false} size="sm" />
          </div>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {getTimeAgo(review.date)}
        </span>
      </div>

      <h4 className="font-bold text-gray-900 dark:text-white mb-2">{review.title}</h4>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{review.comment}</p>

      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
        <ThumbsUp size={16} />
        <span>Helpful ({review.helpfulCount || 0})</span>
      </button>
    </div>
  );
}
