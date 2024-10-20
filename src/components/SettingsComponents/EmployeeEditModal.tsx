import React, { ChangeEvent, useState } from 'react'
import Loading from '../Loading/Loading';
import { fade } from '../../animations/animations';
import { motion } from 'framer-motion';
import { EmployeeType } from '../../types/types';

type ModalType = {
    edit: boolean;
    delete: boolean;
  };

type EmployeeDeleteModalType = {
    setEmployeeModal: (bool:ModalType) => void,
    employeeModal:ModalType
    em: EmployeeType | undefined
    trigger: boolean
    setTrigger: (bool:boolean) => void
}

const EmployeeEditModal: React.FC<EmployeeDeleteModalType> = ({employeeModal, setEmployeeModal, em, trigger, setTrigger}) => {


  
    const [isLoading, setIsLoading] = useState(false)
    const [firstName, setFirstName] = useState(em?.name.split(" ")[0])
    const [lastName, setLastName] = useState(em?.name.split(" ")[1])
    const [PIN, setPIN] = useState(em?.pin)
    const [isAdmin, setIsAdmin] = useState(em?.isAdmin)
    const [error, setError] = useState<string | null>(null)
    
    const url = import.meta.env.VITE_BACKEND


    const closeModal = () => {
        setEmployeeModal({...employeeModal, edit: !employeeModal.edit});
    };

    const handlePIN = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const pinVal = e.target.value;
        if (pinVal.length > 4) {
          // Prevent adding more than 4 digits
          setError("PIN can NOT be more than 4 Digits.");
          return;
        }
        setPIN(pinVal);
    }

    const handleEdit = async (e:React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(`${url}employees`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pin: PIN,
                    firstName,
                    lastName,
                    isAdmin,
                    id: em?.id
                })
            })
            if(!res.ok){
                setIsLoading(false)
                throw new Error("An error occured. Please try again.")
            }
        } catch (error) {
            console.error("Failed to fetch employees:", error);
            setError(`${error}`);
        } finally {
            setIsLoading(false)
            setTrigger(!trigger)
            setEmployeeModal({...employeeModal, edit: !employeeModal.edit});
        }
          
    }

    return (
    <motion.div  variants={fade} initial="initial" animate="enter" exit="exit"  className="fixed backdrop-blur-sm top-0 right-0 left-0 px-4 bottom-0 bg-black/20 border border-darkGray flex justify-center items-center">
        <form onSubmit={handleEdit} className='w-full flex flex-col gap-2 max-w-md bg-white p-4 rounded-xl text-center'>
            <h3 className='text-black font-bold text-2xl'>Edit Employee</h3>
            <input onChange={(e)=> setFirstName(e.target.value)} value={firstName} name='First name' placeholder='FirstName' className='text-black border border-gray p-2 rounded-lg' required type="text" />
            <input onChange={(e)=> setLastName(e.target.value)} value={lastName} name='Last name' placeholder='Last Name' className='text-black border border-gray p-2 rounded-lg' required type="text" />
            <input onChange={handlePIN} value={PIN} name='PIN' placeholder='PIN' className='text-black border border-gray p-2 rounded-lg' required type="number" />
           {error && <p className='text-red-600'>{error}</p>}
            <div className='flex justify-center items-center gap-4 my-4'>
                <span>Is this employee an Admin?</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input onChange={(e) => setIsAdmin(e.target.checked)} type="checkbox" defaultValue="" checked={isAdmin} className="sr-only peer"/>
                    <div className="w-9 h-5 bg-lightGray hover:bg-gray peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
            </div>
            <div className="flex mx-auto gap-2">
                <button name='close' type='button' onClick={closeModal} className="rounded-md min-w-[100px] px-6 py-2 bg-lightGray text-white active:bg-gray">Cancel</button>
                <button name='submit' type='submit' className="rounded-md min-w-[100px] px-6 py-2 bg-violet-600 text-white active:bg-green-700">{isLoading ? <Loading /> : "Edit"}</button>
            </div>
        </form>
    </motion.div>
  )
}

export default EmployeeEditModal