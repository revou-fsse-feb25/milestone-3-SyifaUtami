import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditableProductCard from '../src/app/components/EditableProductCard';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock the Highlighted component
jest.mock('../src/app/components/Textstyle', () => {
  return function MockHighlighted({ children }) {
    return <span>{children}</span>;
  };
});

// Mock fetch
global.fetch = jest.fn();

describe('EditableProductCard Component', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 100,
      images: ['https://example.com/image1.jpg']
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 200,
      images: ['https://example.com/image2.jpg']
    },
    {
      id: 3,
      title: 'Test Product 3',
      price: 300,
      images: ['https://example.com/image3.jpg']
    }
  ];

  beforeEach(() => {
    fetch.mockClear();
    fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([])
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // data check (3 tests)
  describe('Data Flow', () => {
    test('displays products when passed as props', () => {
      render(<EditableProductCard products={mockProducts} />);
      
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('$100')).toBeInTheDocument();
    });

    test('fetches products when no props provided', async () => {
      const apiProducts = [
        { id: 1, title: 'API Product', price: 50, images: ['api-image.jpg'] }
      ];
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(apiProducts)
      });

      render(<EditableProductCard />);
      
      await waitFor(() => {
        expect(screen.getByText('API Product')).toBeInTheDocument();
      });
      
      expect(fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/products');
    });

    test('generates correct edit links', () => {
      render(<EditableProductCard products={mockProducts} />);
      
      const links = screen.getAllByRole('link');
      expect(links[0]).toHaveAttribute('href', '/admin/products/edit/1');
      expect(links[1]).toHaveAttribute('href', '/admin/products/edit/2');
    });
  });

  // pagination hadling (3 tests)
  describe('Pagination', () => {
    test('calculates pagination correctly', () => {
      render(<EditableProductCard products={mockProducts} productsPerPage={2} />);
      
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
      expect(screen.getByText('Showing 1-2 of 3 products')).toBeInTheDocument();
    });

    test('navigation works correctly', () => {
      render(<EditableProductCard products={mockProducts} productsPerPage={2} />);
      
      // Start on page 1, Previous disabled
      expect(screen.getByText('Previous')).toBeDisabled();
      
      // Go to page 2
      fireEvent.click(screen.getByText('Next'));
      expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
      
      // Next should now be disabled
      expect(screen.getByText('Next')).toBeDisabled();
      
      // Go back to page 1
      fireEvent.click(screen.getByText('Previous'));
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    });

    test('hides pagination when showPagination is false', () => {
      render(<EditableProductCard products={mockProducts} showPagination={false} />);
      
      expect(screen.queryByText('Previous')).not.toBeInTheDocument();
      expect(screen.queryByText('Next')).not.toBeInTheDocument();
    });
  });

  // broken/empty images (2 tests)
  describe('Error Handling', () => {
    test('handles broken images with fallback', () => {
      render(<EditableProductCard products={mockProducts} />);
      
      const firstImage = screen.getAllByRole('img')[0];
      fireEvent.error(firstImage);
      
      expect(firstImage.src).toBe('https://via.placeholder.com/300x200?text=No+Image');
    });

    test('handles empty products array', () => {
      render(<EditableProductCard products={[]} />);
      
      expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
      expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    });
  });
});