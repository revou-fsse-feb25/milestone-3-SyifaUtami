import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductSearch from '../src/app/components/ProductSearch';

// Mock the EditableProductCard component
jest.mock('../src/app/components/EditableProductCard', () => {
  return function MockEditableProductCard({ products, productsPerPage, showPagination }) {
    return (
      <div data-testid="editable-product-card">
        <div data-testid="products-count">{products?.length || 0}</div>
        <div data-testid="products-per-page">{productsPerPage}</div>
        <div data-testid="show-pagination">{showPagination.toString()}</div>
        {products?.map((product, index) => (
          <div key={product.id || index} data-testid={`product-${product.id}`}>
            {product.title}
          </div>
        ))}
      </div>
    );
  };
});

describe('ProductSearch Component', () => {
  let originalFetch;
  
  beforeAll(() => {
    originalFetch = global.fetch;
  });
  
  afterAll(() => {
    global.fetch = originalFetch;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // data check(2 tests)
  describe('Data Flow', () => {
    test('fetches from correct API endpoint', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue([])
      });
      global.fetch = mockFetch;
      
      await ProductSearch({});
      
      expect(mockFetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/products');
    });

    test('displays all products when no search term', async () => {
      const products = [
        { id: 1, title: 'Product 1' },
        { id: 2, title: 'Product 2' }
      ];
      
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(products)
      });
      
      const result = await ProductSearch({});
      render(result);
      
      await waitFor(() => {
        expect(screen.getByTestId('products-count')).toHaveTextContent('2');
      });
    });
  });

  // search function (3 tests)
  describe('Search Functionality', () => {
    test('filters products by search term', async () => {
      const products = [
        { id: 1, title: 'iPhone Case' },
        { id: 2, title: 'Samsung Charger' },
        { id: 3, title: 'Nike Shoes' }
      ];
      
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(products)
      });
      
      const result = await ProductSearch({ searchParams: { search: 'iPhone' } });
      render(result);
      
      await waitFor(() => {
        expect(screen.getByTestId('products-count')).toHaveTextContent('1');
        expect(screen.getByTestId('product-1')).toHaveTextContent('iPhone Case');
      });
    });

    test('search is case insensitive', async () => {
      const products = [
        { id: 1, title: 'UPPERCASE PRODUCT' },
        { id: 2, title: 'lowercase product' }
      ];
      
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(products)
      });
      
      const result = await ProductSearch({ searchParams: { search: 'product' } });
      render(result);
      
      await waitFor(() => {
        expect(screen.getByTestId('products-count')).toHaveTextContent('2');
      });
    });

    test('shows no results for non-matching search', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue([])
      });
      
      const result = await ProductSearch({ searchParams: { search: 'nonexistent' } });
      render(result);
      
      await waitFor(() => {
        expect(screen.getByText('No results found for "nonexistent" want us to steal it? >:)')).toBeInTheDocument();
      });
    });
  });

  // search results (2 tests)
  describe('Search Results Info', () => {
    test('shows correct count message', async () => {
      const searchResults = [
        { id: 1, title: 'Test Product Alpha' },
        { id: 2, title: 'Test Product Beta' }
      ];
      
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(searchResults)
      });
      
      const result = await ProductSearch({ searchParams: { search: 'Test' } });
      render(result);
      
      await waitFor(() => {
        expect(screen.getByText('Found 2 results for "Test"')).toBeInTheDocument();
      });
    });

    test('does not show search info when no search term', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue([{ id: 1, title: 'Product' }])
      });
      
      const result = await ProductSearch({});
      render(result);
      
      await waitFor(() => {
        expect(screen.getByTestId('products-count')).toHaveTextContent('1');
      });
      
      expect(screen.queryByText(/Found \d+ results/)).not.toBeInTheDocument();
    });
  });

  // error (2 tests)
  describe('Error Handling', () => {
    test('handles network failure', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
      
      const result = await ProductSearch({});
      render(result);
      
      expect(screen.getByText('Error loading products. Please try again.')).toBeInTheDocument();
      expect(screen.queryByTestId('editable-product-card')).not.toBeInTheDocument();
      
      consoleSpy.mockRestore();
    });

    test('handles API server errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500
      });
      
      const result = await ProductSearch({});
      render(result);
      
      expect(screen.getByText('Error loading products. Please try again.')).toBeInTheDocument();
      
      consoleSpy.mockRestore();
    });
  });

  // form check (2 tests)
  describe('Form Functionality', () => {
    test('renders search form correctly', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue([])
      });
      
      const result = await ProductSearch({});
      render(result);
      
      const searchInput = screen.getByPlaceholderText('search stolen stuff');
      const searchButton = screen.getByRole('button', { name: 'Search' });
      
      expect(searchInput).toHaveAttribute('name', 'search');
      expect(searchButton).toHaveAttribute('type', 'submit');
    });

    test('pre-fills search input with search term', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue([])
      });
      
      const result = await ProductSearch({ searchParams: { search: 'test-search' } });
      render(result);
      
      expect(screen.getByDisplayValue('test-search')).toBeInTheDocument();
    });
  });
});