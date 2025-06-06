'use client';

import BackButton from '@/app/components/BackButton';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    categoryId: '',
    images: ['https://placehold.co/600x400']
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState('');

  // Helper function to generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories');
        const categoriesData = await response.json();
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setMessage('Error loading categories');
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, 'https://placehold.co/600x400']
    }));
  };

  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, images: newImages }));
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setMessage('Title is required');
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      setMessage('Price must be greater than 0');
      return false;
    }
    if (!formData.description.trim()) {
      setMessage('Description is required');
      return false;
    }
    if (!formData.categoryId) {
      setMessage('Category is required');
      return false;
    }
    if (formData.images.some(img => !img.trim())) {
      setMessage('All image URLs must be filled');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) {
      return;
    }

    setCreating(true);

    try {
      const payload = {
        title: formData.title.trim(),
        price: Number(formData.price),
        description: formData.description.trim(),
        categoryId: Number(formData.categoryId),
        images: formData.images.filter(img => img.trim())
      };

      console.log('📤 Sending payload to server:', payload);

      const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response ok:', response.ok);

      if (response.ok) {
        const newProduct = await response.json();
        console.log('✅ Product created successfully:', newProduct);
        
        setMessage('Product created successfully!');
        
        // Reset form
        setFormData({
          title: '',
          price: '',
          description: '',
          categoryId: '',
          images: ['https://placehold.co/600x400']
        });

        // Redirect using Next.js router
        setTimeout(() => {
          console.log('🔄 Redirecting to:', `/Product/${newProduct.id}`);
          router.push(`/Product/${newProduct.id}`);
        }, 2000);
      } else {
        const errorText = await response.text();
        console.error('❌ Server response error:', errorText);
        throw new Error(`Failed to create product: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('💥 Create error:', error);
      setMessage(`Failed to create product: ${error.message}`);
    }

    setCreating(false);
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-gray-600">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-4">
          <BackButton />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Product</h1>
        <p className="text-gray-600">Fill in the details below to create a new product</p>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('successfully') 
            ? 'bg-green-100 text-green-700 border border-green-200' 
            : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          
          {/* Title Field */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Product Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product title"
              required
            />
            {formData.title && (
              <p className="mt-1 text-sm text-gray-500">
                Slug will be: {generateSlug(formData.title)}
              </p>
            )}
          </div>

          {/* Price Field */}
          <div className="mb-6">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price (USD) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
              required
            />
          </div>

          {/* Category Field */}
          <div className="mb-6">
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description Field */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product description"
              required
            />
          </div>

          {/* Images Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images *
            </label>
            <div className="space-y-3">
              {formData.images.map((image, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                + Add Another Image
              </button>
            </div>
          </div>

          {/* Preview */}
          {formData.images[0] && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Preview
              </label>
              <img
                src={formData.images[0]}
                alt="Product preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=Invalid+Image';
                }}
              />
            </div>
          )}

        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={creating}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {creating ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}