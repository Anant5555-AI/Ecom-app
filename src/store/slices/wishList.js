import { createSlice } from '@reduxjs/toolkit';

// Initial state for wishlist
const initialState = {
  items: [],
};

// Create wishlist slice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // Add item to wishlist
    addToWishlist: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      // Only add if item doesn't already exist
      if (!existingItem) {
        state.items.push(newItem);
      }
    },
    
    // Remove item from wishlist
    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
    },
    
    // Clear entire wishlist
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

// Export actions
export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

// Export reducer
export default wishlistSlice.reducer; 