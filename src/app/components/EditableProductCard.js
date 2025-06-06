'use client';

import Highlighted from './Textstyle';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EditableProductCard({ 
  products = null,
  productsPerPage = 8,
  showPagination = true
}) {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!products) {
      async function fetchProduct() {
        const res = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await res.json();
        setAllProducts(data);
      }
      fetchProduct();
    }
  }, [products]);

  const displayProducts = products || allProducts;

  const totalPages = Math.ceil(displayProducts.length / productsPerPage);
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const currentProducts = displayProducts.slice(start, end);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [displayProducts]);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <Link
            key={product.id}
            href={`/admin/products/edit/${product.id}`}
            className="transform transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-white shadow-md rounded-xl overflow-hidden h-70">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-40 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                  {product.title}
                </h3>
                <p>
                  <Highlighted>${product.price}</Highlighted>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-4">
          <button
            className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="self-center font-medium text-gray-400">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {displayProducts.length > 0 && (
        <div className="text-center mt-4 text-sm text-gray-600">
          Showing {start + 1}-{Math.min(end, displayProducts.length)} of {displayProducts.length} products
        </div>
      )}
    </div>
  );
}
