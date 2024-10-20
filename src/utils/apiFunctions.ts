
import { CategoryType } from "../types/types";
import { setCategories, setProducts } from "../store/authSlice";
import { AppDispatch } from "../store/store";

const url = import.meta.env.VITE_BACKEND;

export async function getCategory(dispatch: AppDispatch): Promise<null | string> {
    try {
        const res = await fetch(`${url}productcategory`);
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Error ${res.status}: ${errorData.message || res.statusText}`);
        }
        const data: CategoryType[] = await res.json();
        dispatch(setCategories(data));
        return null;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Fetch error:", error.message);
            return error.message;
        } else {
            console.error("Unexpected error:", error);
            return "An unexpected error occurred.";
        }
    }
}

export async function getProducts(dispatch: AppDispatch): Promise<null | string> {
    try {
        const res = await fetch(`${url}products`);
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Error ${res.status}: ${errorData.message || res.statusText}`);
        }
        const data: CategoryType[] = await res.json();
        dispatch(setProducts(data.sort((a,b) => a.name.localeCompare(b.name))));
        return null;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Fetch error:", error.message);
            return error.message;
        } else {
            console.error("Unexpected error:", error);
            return "An unexpected error occurred.";
        }
    }
}
