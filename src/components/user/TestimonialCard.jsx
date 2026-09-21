import React from 'react';
import { Quote } from 'lucide-react';
import StarRating from './StarRating';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow relative border border-gray-100 dark:border-gray-700 mt-8">
      <div className="absolute -top-6 left-8 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg">
        <Quote size={20} className="fill-current" />
      </div>
      
      <div className="mb-6 mt-2">
        <StarRating rating={testimonial.rating} showCount={false} size="sm" />
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 italic mb-6">
        "{testimonial.comment}"
      </p>
      
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(testimonial.name)}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
        />
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
