import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductTile from '../src/app/components/ProductTile';

// Mock the CartContext
const mockUpdateQuantity = jest.fn();
const mockRemoveFromCart = jest.fn();

jest.mock('../src/app/Context/CartContext', () => ({
  useCart: () => ({
    updateQuantity: mockUpdateQuantity,
    removeFromCart: mockRemoveFromCart
  })
}));

describe('ProductTile Component', () => {
  const mockItem = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    quantity: 2,
    images: ['https://example.com/image1.jpg']
  };

  beforeEach(() => {
    mockUpdateQuantity.mockClear();
    mockRemoveFromCart.mockClear();
  });

  // data check(3 tests)
  describe('Data Flow', () => {
    test('renders product information correctly', () => {
      render(<ProductTile item={mockItem} />);
      
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('$29.99')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/image1.jpg');
    });

    test('displays calculated total price', () => {
      render(<ProductTile item={mockItem} />);
      
      // 29.99 x 2 = 59.98
      expect(screen.getByText('$59.98')).toBeInTheDocument();
    });

    test('handles image fallback', () => {
      const itemWithoutImages = { ...mockItem, images: [], image: undefined };
      render(<ProductTile item={itemWithoutImages} />);
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', '/placeholder-image.jpg');
    });
  });

  // user interacting (5 tests)
  describe('User Interactions', () => {
    test('increment button increases quantity', () => {
      render(<ProductTile item={mockItem} />);
      
      const incrementBtn = screen.getByRole('button', { name: '+' });
      fireEvent.click(incrementBtn);
      
      expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
    });

    test('decrement button decreases quantity', () => {
      const itemWithHigherQuantity = { ...mockItem, quantity: 5 };
      render(<ProductTile item={itemWithHigherQuantity} />);
      
      const decrementBtn = screen.getByRole('button', { name: '-' });
      fireEvent.click(decrementBtn);
      
      expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 4);
    });

    test('decrement disabled at quantity 1', () => {
      const itemWithQuantityOne = { ...mockItem, quantity: 1 };
      render(<ProductTile item={itemWithQuantityOne} />);
      
      const decrementBtn = screen.getByRole('button', { name: '-' });
      expect(decrementBtn).toBeDisabled();
    });

    test('remove button works', () => {
      render(<ProductTile item={mockItem} />);
      
      const removeBtn = screen.getByRole('button', { name: 'Remove' });
      fireEvent.click(removeBtn);
      
      expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
    });

    test('handles rapid clicking', () => {
      render(<ProductTile item={mockItem} />);
      
      const incrementBtn = screen.getByRole('button', { name: '+' });
      
      fireEvent.click(incrementBtn);
      fireEvent.click(incrementBtn);
      fireEvent.click(incrementBtn);
      
      expect(mockUpdateQuantity).toHaveBeenCalledTimes(3);
    });
  });

  //math(4 tests)
  describe('Calculations', () => {
    test('calculates total correctly', () => {
      const item = { ...mockItem, price: 10.50, quantity: 3 };
      render(<ProductTile item={item} />);
      
      expect(screen.getByText('$31.50')).toBeInTheDocument();
    });

    test('handles zero price', () => {
      const freeItem = { ...mockItem, price: 0, quantity: 5 };
      render(<ProductTile item={freeItem} />);
      
      expect(screen.getAllByText('$0.00')).toHaveLength(2); // Price and total
    });

    test('formats prices with 2 decimals', () => {
      const item = { ...mockItem, price: 5, quantity: 1 };
      render(<ProductTile item={item} />);
      
      expect(screen.getAllByText('$5.00')).toHaveLength(2); // Price and total
    });

    test('handles missing data gracefully', () => {
      const incompleteItem = { id: 1 }; // Missing everything except ID
      
      render(<ProductTile item={incompleteItem} />);
      
      expect(screen.getByText('Unknown Product')).toBeInTheDocument();
      expect(screen.getAllByText('$0.00')).toHaveLength(2);
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });
});