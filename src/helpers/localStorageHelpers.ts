import { cartType } from "../types/types";

export const loadCartFromLocalStorage = (tax: number = 12): cartType => {
  const savedCart = localStorage.getItem("cartState");
  if (savedCart) {
    return JSON.parse(savedCart);
  }
  return {
    cart: [],
    taxPorcentage: tax,
  };
};

export const saveCartToLocalStorage = (cartState: cartType) => {
  localStorage.setItem("cartState", JSON.stringify(cartState));
};
