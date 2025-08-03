// Format price to display with currency symbol
export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

// Calculate discounted price (10% discount)
export const calculateDiscountedPrice = (originalPrice) => {
  return originalPrice * 0.9;
};

// Generate star rating display
export const generateStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let stars = '';
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars += '★';
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    stars += '☆';
  }
  
  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars += '☆';
  }
  
  return stars;
};

// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password (at least 6 characters)
export const validatePassword = (password) => {
  return password.length >= 6;
};

// Get unique categories from products
export const getCategories = (products) => {
  const categories = products.map(product => product.category);
  return ['all', ...new Set(categories)];
};

// Truncate text to specified length
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}; 