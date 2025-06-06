import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddToCart from '../src/app/components/AddToCart';

// Mock the useCart hook
const mockAddToCart = jest.fn();
const mockCartItems = [];

jest.mock('../src/app/Context/CartContext', () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
    cartItems: mockCartItems
  })
}));

describe('AddToCart Component', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 100,
    images: ['test-image.jpg']
  };

  beforeEach(() => {
    mockAddToCart.mockClear();
    mockCartItems.length = 0;
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  // checkingdata flow stuff(2 tests)
  describe('Data Flow', () => {
    test('renders with initial quantity of 1', () => {
      render(<AddToCart product={mockProduct} />);
      
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    });

    test('updates quantity when product exists in cart', () => {
      mockCartItems.push({ id: 1, quantity: 5 });
      
      render(<AddToCart product={mockProduct} />);
      
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  // user interact wirh buttons (4 tests)
  describe('User Interactions', () => {
    test('increment and decrement buttons work', () => {
      render(<AddToCart product={mockProduct} />);
      
      const incrementBtn = screen.getByText('+');
      const decrementBtn = screen.getByText('-');
      
      // Initially at 1, decrement should be disabled
      expect(decrementBtn).toBeDisabled();
      
      // Increment to 2
      fireEvent.click(incrementBtn);
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(decrementBtn).not.toBeDisabled();
      
      // Decrement back to 1
      fireEvent.click(decrementBtn);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(decrementBtn).toBeDisabled();
    });

    test('prevents quantity from going below 1', () => {
      render(<AddToCart product={mockProduct} />);
      
      const decrementBtn = screen.getByText('-');
      
      // Try to decrease below 1, shouldn't be possible
      fireEvent.click(decrementBtn);
      fireEvent.click(decrementBtn);
      
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    test('add to cart button works correctly', () => {
      render(<AddToCart product={mockProduct} />);
      
      const incrementBtn = screen.getByText('+');
      const addToCartBtn = screen.getByText('Add to Cart');
      
      // Set quantity to 3
      fireEvent.click(incrementBtn);
      fireEvent.click(incrementBtn);
      
      fireEvent.click(addToCartBtn);
      
      expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 3);
    });

    test('calculates quantity difference for existing cart items', () => {
      // Product already has 2 items in cart
      mockCartItems.push({ id: 1, quantity: 2 });
      
      render(<AddToCart product={mockProduct} />);
      
      const incrementBtn = screen.getByText('+');
      const addToCartBtn = screen.getByText('Add to Cart');
      
      // Increase to 5 (from existing 2)
      fireEvent.click(incrementBtn);
      fireEvent.click(incrementBtn);
      fireEvent.click(incrementBtn);
      
      fireEvent.click(addToCartBtn);
      
      // Should add 3 more items (5 - 2 = 3)
      expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 3);
    });
  });

  // ✅ UI FEEDBACK (2 tests)
  describe('UI Feedback', () => {
    test('shows success message after adding to cart', () => {
      render(<AddToCart product={mockProduct} />);
      
      const addToCartBtn = screen.getByText('Add to Cart');
      fireEvent.click(addToCartBtn);
      
      expect(screen.getByText('1 item added to cart!')).toBeInTheDocument();
    });

    test('success message disappears after timeout', () => {
      render(<AddToCart product={mockProduct} />);
      
      const addToCartBtn = screen.getByText('Add to Cart');
      fireEvent.click(addToCartBtn);
      
      expect(screen.getByText('1 item added to cart!')).toBeInTheDocument();
      
      // Fast-forward time
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      expect(screen.queryByText('1 item added to cart!')).not.toBeInTheDocument();
    });
  });
});