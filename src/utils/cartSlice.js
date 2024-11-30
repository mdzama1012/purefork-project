import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    dish: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.dish.push(action.payload);
    },
    clearCart: (state) => {
      // A way to clear array in javascript.
      state.dish.length = 0;
    },
  },
});

export const { addItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
