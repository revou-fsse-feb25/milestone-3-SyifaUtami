'use client';
import Highlighted from './Textstyle';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch('https://api.escuelajs.co/api/v1/products');
      const data = await res.json();
      setProducts(data);
    }
    fetchProduct();
  }, []);

//count page number//
  const totalPages = Math.ceil(products.length / productsPerPage);
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const currentProducts = products.slice(start, end);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
        <Link
            key={product.id}
            href={`/Product/${product.id}`}
            className="transform transition-transform duration-300 hover:scale-105"
        >
          <div key={product.id} className="bg-white shadow-md rounded-xl overflow-hidden h-70">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h3>{product.title}</h3>
                <p> {''} <Highlighted> ${product.price} </Highlighted> </p>
            </div>
          </div>
        </Link>
        ))}
      </div>

      {/* page buttons */}
      <div className="flex justify-center mt-8 space-x-4">
        <button className='cursor-pointer'
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="self-center font-medium text-gray-400">
          Page {currentPage} of {totalPages}
        </span>

        <button className='cursor-pointer'
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

/*
  export default function ProductCard() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      async function fetchProduct() {
        const res = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await res.json();
        setProducts(data.slice(0, 8));
      }
      fetchProduct();
    }, []);
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-xl overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3>{product.title}</h3>
              <p> {''} <Highlighted> ${product.price} </Highlighted> </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  */