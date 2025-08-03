import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../store/slices/wishlist';
import { addToCart } from '../store/slices/cartSlice';
import { formatPrice } from '../utils/helpers';

function WishlistPage() {
  const wishlistItems = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7', padding: '32px 0', width: '100vw' }}>
      <div style={{ width: '100%', padding: '24px 8px' }}>
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24, color: '#222' }}>Your Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', fontSize: 18 }}>Your wishlist is empty.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {wishlistItems.map(item => (
              <div key={item.id} style={{ background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: 16, gap: 16 }}>
                <img src={item.image} alt={item.title} style={{ width: 80, height: 80, objectFit: 'contain', background: '#f3f4f6', borderRadius: 8 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ color: '#2563eb', fontWeight: 600, marginBottom: 4 }}>Price: ₹{formatPrice(item.price).replace('$', '')}</div>
                </div>
                <button style={{ background: '#2563eb', color: '#fff', padding: '8px 16px', borderRadius: 8, border: 'none', fontWeight: 500, cursor: 'pointer', marginRight: 8 }} onClick={() => handleAddToCart(item)}>Add to Cart</button>
                <button style={{ background: '#ef4444', color: '#fff', padding: '8px 16px', borderRadius: 8, border: 'none', fontWeight: 500, cursor: 'pointer' }} onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistPage; 