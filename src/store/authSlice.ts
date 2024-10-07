import { createSlice } from "@reduxjs/toolkit";
import { AccountType, CategoryType, EmployeeType, ProductType} from "../types/types"

type AuthType = {
    account: AccountType | null
    employees: EmployeeType[],
    category : CategoryType[], 
    products: ProductType[]
}



const initialState: AuthType =  {
    account: null,
    employees: [],
    category: [],
    products: [] 
} 

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.account = action.payload;
        },
        logout: (state) => {
            state.account = null; // Reset account on logout
        },
        setEmployees: (state, action) => {
            state.employees = action.payload;
        },
        setCategories: (state, action) => {
            state.category = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    }
});

export const { login, logout, setEmployees, setCategories, setProducts } = authSlice.actions;
export default authSlice.reducer;