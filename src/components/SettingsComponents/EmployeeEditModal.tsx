import React, { FormEvent, useState } from 'react'
import Loading from '../Loading/Loading';

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
    <div className="fixed backdrop-blur-sm top-0 right-0 left-0 px-4 bottom-0 bg-black/20 border border-darkGray flex justify-center items-center">
        <form onSubmit={handleEdit} className='w-full flex flex-col gap-2 max-w-md bg-white p-4 rounded-xl text-center'>
            <h3 className='text-black font-bold text-2xl'>Edit Employee</h3>
            <input placeholder='Name' className='text-black border border-gray p-2 rounded-lg' required type="text" />
            <input placeholder='Last Name' className='text-black border border-gray p-2 rounded-lg' required type="text" />
            <input placeholder='PIN' className='text-black border border-gray p-2 rounded-lg' required type="number" />
            <input placeholder='Hourly Rate' className='text-black border border-gray p-2 rounded-lg' required type="number" />
            <div className="flex mx-auto gap-2">
                <button onClick={closeModal} className="rounded-md min-w-[100px] px-6 py-2 bg-lightGray text-white active:bg-gray">Cancel</button>
                <button type='submit' className="rounded-md min-w-[100px] px-6 py-2 bg-violet-600 text-white active:bg-green-700">{isLoading ? <Loading /> : "Edit"}</button>
            </div>
        </form>
    </div>
  )
}

export default EmployeeEditModal