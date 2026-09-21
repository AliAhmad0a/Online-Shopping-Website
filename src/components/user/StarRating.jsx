import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating = 0, count = 0, size = 'sm', showCount = true }) {
  const roundedRating = Math.round(rating * 2) / 2;
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const iconClass = sizeClasses[size] || sizeClasses.sm;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= roundedRating;
          const isHalf = star - 0.5 === roundedRating;
          
          return (
            <div key={star} className="relative">
              {isHalf ? (
                <>
                  <Star className={`${iconClass} text-gray-300 dark:text-gray-600 absolute`} />
                  <Star className={`${iconClass} text-amber-400 fill-amber-400`} style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)' }} />
                </>
              ) : (
                <Star
                  className={`${iconClass} ${
                    isFilled
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      {showCount && count > 0 && (
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
          ({count})
        </span>
      )}
    </div>
  );
}
