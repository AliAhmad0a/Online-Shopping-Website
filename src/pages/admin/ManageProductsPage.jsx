import React, { useState } from 'react';
import { Plus, Filter, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/shared/ConfirmModal';
import DataTable from '../../components/admin/DataTable';
import { products as initialProducts } from '../../data/products';
import { formatPrice } from '../../utils/helpers';

const ManageProductsPage = () => {
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState(initialProducts);
  const [stockFilter, setStockFilter] = useState('All');
  
  // Get unique categories for filter
  const categories = ['All', ...new Set(initialProducts.map(p => p.category))];
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const filteredProducts = productsList.filter(product => {
    // Category filter
    if (categoryFilter !== 'All' && product.category !== categoryFilter) return false;
    
    // Stock filter
    if (stockFilter === 'In Stock' && product.stock <= 0) return false;
    if (stockFilter === 'Low Stock' && (product.stock <= 0 || product.stock > 20)) return false;
    if (stockFilter === 'Out of Stock' && product.stock > 0) return false;
    
    return true;
  });

  const handleDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProductsList(prev => prev.filter(p => p.id !== productToDelete.id));
      toast.success('Product deleted successfully');
      setProductToDelete(null);
    }
  };

  const handleEdit = (product) => {
    navigate(`/admin/products/edit/${product.id}`);
  };

  const columns = [
    {
      key: 'product',
      label: 'Product',
      render: (_, item) => (
        <div className="flex items-center gap-3">
          <img 
            src={item.images[0]} 
            alt={item.name} 
            className="w-10 h-10 rounded-md object-cover bg-gray-100 dark:bg-gray-800 flex-shrink-0" 
          />
          <div className="min-w-0 max-w-[200px] sm:max-w-xs lg:max-w-md">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">SKU: {item.sku}</p>
          </div>
        </div>
      ),
      sortable: true
    },
    {
      key: 'category',
      label: 'Category',
      render: (val) => (
        <span className="badge-info">{val}</span>
      ),
      sortable: true
    },
    {
      key: 'price',
      label: 'Price',
      render: (val, item) => (
        <div>
          <span className="font-medium text-gray-900 dark:text-white">{formatPrice(val)}</span>
          {item.originalPrice > val && (
            <span className="text-xs text-gray-500 line-through ml-2">{formatPrice(item.originalPrice)}</span>
          )}
        </div>
      ),
      sortable: true
    },
    {
      key: 'stock',
      label: 'Stock',
      render: (val) => {
        let colorClass = 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
        let text = `${val} in stock`;
        
        if (val === 0) {
          colorClass = 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
          text = 'Out of stock';
        } else if (val <= 20) {
          colorClass = 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400';
          text = `${val} (Low)`;
        }

        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>
            {text}
          </span>
        );
      },
      sortable: true
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (val, item) => (
        <div className="flex items-center gap-1">
          <Star size={14} className="text-amber-500 fill-amber-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{val}</span>
          <span className="text-xs text-gray-500">({item.reviews})</span>
        </div>
      ),
      sortable: true
    }
  ];

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your store's inventory and products</p>
        </div>
        <Link to="/admin/products/new" className="btn-primary">
          <Plus size={20} className="mr-2" /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm w-full sm:w-auto">
          <Filter size={18} className="text-gray-400 ml-2" />
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-transparent border-none text-sm text-gray-700 dark:text-gray-300 focus:ring-0 cursor-pointer w-full"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat} Category</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm w-full sm:w-auto">
          <select 
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="bg-transparent border-none text-sm text-gray-700 dark:text-gray-300 focus:ring-0 cursor-pointer w-full pl-2"
          >
            {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map(status => (
              <option key={status} value={status}>{status} Stock</option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable 
        columns={columns}
        data={filteredProducts}
        searchable={true}
        searchKeys={['name', 'brand', 'sku']}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemsPerPage={10}
      />
    </div>
  );
};

export default ManageProductsPage;

