import React from 'react';

const Badge = ({ variant = 'primary', children, size = 'sm', showDot = false }) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full";
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
  };
  
  // These should map to badge-* classes in index.css if they exist,
  // but we provide tailwind fallback classes just in case
  const variantClasses = {
    primary: "bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 badge-primary",
    success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 badge-success",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 badge-warning",
    danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 badge-danger",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 badge-info",
  };
  
  const dotClasses = {
    primary: "bg-primary-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}>
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotClasses[variant]}`}></span>
      )}
      {children}
    </span>
  );
};

export default Badge;
