const ClockInComponent = () => {
  return (
    <div className="mb-4 overflow-hidden flex items-center gap-4 duration-200 hover:bg-purple group cursor-pointer p-4 border border-gray max-w-[300px] mx-auto font-bold rounded-lg text-xl">
      <div className="bg-pink flex-shrink-0 group-hover:bg-white duration-200 text-black h-10 w-10 rounded-full flex items-center justify-center">
        <span>Y</span>
      </div>
      <div className="text-white group-hover:text-black duration-200 overflow-hidden text-nowrap whitespace-nowrap text-ellipsis">
        {" "}
        Yefry S.
      </div>
    </div>
  );
};

export default ClockInComponent;
