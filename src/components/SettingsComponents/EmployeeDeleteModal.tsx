import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Loading from "../Loading/Loading";

type ModalType = {
    edit: boolean;
    delete: boolean;
  };

type EmployeeDeleteModalType = {
    setEmployeeModal: (bool:ModalType) => void,
    employeeModal:ModalType
}

const EmployeeDeleteModal: React.FC<EmployeeDeleteModalType> = ({setEmployeeModal, employeeModal}) => {

const [isLoading, setIsLoading] = useState(false)

    const closeModal = () => {
        setEmployeeModal({ ...employeeModal, delete: !employeeModal.delete });
    };

    const handleDelete = async () => {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        closeModal()
      }, 2000);
        
    }

  return (
    <div className="fixed backdrop-blur-sm top-0 right-0 left-0 px-4 bottom-0 bg-black/20 border border-darkGray flex justify-center items-center">
      <div className="bg-white p-4 flex flex-col justify-center items-center text-center h-full w-full max-h-[300px] max-w-md rounded-xl">
        <div className="text-red-600 text-7xl">
          <IoIosCloseCircleOutline />
        </div>
        <div className="mb-4">
            <h3 className="text-3xl text-black mb-4">Are you Sure?</h3>
            <p>Do you really want to delete these records? This process cannot be undone.</p>
            <p></p>
        </div>
        <div className="flex gap-2">
            <button onClick={closeModal} className="rounded-md min-w-[100px] px-6 py-2 bg-lightGray text-white active:bg-gray">Cancel</button>
            <button onClick={handleDelete} className="rounded-md min-w-[100px] px-6 py-2 bg-red-600 text-white active:bg-red-700">{isLoading ? <Loading /> : "Delete"}</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDeleteModal;
