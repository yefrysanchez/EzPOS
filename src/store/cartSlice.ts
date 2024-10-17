import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartItemType, cartType } from "../types/types";

const initialState: cartType = {
  cart: [],
  taxPorcentage: 12,
};

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
        state.cart.push(item)
      }
    },
    addQty: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.qty = item.qty + 1;
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
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const items:cartItemType[] = state.cart.filter((item) => item.id !== id);
      state.cart = items
    },
    changeTax: (state, action: PayloadAction<number>) => {
      const tax = action.payload
      state.taxPorcentage = tax
    }
  },
});

export const { addToCart, addQty, subQty, changeTax, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
