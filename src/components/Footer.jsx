import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer style={{ background: '#fff', color: '#888', borderTop: '1px solid #e5e7eb', textAlign: 'center', padding: '32px 0 16px 0', fontSize: 16, marginTop: 40 }}>
      <div style={{ marginBottom: 12 }}>
        <span style={{ fontWeight: 700, color: '#2563eb', fontSize: 20 }}>E Styles</span>
        <span style={{ marginLeft: 8 }}>| Your trusted online shopping destination.</span>
      </div>
      <div style={{ marginBottom: 12 }}>
        <a href="#" style={{ color: '#2563eb', margin: '0 8px' }}><FaFacebook size={18} /></a>
        <a href="#" style={{ color: '#2563eb', margin: '0 8px' }}><FaTwitter size={18} /></a>
        <a href="#" style={{ color: '#ef4444', margin: '0 8px' }}><FaInstagram size={18} /></a>
        <a href="#" style={{ color: '#2563eb', margin: '0 8px' }}><FaLinkedin size={18} /></a>
      </div>
      <div style={{ marginBottom: 12, color: '#444', fontSize: 15 }}>
        <FaEnvelope style={{ marginRight: 4 }} /> support@example.com &nbsp;|&nbsp;
        <FaPhone style={{ marginRight: 4 }} /> +1 234 567 890 &nbsp;|&nbsp;
        <FaMapMarkerAlt style={{ marginRight: 4 }} /> 123 Main St, City
      </div>
      <div style={{ color: '#bbb', fontSize: 14 }}>
        &copy; {new Date().getFullYear()} E Styles. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer; 