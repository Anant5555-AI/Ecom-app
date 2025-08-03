import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setCategory, setSearchTerm, clearFilters } from '../store/slices/productSlice';
import ProductCard from '../components/ProductCard';
import Banner from '../components/Banner';
import { FaTimes } from 'react-icons/fa';
import { getCategories } from '../utils/helpers';

function HomePage() {
  const { products, filteredProducts, loading, selectedCategory, searchTerm } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const categories = getCategories(products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setLocalSearchTerm('');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#062347ff', paddingBottom: 48, width: '100vw' }}>
      <Banner />
      <div style={{ width: '100%', padding: '24px 8px' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
            <span style={{ fontWeight: 600, color: '###' }}>Filter by:</span>
            <button
              style={{ padding: '6px 18px', borderRadius: 16, border: '1px solid #e5e7eb', background: selectedCategory === 'all' ? '#2563eb' : '#fff', color: selectedCategory === 'all' ? '#fff' : '#222', fontWeight: 500, cursor: 'pointer' }}
              onClick={() => handleCategoryChange('all')}
            >All Products</button>
            {categories.filter(category => category !== 'all').map((category) => (
              <button
                key={category}
                style={{ padding: '6px 18px', borderRadius: 16, border: '1px solid #e5e7eb', background: selectedCategory === category ? '#2563eb' : '#fff', color: selectedCategory === category ? '#fff' : '#222', fontWeight: 500, cursor: 'pointer' }}
                onClick={() => handleCategoryChange(category)}
              >{category}</button>
            ))}
            <button style={{ padding: '6px 18px', borderRadius: 16, background: '#ef4444', color: '#fff', fontWeight: 500, border: 'none', marginLeft: 8, cursor: 'pointer' }} onClick={handleClearFilters}><FaTimes style={{ marginRight: 4 }} /> Clear</button>
          </div>
        </div>
        <div style={{ marginBottom: 16, color: '###', fontSize: 15 }}>
          Showing {filteredProducts.length} of {products.length} products
        </div>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 120 }}><div>Loading...</div></div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'row', gap: 24, overflowX: 'auto', paddingBottom: 8 }}>
            {filteredProducts.map(product => (
              <div key={product.id} style={{ flex: '0 0 auto' }}><ProductCard product={product} /></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage; 