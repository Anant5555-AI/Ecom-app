import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const sampleProducts = [
  // {
  //   id: 1,
  //   title: "Wireless Bluetooth Headphones",
  //   price: 99.99,
  //   description: "High-quality wireless headphones with noise cancellation and long battery life.",
  //   category: "electronics",
  //   image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  //   rating: { rate: 4.5, count: 120 },
  //   inStock: true,
  // },
  // {
  //   id: 2,
  //   title: "Smart Fitness Watch",
  //   price: 199.99,
  //   description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring.",
  //   category: "electronics",
  //   image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  //   rating: { rate: 4.3, count: 89 },
  //   inStock: true,
  // },
  // {
  //   id: 3,
  //   title: "Organic Cotton T-Shirt",
  //   price: 29.99,
  //   description: "Comfortable and eco-friendly cotton t-shirt available in multiple colors.",
  //   category: "clothing",
  //   image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
  //   rating: { rate: 4.7, count: 156 },
  //   inStock: true,
  // },
  // {
  //   id: 4,
  //   title: "Stainless Steel Water Bottle",
  //   price: 24.99,
  //   description: "Keep your drinks cold for hours with this durable stainless steel water bottle.",
  //   category: "home",
  //   image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
  //   rating: { rate: 4.6, count: 203 },
  //   inStock: true,
  // },
  // {
  //   id: 5,
  //   title: "Wireless Charging Pad",
  //   price: 49.99,
  //   description: "Convenient wireless charging pad compatible with all Qi-enabled devices.",
  //   category: "electronics",
  //   image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
  //   rating: { rate: 4.2, count: 67 },
  //   inStock: true,
  // },
  // {
  //   id: 6,
  //   title: "Yoga Mat",
  //   price: 39.99,
  //   description: "Premium non-slip yoga mat perfect for home workouts and meditation.",
  //   category: "sports",
  //   image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
  //   rating: { rate: 4.8, count: 134 },
  //   inStock: true,
  // },
  // {
  //   id: 7,
  //   title: "Ceramic Coffee Mug Set",
  //   price: 34.99,
  //   description: "Beautiful ceramic coffee mug set, perfect for your morning brew.",
  //   category: "home",
  //   image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400",
  //   rating: { rate: 4.4, count: 78 },
  //   inStock: true,
  // },
  // {
  //   id: 8,
  //   title: "Running Shoes",
  //   price: 129.99,
  //   description: "Comfortable and lightweight running shoes for your daily workouts.",
  //   category: "sports",
  //   image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
  //   rating: { rate: 4.6, count: 245 },
  //   inStock: true,
  // },
];

// Async thunk to fetch products (simulating API call)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return sampleProducts;
  }
);

// Initial state for products
const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  selectedCategory: 'all',
  searchTerm: '',
};

// Create product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Set selected category
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      // Filter products based on category and search term
      let filtered = state.products;
      
      if (state.selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === state.selectedCategory);
      }
      
      if (state.searchTerm) {
        filtered = filtered.filter(product => 
          product.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }
      
      state.filteredProducts = filtered;
    },
    
    // Set search term
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      // Filter products based on category and search term
      let filtered = state.products;
      
      if (state.selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === state.selectedCategory);
      }
      
      if (state.searchTerm) {
        filtered = filtered.filter(product => 
          product.title.toLowerCase().includes(state.searchTerm.toLowerCase())
           ||
          product.description.toLowerCase().includes(state.searchTerm
            .toLowerCase())
        );
      }
      
      state.filteredProducts = filtered;
    },
    
    // Clear filters
    clearFilters: (state) => {
      state.selectedCategory = 'all';
      state.searchTerm = '';
      state.filteredProducts = state.products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { setCategory, setSearchTerm, clearFilters } = productSlice.actions;

// Export reducer
export default productSlice.reducer; 