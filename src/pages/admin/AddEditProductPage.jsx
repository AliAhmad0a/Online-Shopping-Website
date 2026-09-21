import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Save, X, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { products } from '../../data/products';
import { categories } from '../../data/categories';

const AddEditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    price: '',
    originalPrice: '',
    category: categories[0]?.id || '',
    subcategory: '',
    brand: '',
    sku: '',
    tags: '',
    stock: '',
    weight: '',
    images: [''],
    colors: '',
    sizes: '',
    features: [''],
    specifications: [{ key: '', value: '' }]
  });

  useEffect(() => {
    if (isEditMode) {
      const product = products.find(p => p.id === id);
      if (product) {
        setFormData({
          name: product.name || '',
          shortDescription: product.shortDescription || '',
          description: product.description || '',
          price: product.price || '',
          originalPrice: product.originalPrice || '',
          category: product.category || categories[0]?.id || '',
          subcategory: product.subcategory || '',
          brand: product.brand || '',
          sku: product.sku || '',
          tags: product.tags?.join(', ') || '',
          stock: product.stock || '',
          weight: product.weight || '',
          images: product.images?.length > 0 ? product.images : [''],
          colors: product.colors?.join(', ') || '',
          sizes: product.sizes?.join(', ') || '',
          features: product.features?.length > 0 ? product.features : [''],
          specifications: product.specifications ? 
            Object.entries(product.specifications).map(([key, value]) => ({ key, value })) : 
            [{ key: '', value: '' }]
        });
      } else {
        toast.error('Product not found');
        navigate('/admin/products');
      }
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, field, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field, emptyValue = '') => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], emptyValue] }));
  };

  const removeArrayItem = (index, field) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray.length ? newArray : [''] };
    });
  };

  const handleSpecChange = (index, field, value) => {
    setFormData(prev => {
      const newSpecs = [...prev.specifications];
      newSpecs[index] = { ...newSpecs[index], [field]: value };
      return { ...prev, specifications: newSpecs };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.price || !formData.stock) {
      toast.error('Please fill in all required fields (Name, Price, Stock)');
      return;
    }

    // In a real app, you would send data to API here
    console.log('Saving product:', formData);
    
    toast.success(`Product ${isEditMode ? 'updated' : 'created'} successfully!`);
    navigate('/admin/products');
  };

  const discountPercentage = formData.originalPrice && formData.price 
    ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100) 
    : 0;

  return (
    <div className="page-enter max-w-5xl mx-auto pb-12">
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <nav className="flex text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Link to="/admin" className="hover:text-primary-600 transition-colors">Dashboard</Link>
          <ChevronRight size={16} className="mx-1" />
          <Link to="/admin/products" className="hover:text-primary-600 transition-colors">Products</Link>
          <ChevronRight size={16} className="mx-1" />
          <span className="text-gray-900 dark:text-white font-medium">{isEditMode ? 'Edit Product' : 'Add Product'}</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h2>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => navigate('/admin/products')} className="btn-secondary">
              <X size={18} className="mr-2" /> Cancel
            </button>
            <button type="button" onClick={handleSubmit} className="btn-primary">
              <Save size={18} className="mr-2" /> Save Product
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="Enter product name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description</label>
                  <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows="2" className="input-field" placeholder="Brief summary of the product"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows="5" className="input-field" placeholder="Detailed product description"></textarea>
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Media</h3>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URLs</label>
                {formData.images.map((url, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input 
                      type="url" 
                      value={url} 
                      onChange={(e) => handleArrayChange(index, 'images', e.target.value)} 
                      className="input-field" 
                      placeholder="https://example.com/image.jpg" 
                    />
                    <button type="button" onClick={() => removeArrayItem(index, 'images')} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('images')} className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 flex items-center gap-1 mt-2">
                  <Plus size={16} /> Add Another Image
                </button>
                
                {/* Image Previews */}
                {formData.images.some(url => url) && (
                  <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    {formData.images.filter(url => url).map((url, index) => (
                      <div key={index} className="w-24 h-24 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800">
                        <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Invalid+Image' }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Features & Attributes */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Features & Attributes</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Colors (comma separated)</label>
                    <input type="text" name="colors" value={formData.colors} onChange={handleChange} className="input-field" placeholder="Red, Blue, Green" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sizes (comma separated)</label>
                    <input type="text" name="sizes" value={formData.sizes} onChange={handleChange} className="input-field" placeholder="S, M, L, XL" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Features</label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input 
                        type="text" 
                        value={feature} 
                        onChange={(e) => handleArrayChange(index, 'features', e.target.value)} 
                        className="input-field" 
                        placeholder="E.g., Noise cancelling" 
                      />
                      <button type="button" onClick={() => removeArrayItem(index, 'features')} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('features')} className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 flex items-center gap-1">
                    <Plus size={16} /> Add Feature
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specifications</label>
                  {formData.specifications.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input 
                        type="text" 
                        value={spec.key} 
                        onChange={(e) => handleSpecChange(index, 'key', e.target.value)} 
                        className="input-field w-1/3" 
                        placeholder="Name (e.g., Material)" 
                      />
                      <input 
                        type="text" 
                        value={spec.value} 
                        onChange={(e) => handleSpecChange(index, 'value', e.target.value)} 
                        className="input-field flex-1" 
                        placeholder="Value (e.g., Cotton)" 
                      />
                      <button type="button" onClick={() => removeArrayItem(index, 'specifications')} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('specifications', { key: '', value: '' })} className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 flex items-center gap-1">
                    <Plus size={16} /> Add Specification
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Pricing</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Selling Price ($) *</label>
                  <input type="number" step="0.01" min="0" name="price" value={formData.price} onChange={handleChange} className="input-field" placeholder="0.00" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Original Price ($)</label>
                  <input type="number" step="0.01" min="0" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="input-field" placeholder="0.00" />
                </div>
                {discountPercentage > 0 && (
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-3 rounded-lg flex items-center justify-between text-sm">
                    <span>Discount applied:</span>
                    <span className="font-bold">{discountPercentage}% OFF</span>
                  </div>
                )}
              </div>
            </div>

            {/* Organization */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Organization</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="input-field">
                    <option value="">Select a category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subcategory</label>
                  <input type="text" name="subcategory" value={formData.subcategory} onChange={handleChange} className="input-field" placeholder="e.g., Laptops" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Brand</label>
                  <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="input-field" placeholder="e.g., Apple" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma separated)</label>
                  <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="input-field" placeholder="electronics, sale, new" />
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Inventory</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SKU</label>
                  <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="input-field" placeholder="e.g., APP-MAC-001" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock Quantity *</label>
                  <input type="number" min="0" name="stock" value={formData.stock} onChange={handleChange} className="input-field" placeholder="0" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight (kg)</label>
                  <input type="number" step="0.01" min="0" name="weight" value={formData.weight} onChange={handleChange} className="input-field" placeholder="0.00" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditProductPage;
