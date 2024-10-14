import { EmployeeType } from "../../types/types";

type ClockInComponentType = {
  user: EmployeeType | null
}



const ClockInComponent: React.FC<ClockInComponentType> = ({user}) => {
  return (
    <div className={`${user?.name === name && "bg-purple"} select-none mb-4 overflow-hidden flex items-center gap-4 duration-200 hover:bg-purple group cursor-pointer p-4 border border-gray max-w-[300px] mx-auto font-bold rounded-md text-xl`}>
      <div className={`${user?.name === name && "bg-white"} bg-pink flex-shrink-0 group-hover:bg-white duration-200 text-black h-10 w-10 rounded-full flex items-center justify-center`}>
        <span>{user?.name[0].toUpperCase()}</span>
      </div>
      <div className={` ${user?.name === name ? "text-black" : "text-white"}  group-hover:text-black duration-200 overflow-hidden text-nowrap whitespace-nowrap text-ellipsis capitalize`}>

        {user?.name}
      </div>
    </div>
  );
};

export default ClockInComponent;
