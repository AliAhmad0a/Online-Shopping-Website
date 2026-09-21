import React from 'react';
import { Truck, Shield, Headphones, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    subtitle: 'On orders over $50'
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    subtitle: '100% protected'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    subtitle: 'Dedicated support'
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    subtitle: '30-day return policy'
  }
];

export default function FeatureBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
      {features.map((feature, idx) => {
        const Icon = feature.icon;
        return (
          <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Icon size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{feature.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
}
