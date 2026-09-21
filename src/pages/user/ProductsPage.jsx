import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Grid, List as ListIcon, ChevronRight } from 'lucide-react';
import ProductCard from '../../components/user/ProductCard';
import ProductFilters from '../../components/user/ProductFilters';
import EmptyState from '../../components/shared/EmptyState';
import { products } from '../../data/products';
import { filterProducts, sortProducts } from '../../utils/filters';
import useDebounce from '../../hooks/useDebounce';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  
  const [filters, setFilters] = useState({
    search: '',
    category: initialCategory,
    priceRange: [0, 1000],
    minRating: 0,
    brands: [],
    inStock: false
  });
  
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const itemsPerPage = 8;
  
  const debouncedFilters = useDebounce(filters, 300);
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let result = filterProducts(products, debouncedFilters);
      result = sortProducts(result, sortBy);
      setFilteredData(result);
      setCurrentPage(1);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [debouncedFilters, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedProducts = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="page-enter bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="hover:text-primary-600">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Products</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden flex items-center justify-center gap-2 btn-secondary w-full"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Filter size={20} />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <ProductFilters filters={filters} setFilters={setFilters} />
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {/* Top Bar */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-soft mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{filteredData.length}</span> products
              </p>
              
              <div className="flex items-center gap-4">
                <select 
                  className="input-field py-2"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">Popularity</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Average Rating</option>
                  <option value="name">Name (A-Z)</option>
                </select>
                
                <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                  <button 
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow dark:bg-gray-600' : 'text-gray-500'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid size={20} />
                  </button>
                  <button 
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow dark:bg-gray-600' : 'text-gray-500'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <ListIcon size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid/List */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredData.length === 0 ? (
              <EmptyState 
                title="No products found" 
                description="Try adjusting your filters or search criteria." 
                icon={Filter} 
              />
            ) : (
              <div>
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {paginatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12 gap-2">
                    <button 
                      className="btn-ghost px-4 py-2"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button 
                        key={i}
                        className={`w-10 h-10 rounded-lg font-medium ${currentPage === i + 1 ? 'bg-primary-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button 
                      className="btn-ghost px-4 py-2"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
