import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  // Generate placeholder image based on product name
  const getPlaceholderImage = (productName) => {
    const colors = ['667eea', '764ba2', '28a745', 'dc3545', 'fd7e14', '6f42c1'];
    const color = colors[product.id % colors.length];
    return `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIj${color}IiBvcGFjaXR5PSIwLjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzMzMyIgZHk9Ii4zZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+JHtwcm9kdWN0Lm5hbWV9PC90ZXh0Pjwvc3ZnPg==`.replace('${product.name}', encodeURIComponent(product.name));
  };

  const handleImageError = (e) => {
    e.target.src = getPlaceholderImage(product.name);
  };

  // Format price with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.image || getPlaceholderImage(product.name)} 
          alt={product.name}
          onError={handleImageError}
        />
        {product.stock !== undefined && (
          <div className="stock-badge">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <div className="product-price">₦{formatPrice(product.price)}</div>
          {product.stock !== undefined && (
            <div className="stock-info">
              <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          )}
        </div>
        <button 
          className={`add-to-cart-btn ${product.stock === 0 ? 'out-of-stock' : ''}`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;