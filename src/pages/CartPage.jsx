import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { formatPrice } from '../utils/helpers';

function CartPage() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, value) => {
    const qty = parseInt(value, 10);
    if (qty > 0) {
      dispatch(updateQuantity({ id, quantity: qty }));
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7', padding: '32px 0', width: '100vw' }}>
      <div style={{ width: '100%', padding: '24px 8px' }}>
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24, color: '#222' }}>Your Cart</h2>
        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', fontSize: 18 }}>Your cart is empty.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {cartItems.map(item => (
              <div key={item.id} style={{ background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: 16, gap: 16 }}>
                <img src={item.image} alt={item.title} style={{ width: 80, height: 80, objectFit: 'contain', background: '#f3f4f6', borderRadius: 8 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ color: '#2563eb', fontWeight: 600, marginBottom: 4 }}>Price: ₹{formatPrice(item.price).replace('$', '')}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>Qty:</span>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e => handleQuantityChange(item.id, e.target.value)}
                      style={{ width: 60, padding: '6px 8px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 15 }}
                    />
                  </div>
                </div>
                <button style={{ background: '#ef4444', color: '#fff', padding: '8px 16px', borderRadius: 8, border: 'none', fontWeight: 500, cursor: 'pointer' }} onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            ))}
            <div style={{ textAlign: 'right', fontWeight: 700, fontSize: 18, marginTop: 16, color: '#222' }}>
              Total: ₹{formatPrice(total).replace('$', '')}
            </div>
            <div style={{ textAlign: 'right' }}>
              <button style={{ background: '#2563eb', color: '#fff', padding: '12px 32px', borderRadius: 8, fontWeight: 600, border: 'none', fontSize: 16, cursor: 'pointer' }}>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage; 