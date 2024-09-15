import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadCartFromLocalStorage, saveCartToLocalStorage } from "../helpers/localStorageHelpers";
import { cartItemType, cartType } from "../types/types";




// Load initial state from local storage
const initialState: cartType = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItemType>) => {
      const item = action.payload;
      const itemExist = state.cart.find((i) => i.id === item.id);
      if (itemExist) {
        itemExist.qty = itemExist.qty + 1;
      } else {
        state.cart.push(item);
      }
      saveCartToLocalStorage(state); // Save state to local storage
    },
    addQty: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.qty = item.qty + 1;
        saveCartToLocalStorage(state); // Save state to local storage
      }
    },
    subQty: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item?.qty === 1) {
        state.cart = state.cart.filter((item) => item.id !== id);
      } else if (item) {
        item.qty = item.qty - 1;
      }
      saveCartToLocalStorage(state); // Save state to local storage
    },
  },
});

export const { addToCart, addQty, subQty } = cartSlice.actions;
export default cartSlice.reducer;
