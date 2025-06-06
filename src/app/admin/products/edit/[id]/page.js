'use client';

import BackButton from '@/app/components/BackButton';
import { useState, useEffect, use } from 'react';

export default function EditableProductPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [originalData, setOriginalData] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    categoryId: '',
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  
  // Track which fields are being edited
  const [editingFields, setEditingFields] = useState({
    title: false,
    price: false,
    description: false,
    categoryId: false,
  });

  //make title slug: cool red hoodie into cool-red-hoodie
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with oneo nly
      .trim();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          fetch(`https://api.escuelajs.co/api/v1/products/${id}`),
          fetch('https://api.escuelajs.co/api/v1/categories'),
        ]);

        if (!productRes.ok) {
          throw new Error('Product not found');
        }

        const productData = await productRes.json();
        const categoriesData = await categoriesRes.json();

        setProduct(productData);
        setCategories(categoriesData);
        
        // Store original data for comparison
        const originalFormData = {
          title: productData.title,
          price: productData.price,
          description: productData.description,
          categoryId: productData.category?.id || '',
        };
        
        setOriginalData(originalFormData);
        setFormData(originalFormData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error loading product data');
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleFieldClick = (fieldName) => {
    setEditingFields(prev => ({
      ...prev,
      [fieldName]: true
    }));
    setMessage(''); // Clear any previous messages
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = (fieldName) => {
    // Reset specific field to original value
    setFormData(prev => ({
      ...prev,
      [fieldName]: originalData[fieldName]
    }));
    
    // Stop editing this field
    setEditingFields(prev => ({
      ...prev,
      [fieldName]: false
    }));
    setMessage('');
  };

  const getChangedAttributes = () => {
    const changed = {};
    
    // Only check fields that are being edited
    if (editingFields.title && formData.title !== originalData.title) {
      changed.title = formData.title;
      changed.slug = generateSlug(formData.title); // Auto-generate slug when title changes
    }
    
    if (editingFields.price && Number(formData.price) !== Number(originalData.price)) {
      changed.price = Number(formData.price);
    }
    
    if (editingFields.description && formData.description !== originalData.description) {
      changed.description = formData.description;
    }
    
    if (editingFields.categoryId && Number(formData.categoryId) !== Number(originalData.categoryId)) {
      changed.categoryId = Number(formData.categoryId);
    }

    return changed;
  };

  const handleSave = async () => {
    setUpdating(true);
    setMessage('');

    const changedAttributes = getChangedAttributes();
    
    // If no changes, don't make API call
    if (Object.keys(changedAttributes).length === 0) {
      setMessage('No changes detected');
      setUpdating(false);
      return;
    }

    try {
      // Use the API documentation format that works
      const payload = {
        id: Number(id),
        title: formData.title,
        slug: generateSlug(formData.title),
        price: Number(formData.price),
        description: formData.description,
        images: product.images || ["https://placehold.co/600x400"],
        category: {
          id: Number(formData.categoryId),
          name: categories.find(c => c.id === Number(formData.categoryId))?.name || '',
          image: categories.find(c => c.id === Number(formData.categoryId))?.image || 'https://placehold.co/600x400',
          slug: categories.find(c => c.id === Number(formData.categoryId))?.slug || ''
        }
      };

      const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Fetch the updated product to get the latest data
        const refreshRes = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const updated = await refreshRes.json();
        
        setProduct(updated);
        
        // Update original data to reflect new state
        const newOriginalData = {
          title: updated.title,
          price: updated.price,
          description: updated.description,
          categoryId: updated.category?.id || '',
        };
        setOriginalData(newOriginalData);
        setFormData(newOriginalData);
        
        // Stop editing all fields
        setEditingFields({
          title: false,
          price: false,
          description: false,
          categoryId: false,
        });
        
        setMessage('Product updated successfully!');
      } else {
        const errorText = await res.text();
        throw new Error(`Failed to update: ${res.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Update error:', error);
      setMessage(`Failed to update product: ${error.message}`);
    }

    setUpdating(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          alert('Product deleted successfully!');
          window.location.href = '/admin/products';
        } else {
          alert('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  const isAnyFieldEditing = Object.values(editingFields).some(Boolean);
  const hasChanges = Object.keys(getChangedAttributes()).length > 0;

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-red-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Editor</h1>
        
        {/* Action Buttons - Show when editing */}
        {isAnyFieldEditing && (
          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleSave}
              disabled={updating || !hasChanges}
              className="px-6 py-3 bg-[#1C1C1C] text-[#1ceff4] rounded-lg hover:bg-black transition-colors font-medium disabled:opacity-70"
            >
              {updating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
      

      {/* Message */}
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.includes('successfully') || message.includes('No changes') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {/* Changes Preview */}
      {hasChanges && (
        <div className="mb-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-medium text-yellow-800 mb-2">Changes to be saved:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            {Object.entries(getChangedAttributes()).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {typeof value === 'string' ? `"${value}"` : value}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Product Display/Edit */}
      <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
        {/*backbutton*/}
        <div className="md:flex-shrink-0 mb-6 md:mb-0">
          <div className="mb-3">
            <BackButton/>
          </div>
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
            alt={product.title}
            className="w-full max-w-md h-96 object-cover shadow-md rounded-lg"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
            }}
          />
        </div>

        {/* Product Info - click to editstuff*/}
        <div className="flex-1 space-y-6">
          
          {/* Title Field */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Title</h3>
            {!editingFields.title ? (
              <div 
                onClick={() => handleFieldClick('title')}
                className="text-2xl font-bold text-gray-900 cursor-pointer hover:bg-gray-50 p-2 rounded-lg border-2 border-transparent hover:border-[#1ceff4] transition-all"
                title="Click to edit"
              >
                {product.title}
                <span className="ml-2 text-sm text-gray-400">edit</span>
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="text-2xl font-bold w-full p-2 border-2 border-[#1ceff4] rounded-lg focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => handleCancel('title')}
                  className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Price Field */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Price</h3>
            {!editingFields.price ? (
              <div 
                onClick={() => handleFieldClick('price')}
                className="text-3xl cursor-pointer hover:bg-gray-50 p-2 rounded-lg border-2 border-transparent hover:border-[#1ceff4] transition-all"
                title="Click to edit"
              >
                ${product.price}
                <span className="ml-2 text-sm text-gray-400">edit</span>
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="text-3xl font-bold text-black w-full p-2 border-2 border-[#1ceff4] rounded-lg focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => handleCancel('price')}
                  className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Category Field */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Category</h3>
            {!editingFields.categoryId ? (
              <div 
                onClick={() => handleFieldClick('categoryId')}
                className="text-lg text-gray-700 cursor-pointer hover:bg-gray-50 p-2 rounded-lg border-2 border-transparent hover:border-[#1ceff4] transition-all"
                title="Click to edit"
              >
                {product.category?.name || 'No category'}
                <span className="ml-2 text-sm text-gray-400">edit</span>
              </div>
            ) : (
              <div className="space-y-2">
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="text-lg w-full p-2 border-2 border-[#1ceff4] rounded-lg focus:outline-none"
                  autoFocus
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleCancel('categoryId')}
                  className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Description</h3>
            {!editingFields.description ? (
              <div 
                onClick={() => handleFieldClick('description')}
                className="text-gray-600 leading-relaxed cursor-pointer hover:bg-gray-50 p-3 rounded-lg border-2 border-transparent hover:border-[#1ceff4] transition-all min-h-[100px]"
                title="Click to edit"
              >
                {product.description || 'No description provided.'}
                <span className="ml-2 text-sm text-gray-400">edit</span>
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-[#1ceff4] rounded-lg focus:outline-none min-h-[120px]"
                  rows="6"
                  autoFocus
                />
                <button
                  onClick={() => handleCancel('description')}
                  className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Product ID (Read-only) */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Product ID</h3>
            <p className="text-gray-600 p-2">{product.id}</p>
          </div>

          {/* Delete Button*/}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Delete Product
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}