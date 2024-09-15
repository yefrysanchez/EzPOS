import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

// Define the root state type
export type RootState = ReturnType<typeof store.getState>;
// Define the dispatch type
export type AppDispatch = typeof store.dispatch;

export default store;