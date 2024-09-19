import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { changeTax } from "../../store/cartSlice";
import { FormEvent, useRef } from "react";

const ChangeTaxForm = () => {
  const { taxPorcentage } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const taxRef = useRef<HTMLInputElement | null>(null);

  const handleTax = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(changeTax(Number(taxRef?.current?.value)));
  };

  return (
    <div className="max-w-md flex items-center gap-4">
      <div className="select-none flex flex-col leading-[1] justify-center items-center w-full max-w-[150px] h-[130px] rounded-xl bg-darkGray text-[50px] font-bold text-purple">
        <span>Tax</span>
        <span>
          <span className="text-lg">%</span>
          {taxPorcentage}
        </span>
      </div>
      <form onSubmit={handleTax} className="w-full max-w-[150px] h-[130px] flex flex-col gap-2">
        <input
          ref={taxRef}
          required
          placeholder="Tax %"
          className="bg-darkGray w-full p-2 rounded-lg text-center h-1/2"
          type="number"
        />
        <button
          type="submit"
          className="active:opacity-80 h-1/2 w-full p-2 bg-purple text-black font-bold rounded-lg"
        >
          Change
        </button>
      </form>
    </div>
  );
};

export default ChangeTaxForm;
