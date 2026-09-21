import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Thanks for subscribing!');
    setEmail('');
  };

  return (
    <section className="py-16 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 my-8 shadow-lg">
      {/* Decorative */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl"></div>

      <div className="relative z-10 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay in the Loop</h2>
        <p className="text-primary-100 text-lg mb-8">
          Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            required
          />
          <button
            type="submit"
            className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
