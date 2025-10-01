import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

// Mock product data
const mockProduct = {
  _id: '123',
  name: 'Test Product',
  description: 'This is a test product description',
  price: 99.99,
  stock: 10,
  category: 'Electronics',
  image: 'https://example.com/image.jpg',
};

// Helper function to render with contexts
const renderWithContexts = (component, { isAuthenticated = false, addToCart = vi.fn() } = {}) => {
  const authContextValue = {
    isAuthenticated,
    user: isAuthenticated ? { name: 'Test User', email: 'test@example.com' } : null,
    login: vi.fn(),
    logout: vi.fn(),
  };

  const cartContextValue = {
    cart: { items: [], totalPrice: 0 },
    addToCart,
    removeFromCart: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn(),
  };

  return render(
    <BrowserRouter>
      <AuthContext.Provider value={authContextValue}>
        <CartContext.Provider value={cartContextValue}>
          {component}
        </CartContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('ProductCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render product information correctly', () => {
    renderWithContexts(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(/This is a test product description/)).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('10 in stock')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('should display product image', () => {
    renderWithContexts(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.image);
  });

  it('should show "Out of stock" for products with zero stock', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    renderWithContexts(<ProductCard product={outOfStockProduct} />);

    expect(screen.getByText('Out of stock')).toBeInTheDocument();
  });

  it('should disable "Add to Cart" button when out of stock', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    renderWithContexts(<ProductCard product={outOfStockProduct} />);

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addButton).toBeDisabled();
  });

  it('should show login message when unauthenticated user tries to add to cart', async () => {
    renderWithContexts(<ProductCard product={mockProduct} />, {
      isAuthenticated: false,
    });

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Please login to add items to cart')).toBeInTheDocument();
    });
  });

  it('should call addToCart when authenticated user clicks button', async () => {
    const mockAddToCart = vi.fn().mockResolvedValue({ success: true });

    renderWithContexts(<ProductCard product={mockProduct} />, {
      isAuthenticated: true,
      addToCart: mockAddToCart,
    });

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalledWith('123', 1);
    });
  });

  it('should show success message after adding to cart', async () => {
    const mockAddToCart = vi.fn().mockResolvedValue({ success: true });

    renderWithContexts(<ProductCard product={mockProduct} />, {
      isAuthenticated: true,
      addToCart: mockAddToCart,
    });

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Added to cart!')).toBeInTheDocument();
    });
  });

  it('should show error message when add to cart fails', async () => {
    const mockAddToCart = vi.fn().mockResolvedValue({
      success: false,
      error: 'Failed to add to cart',
    });

    renderWithContexts(<ProductCard product={mockProduct} />, {
      isAuthenticated: true,
      addToCart: mockAddToCart,
    });

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to add to cart')).toBeInTheDocument();
    });
  });

  it('should disable button while adding to cart', async () => {
    const mockAddToCart = vi.fn().mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ success: true }), 100))
    );

    renderWithContexts(<ProductCard product={mockProduct} />, {
      isAuthenticated: true,
      addToCart: mockAddToCart,
    });

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    // Button should show "Adding..." and be disabled
    await waitFor(() => {
      expect(screen.getByText('Adding...')).toBeInTheDocument();
    });
  });

  it('should link to product details page', () => {
    renderWithContexts(<ProductCard product={mockProduct} />);

    const links = screen.getAllByRole('link');
    const productLink = links[0]; // First link should be to product details
    expect(productLink).toHaveAttribute('href', '/products/123');
  });

  it('should handle missing optional fields gracefully', () => {
    const minimalProduct = {
      _id: '456',
      name: 'Minimal Product',
      description: 'Description',
      price: 50,
      stock: 5,
    };

    renderWithContexts(<ProductCard product={minimalProduct} />);

    expect(screen.getByText('Minimal Product')).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    // Should not crash when category or image is missing
  });

  it('should format price with two decimal places', () => {
    const productWithWholePrice = { ...mockProduct, price: 100 };
    renderWithContexts(<ProductCard product={productWithWholePrice} />);

    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });
});