import { createSlice } from "@reduxjs/toolkit";

type cartItemType = {
  id: number;
  name: string;
  price: number;
  category: string;
  qty: number;
};

type cartType = {
  cart: cartItemType[];
  taxPorcentage: number;
};

const initialState: cartType = {
  cart: [],
  taxPorcentage: 12,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const itemExist = state.cart.find((i) => i.id === item.id); //check is item exist
      if (itemExist) {
        itemExist.qty = itemExist.qty + 1; //if already in cart will increase qty
        return;
      } else {
        state.cart.push(item); // if not will add it cart
      }
    },
    addQty: (state, action) => {
      const id = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.qty = item?.qty + 1;
      }
    },
    subQty: (state, action) => {
      const id = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item?.qty === 1) {
        const removeItem = state.cart.filter((item) => item.id !== id);
        state.cart = removeItem;
      }
      if (item) {
        item.qty = item?.qty - 1;
      }
    },
  },
});

export const { addToCart, addQty, subQty } = cartSlice.actions;
export default cartSlice.reducer;
