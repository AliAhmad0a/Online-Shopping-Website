export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const calculateDiscount = (original, discounted) => {
  if (!original || !discounted) return 0;
  const diff = original - discounted;
  return Math.round((diff / original) * 100);
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

export const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const getStockStatus = (stock) => {
  if (stock === 0) return { label: 'Out of Stock', color: 'text-red-500' };
  if (stock < 10) return { label: `Low Stock (${stock} left)`, color: 'text-amber-500' };
  return { label: 'In Stock', color: 'text-green-500' };
};
