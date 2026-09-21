export const filterProducts = (products, filters) => {
  return products.filter(product => {
    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(query);
      const matchDesc = product.description.toLowerCase().includes(query);
      if (!matchName && !matchDesc) return false;
    }

    // Category filter
    if (filters.category && filters.category !== 'All') {
      if (product.category !== filters.category) return false;
    }

    // Subcategory filter
    if (filters.subcategory) {
      if (product.subcategory !== filters.subcategory) return false;
    }

    // Price range filter
    if (filters.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) return false;
    }

    // Min rating filter
    if (filters.minRating) {
      if (product.rating < filters.minRating) return false;
    }

    // Brands filter
    if (filters.brands && filters.brands.length > 0) {
      if (!filters.brands.includes(product.brand)) return false;
    }

    // In stock filter
    if (filters.inStock) {
      if (product.stock <= 0) return false;
    }

    return true;
  });
};

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'popular':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    default:
      return sorted;
  }
};

export const getUniqueValues = (products, key) => {
  const values = products.map(product => product[key]);
  return [...new Set(values)].filter(Boolean);
};

export const getPriceRange = (products) => {
  if (!products || products.length === 0) return { min: 0, max: 0 };
  
  const prices = products.map(p => p.price);
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices))
  };
};
