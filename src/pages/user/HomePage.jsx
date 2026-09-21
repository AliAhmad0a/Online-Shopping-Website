import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../../components/user/HeroBanner';
import FeatureBar from '../../components/user/FeatureBar';
import CategoryCard from '../../components/user/CategoryCard';
import ProductCard from '../../components/user/ProductCard';
import NewsletterSection from '../../components/user/NewsletterSection';
import TestimonialCard from '../../components/user/TestimonialCard';
import { categories } from '../../data/categories';
import { products } from '../../data/products';

const HomePage = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    // Hardcode a future date (e.g., 3 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const flashDeals = products.filter(p => p.discount > 0).slice(0, 6);
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  const testimonials = [
    { id: 1, name: 'John Doe', role: 'Customer', text: 'Great products and fast shipping!', rating: 5, avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Jane Smith', role: 'Customer', text: 'I love the quality of the clothes. Highly recommended.', rating: 4, avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Mike Johnson', role: 'Customer', text: 'Excellent customer service and easy returns.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=3' }
  ];

  return (
    <div className="page-enter">
      <div className="container-custom section space-y-12">
        <HeroBanner />
        <FeatureBar />
        
        {/* Shop by Category */}
        <section className="section">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Flash Deals */}
        <section className="section bg-red-50 dark:bg-red-900/10 p-8 rounded-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400">Flash Deals</h2>
              <p className="text-gray-600 dark:text-gray-400">Hurry up! Offer ends in:</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-soft text-center min-w-[60px]">
                <span className="block text-2xl font-bold text-primary-600">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-xs text-gray-500">Hours</span>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-soft text-center min-w-[60px]">
                <span className="block text-2xl font-bold text-primary-600">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-xs text-gray-500">Mins</span>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-soft text-center min-w-[60px]">
                <span className="block text-2xl font-bold text-red-500 animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-xs text-gray-500">Secs</span>
              </div>
            </div>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-4 snap-x">
            {flashDeals.map(product => (
              <div key={product.id} className="min-w-[280px] snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="section">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Featured Products</h2>
            <Link to="/products?featured=true" className="text-primary-600 hover:text-primary-700 font-medium">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* New Arrivals & Best Sellers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 section">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-2">New Arrivals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {newArrivals.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-2">Best Sellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {bestSellers.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <section className="section bg-gray-50 dark:bg-gray-800/50 p-8 md:p-12 rounded-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </section>

        <NewsletterSection />
      </div>
    </div>
  );
};

export default HomePage;
