import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishList';
import { formatPrice, calculateDiscountedPrice, generateStars } from '../utils/helpers';

function ProductCard({ product }) {
  const cartItems = useSelector(state => state.cart.items);
  const wishlistItems = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();
  const isInCart = cartItems.some(item => item.id === product.id);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  const discountedPrice = calculateDiscountedPrice(product.price);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 16,
        width: 220,
        minHeight: 320,
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: '#222' }}>
        <div style={{ height: 120, background: '#f3f4f6', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ maxHeight: 100, maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>
        <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</h3>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, color: '#fbbf24', fontSize: 14 }}>
        <span>{generateStars(product.rating.rate)}</span>
        <span style={{ marginLeft: 4, color: '#888' }}>({product.rating.rate})</span>
      </div>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: '#2563eb' }}>₹{formatPrice(discountedPrice).replace('$', '')}</span>
        {discountedPrice < product.price && (
          <span style={{ textDecoration: 'line-through', color: '#888', marginLeft: 8 }}>₹{formatPrice(product.price).replace('$', '')}</span>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
        <button
          style={{ flex: 1, background: '#2563eb', color: '#fff', padding: '8px 0', borderRadius: 8, border: 'none', fontWeight: 500, cursor: 'pointer' }}
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          <FaShoppingCart style={{ marginRight: 4 }} /> {isInCart ? 'In Cart' : 'Add to Cart'}
        </button>
        <button
          style={{ flex: 0, background: isInWishlist ? '#ef4444' : '#f3f4f6', color: isInWishlist ? '#fff' : '#222', padding: '8px 12px', borderRadius: 8, border: 'none', fontWeight: 500, cursor: 'pointer' }}
          onClick={handleWishlistToggle}
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
}

export default ProductCard; 