import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FiShoppingCart } from 'react-icons/fi';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setMessage('Please login to add items to cart');
      return;
    }

    setAdding(true);
    const result = await addToCart(product._id, 1);
    
    if (result.success) {
      setMessage('Added to cart!');
      setTimeout(() => setMessage(''), 2000);
    } else {
      setMessage(result.error);
    }
    setAdding(false);
  };

  return (
    <div className="card hover:shadow-xl transition-shadow duration-300">
      <Link to={`/products/${product._id}`}>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <img
            src={product.image || 'https://via.placeholder.com/400x300?text=Product'}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </span>
          <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        {product.category && (
          <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mb-3">
            {product.category}
          </span>
        )}
      </Link>
      
      <button
        onClick={handleAddToCart}
        disabled={adding || product.stock === 0}
        className="w-full btn-primary flex items-center justify-center space-x-2"
      >
        <FiShoppingCart />
        <span>{adding ? 'Adding...' : 'Add to Cart'}</span>
      </button>
      
      {message && (
        <p className={`text-sm mt-2 text-center ${message.includes('success') || message.includes('Added') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ProductCard;