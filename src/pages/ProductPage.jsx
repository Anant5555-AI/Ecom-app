import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlist';
import { FaHeart, FaShoppingCart, FaStar, FaArrowLeft } from 'react-icons/fa';
import { formatPrice, calculateDiscountedPrice } from '../utils/helpers';

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);
  const cartItems = useSelector(state => state.cart.items);
  const wishlistItems = useSelector(state => state.wishlist.items);
  const [quantity, setQuantity] = useState(1);
  const product = products.find(p => p.id === parseInt(id));
  const isInCart = cartItems.some(item => item.id === parseInt(id));
  const isInWishlist = wishlistItems.some(item => item.id === parseInt(id));

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const discountedPrice = product ? calculateDiscountedPrice(product.price) : 0;

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist) {
        dispatch(removeFromWishlist(product.id));
      } else {
        dispatch(addToWishlist(product));
      }
    }
  };

  if (loading || !product) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7', padding: '32px 0', width: '100vw' }}>
      <div style={{ width: '100%', padding: '24px 8px' }}>
        <Link to="/" style={{ display: 'inline-block', marginBottom: 16, background: '#f3f4f6', color: '#222', padding: '8px 18px', borderRadius: 8, textDecoration: 'none', fontWeight: 500 }}><FaArrowLeft style={{ marginRight: 6 }} /> Back</Link>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', display: 'flex', gap: 32, alignItems: 'flex-start', padding: 24 }}>
          <img src={product.image} alt={product.title} style={{ width: 220, height: 220, objectFit: 'contain', background: '#f3f4f6', borderRadius: 8 }} />
          <div style={{ flex: 1 }}>
            <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>{product.title}</h2>
            <div style={{ display: 'flex', alignItems: 'center', color: '#fbbf24', marginBottom: 8 }}>
              {[...Array(Math.round(product.rating.rate))].map((_, i) => <FaStar key={i} />)}
              <span style={{ marginLeft: 8, color: '#888', fontSize: 15 }}>({product.rating.rate})</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 18, color: '#2563eb' }}>₹{formatPrice(discountedPrice).replace('$', '')}</span>
              {discountedPrice < product.price && (
                <span style={{ textDecoration: 'line-through', color: '#888', marginLeft: 10 }}>₹{formatPrice(product.price).replace('$', '')}</span>
              )}
            </div>
            <div style={{ marginBottom: 8, color: '#2563eb', fontWeight: 500 }}>Category: {product.category}</div>
            <div style={{ marginBottom: 16, color: '#444', fontSize: 15 }}>{product.description}</div>
            <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Qty:</span>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                style={{ width: 60, padding: '6px 8px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 15 }}
              />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ background: '#2563eb', color: '#fff', padding: '10px 28px', borderRadius: 8, fontWeight: 600, border: 'none', fontSize: 16, cursor: 'pointer' }} onClick={handleAddToCart} disabled={isInCart}><FaShoppingCart style={{ marginRight: 6 }} /> {isInCart ? 'In Cart' : 'Add to Cart'}</button>
              <button style={{ background: isInWishlist ? '#ef4444' : '#f3f4f6', color: isInWishlist ? '#fff' : '#222', padding: '10px 18px', borderRadius: 8, fontWeight: 600, border: 'none', fontSize: 16, cursor: 'pointer' }} onClick={handleWishlistToggle}><FaHeart /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage; 