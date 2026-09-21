import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { reviews } from '../../../data/reviews';
import { useAuth } from '../../../context/AuthContext';
import { products } from '../../../data/products';

const ReviewsPage = () => {
  const { user } = useAuth();
  
  // Mock filtering: in reality, we'd filter by userId, but here we just take some reviews
  // Assume user's name matches or just show some sample reviews if not found
  let userReviews = reviews.filter(r => r.userName === user?.name);
  if (userReviews.length === 0) {
    // Fallback: assign first 3 reviews to this user for display purposes
    userReviews = reviews.slice(0, 3);
  }

  // Get product names for reviews
  const reviewsWithProducts = userReviews.map(review => {
    const product = products.find(p => p.id === review.productId);
    return { ...review, productName: product?.name || 'Unknown Product' };
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Reviews</h1>
      
      {reviewsWithProducts.length > 0 ? (
        <div className="space-y-4">
          {reviewsWithProducts.map(review => (
            <div key={review.id} className="card p-6 shadow-soft dark:bg-gray-800">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    <Link to={`/product/${review.productId}`} className="hover:text-primary-600 transition-colors">
                      {review.productName}
                    </Link>
                  </h3>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`} />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center text-gray-500 dark:bg-gray-800">
          <Star className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">No reviews yet</p>
          <p>You haven't reviewed any products.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
