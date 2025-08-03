import { createSlice } from '@reduxjs/toolkit';

// Initial state for authentication
const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Start login process
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Login successful
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    
    // Login failed
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Logout user
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;

// Export reducer
export default authSlice.reducer; 