import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';


// Import our pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import ProductPage from './pages/ProductPage';

// Import our components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

/**
 * Main App Component
 * This is the root component that sets up our app
 */
function App() {
  return (
    // Redux Provider - gives all components access to our data
    <Provider store={store}>
      {/* Router - handles navigation between pages */}
      <Router basename="/Ecom-app"> 
    {/* remember this #####updates basename  */}
        {/* Main app container */}
        <div className="min-h-screen bg-gray-50 flex flex-col">
          
          {/* Navigation bar - shows on every page */}
          <Navbar />
          
          {/* Main content area */}
          <main className="flex-1">
            <Routes>
              {/* Home page - what users see first */}
              <Route path="/" element={<HomePage />} />
              
              {/* Login page */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Cart page */}
              <Route path="/cart" element={<CartPage />} />
              
              {/* Wishlist page */}
              <Route path="/wishlist" element={<WishlistPage />} />
              
              {/* Product detail page */}
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </main>
          
          {/* Footer - shows on every page */}
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
