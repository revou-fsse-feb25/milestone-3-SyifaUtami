import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardStats from '../src/app/components/DashboardStats';

// Mock React Icons
jest.mock('react-icons/fa', () => ({
  FaBoxOpen: () => <div data-testid="icon-box" />,
  FaTags: () => <div data-testid="icon-tags" />,
  FaMask: () => <div data-testid="icon-mask" />,
  FaLayerGroup: () => <div data-testid="icon-layer" />,
  FaPlus: () => <div data-testid="icon-plus" />,
  FaUserCog: () => <div data-testid="icon-user-cog" />,
  FaChevronRight: () => <div data-testid="icon-chevron" />,
}));

describe('DashboardStats Component', () => {
  const mockData = {
    totalProducts: 1250,
    totalCategories: 8,
    totalUsers: 3420,
    avgProductsPerCategory: 156,
    categoryStats: [
      {
        id: 1,
        name: 'Electronics',
        count: 450,
        percentage: 36
      },
      {
        id: 2,
        name: 'Clothing',
        count: 350,
        percentage: 28
      }
    ]
  };

  // ✅ DATA FLOW (2 tests)
  describe('Data Flow', () => {
    test('renders dashboard when data is provided', () => {
      render(<DashboardStats data={mockData} />);
      
      expect(screen.getByText('1,250')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.getByText('3,420')).toBeInTheDocument();
      expect(screen.getByText('156')).toBeInTheDocument();
    });

    test('displays error message when data is missing', () => {
      render(<DashboardStats data={null} />);
      
      expect(screen.getByText(/Failed to load dashboard data/)).toBeInTheDocument();
    });
  });

  // checkdata in category (2 tests)
  describe('Category Data', () => {
    test('displays category information', () => {
      render(<DashboardStats data={mockData} />);
      
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('450')).toBeInTheDocument();
      expect(screen.getByText('(36%)')).toBeInTheDocument();
    });

    test('handles empty category list', () => {
      const emptyData = {
        ...mockData,
        categoryStats: []
      };
      
      render(<DashboardStats data={emptyData} />);
      
      expect(screen.getByText('0 categories total')).toBeInTheDocument();
    });
  });

  // ✅ USER INTERACTIONS (1 test)
  describe('User Interactions', () => {
    test('buttons are functional', () => {
      render(<DashboardStats data={mockData} />);
      
      const addButton = screen.getByRole('button', { name: /add new product/i });
      const manageButton = screen.getByRole('button', { name: /manage users/i });
      
      expect(addButton).toBeEnabled();
      expect(manageButton).toBeEnabled();
      
      // Test clicking doesn't break anything
      fireEvent.click(addButton);
      fireEvent.click(manageButton);
    });
  });
});