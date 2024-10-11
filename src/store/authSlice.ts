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
  step: number;
};

const initialState: AuthType = {
  account: null,
  clockedEmployee: null,
  employees: [],
  category: [],
  products: [],
  step: 1,
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
      localStorage.removeItem("employees"); // Remove from local storage
      localStorage.removeItem("category"); // Remove from local storage
    },
    setEmployees: (state, action) => {
      const employees:EmployeeType[] = action.payload
      state.employees = employees.filter(e => e.accountId === state.account?.id)
      localStorage.setItem("employees", JSON.stringify(action.payload)); // Save to local storage
    },
    removeEmployees: (state, action) => {
      const id = action.payload;
      state.employees = state.employees.filter((e) => e.id !== id); // Update state.employees
      localStorage.setItem("employees", JSON.stringify(state.employees)); // Save to local storage
    },

    setCategories: (state, action) => {
      const category:CategoryType[] = action.payload;
      state.category = category.filter(c => c.accountId === state.account?.id)
      localStorage.setItem("category", JSON.stringify(state.employees)); // Save to local storage
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    nextStep: (state) => {
      state.step = state.step + 1;
      localStorage.setItem("step", String(state.step));

    },
    backStep: (state) => {
      state.step = state.step - 1;
      localStorage.setItem("step", String(state.step));
    },
    setStep: (state, action) => {
      state.step = action.payload
      localStorage.setItem("step", String(action.payload));
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
  nextStep,
  backStep,
  setStep,
} = authSlice.actions;
export default authSlice.reducer;
