import { FaRegEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

type ModalType = {
  edit: boolean;
  delete: boolean;
};

type EmployeeEditDeleteType = {
  name: string;
  lastName: string;
  setEmployeeModal: (bool: ModalType) => void;
  employeeModal: ModalType;
};

const EmployeeEditDelete: React.FC<EmployeeEditDeleteType> = ({
  name,
  lastName,
  setEmployeeModal,
  employeeModal,
}) => {

    const toggleEditModal = () => {
        setEmployeeModal({ ...employeeModal, edit: !employeeModal.edit });
      };
    
      const toggleDeleteModal = () => {
        setEmployeeModal({ ...employeeModal, delete: !employeeModal.delete });
      };

  return (
    <div className="border border-darkGray p-4 rounded-xl flex items-center gap-2 font-bold text-white">
      <div className="text-black font-bold tracking-tighter bg-white rounded-full h-10 w-10 flex justify-center items-center text-xl">
        <span>
          {name[0]}
          {lastName[0]}
        </span>
      </div>
      <div>
        <span>
          {name} {lastName}
        </span>
      </div>
      <div className="ml-auto flex gap-4 text-xl mr-4">
        <button
          onClick={toggleEditModal}
          className="active:opacity-70 duration-200"
        >
          <FaRegEdit />
        </button>
        <button
          onClick={toggleDeleteModal}
          className="active:text-red-600 duration-200"
        >
          <FaTrashCan />
        </button>
      </div>
    </div>
  );
};

export default EmployeeEditDelete;
