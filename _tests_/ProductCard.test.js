import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from '../src/app/components/ProductCard';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function Link({ href, children, ...props }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock fetch globally
global.fetch = jest.fn();

describe('ProductCard Component', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 29.99,
      images: ['https://example.com/image1.jpg']
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 39.99,
      images: ['https://example.com/image2.jpg']
    }
  ];

  beforeEach(() => {
    fetch.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // data check (3 tests)
  describe('Data Flow', () => {
    test('renders products when passed as props', () => {
      render(<ProductCard products={mockProducts} />);
      
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('$29.99')).toBeInTheDocument();
    });

    test('creates correct links to product pages', () => {
      render(<ProductCard products={mockProducts} />);
      
      const links = screen.getAllByRole('link');
      expect(links[0]).toHaveAttribute('href', '/Product/1');
      expect(links[1]).toHaveAttribute('href', '/Product/2');
    });

    test('fetches products from API when no products provided', async () => {
      const mockApiProducts = [
        { id: 1, title: 'API Product', price: 19.99, images: ['api-image.jpg'] }
      ];

      fetch.mockResolvedValueOnce({
        json: async () => mockApiProducts,
      });

      render(<ProductCard />);

      await waitFor(() => {
        expect(screen.getByText('API Product')).toBeInTheDocument();
      });

      expect(fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/products');
    });
  });

  // pagination (4 tests)
  describe('Pagination', () => {
    const manyProducts = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Product ${i + 1}`,
      price: 10 + i,
      images: [`image${i + 1}.jpg`]
    }));

    test('displays pagination when needed', () => {
      render(<ProductCard products={manyProducts} productsPerPage={5} />);
      
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
      expect(screen.getByText('Showing 1-5 of 10 products')).toBeInTheDocument();
    });

    test('hides pagination when showPagination is false', () => {
      render(<ProductCard products={manyProducts} showPagination={false} />);
      
      expect(screen.queryByText('Previous')).not.toBeInTheDocument();
      expect(screen.queryByText('Next')).not.toBeInTheDocument();
    });

    test('pagination navigation works', () => {
      render(<ProductCard products={manyProducts} productsPerPage={5} />);
      
      // Start on page 1
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Previous')).toBeDisabled();
      
      // Click next
      fireEvent.click(screen.getByText('Next'));
      
      // Now on page 2
      expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
      expect(screen.getByText('Product 6')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeDisabled();
    });

    test('handles empty products array', () => {
      render(<ProductCard products={[]} />);
      
      expect(screen.queryByText('Previous')).not.toBeInTheDocument();
      expect(screen.queryByText(/Showing/)).not.toBeInTheDocument();
    });
  });

  // image check(1 test)
  describe('Error Handling', () => {
    test('handles image loading errors', () => {
      render(<ProductCard products={mockProducts} />);
      
      const image = screen.getAllByRole('img')[0];
      fireEvent.error(image);
      
      expect(image).toHaveAttribute('src', 'https://via.placeholder.com/300x200?text=No+Image');
    });
  });
});