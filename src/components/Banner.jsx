import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShoppingBag, FaStar } from 'react-icons/fa';
import ecomImg from '../assets/e com.webp';

function Banner() {
  return (
    <div
      style={{
        background: '#fff',
        color: '#222',
        borderRadius: 16,
        border: '1px solid #e5e7eb',
        padding: '32px 24px',
        margin: '32px auto 24px auto',
        maxWidth: 900,
        textAlign: 'center',
      }}
    >
      <img
        src={ecomImg}
        alt="E-commerce Banner"
        style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 12, marginBottom: 24 }}
      />
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Welcome to E styles</h1>
      <p style={{ fontSize: 18, marginBottom: 20, color: '#444' }}>
        Discover quality products at great prices. Fast shipping and friendly service.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#2563eb', fontWeight: 500, fontSize: 16 }}>
          <FaShoppingBag /> Free Shipping
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fbbf24', fontWeight: 500, fontSize: 16 }}>
          <FaStar /> Quality Products
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ef4444', fontWeight: 500, fontSize: 16 }}>
          <FaStar /> 24/7 Support
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        <Link to="/" style={{ background: '#2563eb', color: '#fff', padding: '10px 28px', borderRadius: 16, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          Shop Now <FaArrowRight />
        </Link>
        <Link to="/login" style={{ background: '#f3f4f6', color: '#222', padding: '10px 28px', borderRadius: 16, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Banner; 