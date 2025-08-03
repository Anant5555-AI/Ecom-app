import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaHeart, FaUser, FaSearch } from 'react-icons/fa';
import { logout } from '../store/slices/authSlice';
import { setSearchTerm } from '../store/slices/productSlice';

function Navbar() {
  const cartItems = useSelector(state => state.cart.items);
  const wishlistItems = useSelector(state => state.wishlist.items);
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistItemCount = wishlistItems.length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(setSearchTerm(searchInput.trim()));
      navigate('/');
      setSearchInput('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav style={{
      background: '#fff',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      height: 60,
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      <Link to="/" style={{ fontWeight: 700, color: '#2563eb', fontSize: 24, textDecoration: 'none', letterSpacing: '-1px' }}>
        E Styles
      </Link>
      <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', background: '#f3f4f6', borderRadius: 20, padding: '2px 8px' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: '4px 12px',
            width: 140,
            fontSize: 14,
            color: '#222',
          }}
        />
        <button type="submit" style={{ marginLeft: 8, background: '#2563eb', color: '#fff', padding: '4px 12px',
           borderRadius: 16, border: 'none', cursor: 'pointer', fontWeight: 500 }}>
          <FaSearch size={16} />
        </button>
      </form>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Link to="/wishlist" style={{ display: 'flex', alignItems: 'center', color: '#444', fontSize: 18, textDecoration: 'none',
           position: 'relative' }}>
          <FaHeart />
          {wishlistItemCount > 0 && <span style={{ marginLeft: 4, fontSize: 12, background: '#2563eb', color: '#fff', 
            borderRadius: 8, padding: '2px 6px', position: 'absolute', top: -10, right: -16 }}>{wishlistItemCount}</span>}
        </Link>
        <Link to="/cart" style={{ display: 'flex', alignItems: 'center', color: '#444', fontSize: 18, textDecoration: 'none', 
          position: 'relative' }}>
          <FaShoppingCart />
          {cartItemCount > 0 && <span style={{ marginLeft: 4, fontSize: 12, background: '#2563eb', color: '#fff', borderRadius: 8, padding: '2px 6px', position: 'absolute', top: -10, right: -16 }}>{cartItemCount}</span>}
        </Link>
        {isLoggedIn ? (
          <>
            <span style={{ display: 'flex', alignItems: 'center', color: '#444', fontWeight: 500, fontSize: 16 }}><FaUser style={{ marginRight: 6 }} /> {user?.name || 'User'}</span>
            <button style={{ background: '#f3f4f6', color: '#222', padding: '4px 16px', borderRadius: 16, fontWeight: 500, border: 'none', marginLeft: 8, cursor: 'pointer' }} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ color: '#444', fontWeight: 500, fontSize: 16, marginLeft: 8, textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 