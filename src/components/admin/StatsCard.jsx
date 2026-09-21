import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StatsCard = ({ title, value, change, changeType, icon: Icon, color }) => {
  const colorStyles = {
    blue: {
      border: 'border-blue-500',
      bg: 'bg-blue-100 dark:bg-blue-500/20',
      text: 'text-blue-600 dark:text-blue-400'
    },
    green: {
      border: 'border-green-500',
      bg: 'bg-green-100 dark:bg-green-500/20',
      text: 'text-green-600 dark:text-green-400'
    },
    yellow: {
      border: 'border-amber-500',
      bg: 'bg-amber-100 dark:bg-amber-500/20',
      text: 'text-amber-600 dark:text-amber-400'
    },
    red: {
      border: 'border-red-500',
      bg: 'bg-red-100 dark:bg-red-500/20',
      text: 'text-red-600 dark:text-red-400'
    },
    purple: {
      border: 'border-purple-500',
      bg: 'bg-purple-100 dark:bg-purple-500/20',
      text: 'text-purple-600 dark:text-purple-400'
    }
  };

  const selectedColor = colorStyles[color] || colorStyles.blue;
  const isIncrease = changeType === 'increase';

  return (
    <div className={`card border-l-4 ${selectedColor.border} hover:shadow-card-hover transition-all duration-300`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>
          
          <div className="flex items-center mt-2">
            <span className={`flex items-center text-sm font-medium ${isIncrease ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isIncrease ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
              {change}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              vs last month
            </span>
          </div>
        </div>
        
        <div className={`p-3 rounded-xl flex-shrink-0 ${selectedColor.bg} ${selectedColor.text}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
