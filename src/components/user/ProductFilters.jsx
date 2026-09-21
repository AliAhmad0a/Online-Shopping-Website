import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import StarRating from './StarRating';

export default function ProductFilters({ filters, onFilterChange, products = [], onClearFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const categories = [...new Set(products.map(p => p.category))].filter(Boolean);
  const brands = [...new Set(products.map(p => p.brand))].filter(Boolean);

  const [expanded, setExpanded] = useState({
    categories: true,
    price: true,
    rating: true,
    brands: true
  });

  const toggleSection = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const activeCount = Object.values(filters).filter(v => {
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'boolean') return v;
    if (v === '' || v === null || v === 0) return false;
    return true;
  }).length;

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <SlidersHorizontal size={20} />
          Filters {activeCount > 0 && <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full text-xs">{activeCount}</span>}
        </h2>
        {activeCount > 0 && (
          <button onClick={onClearFilters} className="text-sm text-primary-600 hover:underline">
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search || ''}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <button onClick={() => toggleSection('categories')} className="flex justify-between w-full items-center font-medium text-gray-900 dark:text-white mb-3">
            Categories
            {expanded.categories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {expanded.categories && (
            <div className="space-y-2">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.categories?.includes(cat)}
                    onChange={(e) => {
                      const newCats = e.target.checked
                        ? [...(filters.categories || []), cat]
                        : (filters.categories || []).filter(c => c !== cat);
                      onFilterChange('categories', newCats);
                    }}
                    className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                  />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{cat}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Price Range */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <button onClick={() => toggleSection('price')} className="flex justify-between w-full items-center font-medium text-gray-900 dark:text-white mb-3">
          Price Range
          {expanded.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {expanded.price && (
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800 text-sm"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800 text-sm"
            />
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <button onClick={() => toggleSection('rating')} className="flex justify-between w-full items-center font-medium text-gray-900 dark:text-white mb-3">
          Rating
          {expanded.rating ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {expanded.rating && (
          <div className="space-y-2">
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating}
                  onChange={() => onFilterChange('minRating', rating)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <StarRating rating={rating} showCount={false} size="sm" />
                <span className="text-gray-700 dark:text-gray-300 text-sm">& up</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brands */}
      {brands.length > 0 && (
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <button onClick={() => toggleSection('brands')} className="flex justify-between w-full items-center font-medium text-gray-900 dark:text-white mb-3">
            Brands
            {expanded.brands ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {expanded.brands && (
            <div className="space-y-2">
              {brands.map(brand => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brands?.includes(brand)}
                    onChange={(e) => {
                      const newBrands = e.target.checked
                        ? [...(filters.brands || []), brand]
                        : (filters.brands || []).filter(b => b !== brand);
                      onFilterChange('brands', newBrands);
                    }}
                    className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                  />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* In Stock */}
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-900 dark:text-white text-sm">In Stock Only</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock || false}
            onChange={(e) => onFilterChange('inStock', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 font-medium w-full justify-center mb-4"
      >
        <SlidersHorizontal size={18} />
        Filter Products {activeCount > 0 && `(${activeCount})`}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 h-fit sticky top-4 shadow-sm">
        <FilterContent />
      </div>

      {/* Mobile Slide-out Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative w-4/5 max-w-sm bg-white dark:bg-gray-900 h-full overflow-y-auto p-6 shadow-xl animate-fade-in-up">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <X size={24} />
            </button>
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
}
