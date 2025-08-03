import { createSlice } from '@reduxjs/toolkit';

// Initial state for cart
const initialState = {
  items: [],
  total: 0,
};

// Create cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // If item already exists, increase quantity
        existingItem.quantity += newItem.quantity || 1;
      } else {
        // If item doesn't exist, add it with quantity 1
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
        });
      }
      
      // Calculate total
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    // Remove item from cart
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
      
      // Calculate total
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    // Update item quantity
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter(item => item.id !== id);
        } else {
          // Update quantity
          item.quantity = quantity;
        }
        
        // Calculate total
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      }
    },
    
    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer; 