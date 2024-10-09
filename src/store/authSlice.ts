import { createSlice } from "@reduxjs/toolkit";
import {
  AccountType,
  CategoryType,
  EmployeeType,
  ProductType,
} from "../types/types";

type AuthType = {
  account: AccountType | null;
  clockedEmployee: EmployeeType | null;
  employees: EmployeeType[];
  category: CategoryType[];
  products: ProductType[];
};

const initialState: AuthType = {
  account: null,
  clockedEmployee: null,
  employees: [],
  category: [],
  products: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.account = action.payload;
      localStorage.setItem("account", JSON.stringify(action.payload)); // Save to local storage
    },
    logout: (state) => {
      state.account = null; // Reset account on logout
      localStorage.removeItem("account"); // Remove from local storage
    },
    setEmployees: (state, action) => {
      state.employees = action.payload;
      localStorage.setItem("employees", JSON.stringify(action.payload)); // Save to local storage
    },
    removeEmployees: (state, action) => {
      const id = action.payload;
      state.employees = state.employees.filter((e) => e.id !== id); // Update state.employees
      localStorage.setItem("employees", JSON.stringify(state.employees)); // Save to local storage
    },

    setCategories: (state, action) => {
      state.category = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setEmployees,
  removeEmployees,
  setCategories,
  setProducts,
} = authSlice.actions;
export default authSlice.reducer;
