import EditableProductCard from "./EditableProductCard";

export default async function ProductSearch({ searchParams }) {
  const resolvedSearchParams = searchParams instanceof Promise //nextjs 15 now can be promise
    ? await searchParams 
    : searchParams;
  
  // Extract search term
  const searchTerm = resolvedSearchParams?.search || "";
  
  let products = [];
  
  try {
    // Get all products
    const res = await fetch('https://api.escuelajs.co/api/v1/products');
    
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const allProducts = await res.json();
    
    if (searchTerm && searchTerm.trim() !== "") {
      // Filter products by title (case insensitive)
      products = allProducts.filter(product => 
        product.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // Show all products when no search term
      products = allProducts;
    }
    
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <main className="p-6">
        <div className="text-center">
          <p className="text-red-500">Error loading products. Please try again.</p>
        </div>
      </main>
    );
  }
  
  return (
    <main>
      {/* Search Form */}
      <div className="p-6 bg-gray-50">
        <form className="max-w-2xl mx-auto">
          <div className="flex gap-4">
            <input 
              type="text"
              placeholder="search stolen stuff"
              name="search"
              defaultValue={searchTerm} 
              className="flex-1 p-4 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 rounded px-6 py-4 text-white font-medium transition-colors"
            >
              Search
            </button>
          </div>
          
          {/* Search Results Info */}
          {searchTerm && (
            <div className="mt-4 text-sm text-gray-600">
              {products.length > 0 
                ? `Found ${products.length} results for "${searchTerm}"` 
                : `No results found for "${searchTerm}" want us to steal it? >:)`
              }
            </div>
          )}
        </form>
      </div>
      
      {/* Results */}
      <EditableProductCard 
        products={products}
        productsPerPage={12}
        showPagination={true}
      />
    </main>
  );
}