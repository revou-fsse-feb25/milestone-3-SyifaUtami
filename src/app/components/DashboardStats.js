'use client';

import {
  FaBoxOpen,
  FaTags,
  FaMask,
  FaLayerGroup,
  FaPlus,
  FaUserCog,
  FaChevronRight,
} from 'react-icons/fa';

export default function DashboardStats({ data }) {
  if (!data) {
    return (
      <div className="space-y-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Failed to load dashboard data. Please try again later.
        </div>
      </div>
    );
  }

  const {
    totalProducts,
    totalCategories,
    totalUsers,
    avgProductsPerCategory,
    categoryStats,
  } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's the sins that you've done.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-[#1C1C1C] p-6 rounded-xl text-white border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm font-medium">Stolen Products</p>
              <p className="text-3xl font-bold">{totalProducts.toLocaleString()}</p>
            </div>
            <FaBoxOpen className="w-8 h-8 text-[#1ceff4]" />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Categories</p>
              <p className="text-3xl font-bold text-gray-900">{totalCategories}</p>
            </div>
            <FaTags className="w-8 h-8 text-black" />
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-[#1ceff4] p-6 rounded-xl text-black">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-black text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold">{totalUsers.toLocaleString()}</p>
            </div>
            <FaMask className="w-8 h-8 text-black" />
          </div>
        </div>

        {/* Avg per Category */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg/Category</p>
              <p className="text-3xl font-bold text-gray-900">{avgProductsPerCategory}</p>
            </div>
            <FaLayerGroup className="w-8 h-8 text-black" />
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Products by Category</h2>
              <p className="text-gray-600 text-sm mt-1">Distribution of products across categories</p>
            </div>
            <div className="text-sm text-gray-600">
              {categoryStats.length} categories total
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {categoryStats.map((category, index) => (
            <div
              key={category.id}
              className="group hover:bg-gray-50 p-4 rounded-lg transition-colors border border-transparent hover:border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500"></div>
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    #{index + 1}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-gray-900">
                    {category.count}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({category.percentage}%)
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-teal-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group border border-transparent hover:border-gray-200">
            <div className="flex items-center space-x-3">
              <FaPlus className="w-4 h-4 text-black" />
              <span className="font-medium text-gray-900">Add New Product</span>
            </div>
            <FaChevronRight className="w-4 h-4 text-black" />
          </button>

          <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group border border-transparent hover:border-gray-200">
            <div className="flex items-center space-x-3">
              <FaUserCog className="w-4 h-4 text-black" />
              <span className="font-medium text-gray-900">Manage Users</span>
            </div>
            <FaChevronRight className="w-4 h-4 text-black" />
          </button>

          <div className="pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-2">Data Summary</div>
            <div className="text-sm text-gray-700 space-y-1">
              <div>{totalProducts} products across {totalCategories} categories</div>
              <div>{totalUsers} registered users</div>
              <div>Average {avgProductsPerCategory} products per category</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
