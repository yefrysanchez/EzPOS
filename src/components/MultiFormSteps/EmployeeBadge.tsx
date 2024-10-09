import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { removeEmployees } from "../../store/authSlice";
import { AppDispatch } from "../../store/store";


type EmployeeBadgeType = {
  name: string;
  isAdmin: boolean;
  id: number;
  setEffectTrigger: (bool:boolean) => void
  effectTrigger: boolean
  setError: (error:string | null) => void
};



const EmployeeBadge: React.FC<EmployeeBadgeType> = ({ name, isAdmin, id, setError, setEffectTrigger, effectTrigger }) => {
  


const dispatch = useDispatch<AppDispatch>()

const [isLoading, setIsLoading] = useState(false)
const url = import.meta.env.VITE_BACKEND

const handleDelete = async (id:number) => {
  try {
    setError(null)
    const res = await fetch(`${url}employees/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error(`Error ${res.status}: Unable to create employees.`);
    }
    setError("backend need to return a new array")
    dispatch(removeEmployees(id))
  } catch (e) {
    setError((e as Error).message || "An unexpected error occurred.");
  } finally {
    setEffectTrigger(!effectTrigger);
    setIsLoading(false);
  }
  
}
  
    return (
    <div
      className={`${
        isAdmin ? "bg-darkGray text-white" : "bg-purple text-black"
      }  text-lg w-fit font-bold py-1 px-2 rounded-lg flex items-center gap-2`}
    >
      <span className="capitalize">
        {name}
      </span>
      <button disabled={isLoading} onClick={() => handleDelete(id)} className="text-red-600 cursor-pointer">
      <IoClose />
      </button>
    </div>
  );
};

export default EmployeeBadge;
