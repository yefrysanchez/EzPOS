import React, { useState } from 'react'
import Loading from '../Loading/Loading';
import { fade } from '../../animations/animations';
import { motion } from 'framer-motion';

type ModalType = {
    edit: boolean;
    delete: boolean;
  };

type EmployeeDeleteModalType = {
    setEmployeeModal: (bool:ModalType) => void,
    employeeModal:ModalType
}

const EmployeeEditModal: React.FC<EmployeeDeleteModalType> = ({employeeModal, setEmployeeModal}) => {
  
    const [isLoading, setIsLoading] = useState(false)


    const closeModal = () => {
        setEmployeeModal({...employeeModal, edit: !employeeModal.edit});
    };

    const handleEdit = async (e:React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
          closeModal()
        }, 2000);
          
    }

    return (
    <motion.div  variants={fade} initial="initial" animate="enter" exit="exit"  className="fixed backdrop-blur-sm top-0 right-0 left-0 px-4 bottom-0 bg-black/20 border border-darkGray flex justify-center items-center">
        <form onSubmit={handleEdit} className='w-full flex flex-col gap-2 max-w-md bg-white p-4 rounded-xl text-center'>
            <h3 className='text-black font-bold text-2xl'>Edit Employee</h3>
            <input name='name' placeholder='Name' className='text-black border border-gray p-2 rounded-lg' required type="text" />
            <input name='Last name' placeholder='Last Name' className='text-black border border-gray p-2 rounded-lg' required type="text" />
            <input name='PIN' placeholder='PIN' className='text-black border border-gray p-2 rounded-lg' required type="number" />
            <div className='flex justify-center items-center gap-4 my-4'>
                <span>Is this employee an Admin?</span>
                <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer"/>
                <div className="w-9 h-5 bg-lightGray hover:bg-gray peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
            </label>
            </div>
            <div className="flex mx-auto gap-2">
                <button name='close' onClick={closeModal} className="rounded-md min-w-[100px] px-6 py-2 bg-lightGray text-white active:bg-gray">Cancel</button>
                <button name='submit' type='submit' className="rounded-md min-w-[100px] px-6 py-2 bg-violet-600 text-white active:bg-green-700">{isLoading ? <Loading /> : "Edit"}</button>
            </div>
        </form>
    </motion.div>
  )
}

export default EmployeeEditModal