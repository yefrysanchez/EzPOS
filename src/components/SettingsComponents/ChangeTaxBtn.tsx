import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { changeTax } from "../../store/cartSlice";
import { FormEvent, useState } from "react";
import AlertError from "../Alerts/AlertError";
import { AnimatePresence } from "framer-motion";
import Loading from "../Loading/Loading";

const ChangeTaxForm = () => {
  const { account } = useSelector((state: RootState) => state.auth);
  const { taxPorcentage } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [tax, setTax] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState(false);

  const url = import.meta.env.VITE_BACKEND;

  const handleTax = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (tax < 0) {
      return setError("Tax can NOT be less than 0");
    }

    try {
      const res = await fetch(`${url}auth/updateacc/${account?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taxPercentage: tax,
          firstLogin: false,
        }),
      });
      if (!res.ok) {
        setisLoading(false);
        throw new Error("An error occured. Please try later.");
      }
    } catch (error) {
      console.error(error);
      setError(`${error}`);
    } finally {
      dispatch(changeTax(tax));
      setisLoading(false);
    }
  };

  return (
    <div className="max-w-md ">
      <AnimatePresence>{error && <AlertError error={error} />}</AnimatePresence>
      <div className="flex items-center gap-2 w-full mb-2">
        <div className="select-none flex flex-col leading-[1] justify-center items-center w-1/2 h-[130px] rounded-xl bg-darkGray text-[50px] font-bold text-purple">
          <span>Tax</span>
          <span>
            <span className="text-lg">%</span>
            {taxPorcentage}
          </span>
        </div>
        <form
          onSubmit={handleTax}
          className="w-full max-w-[150px] h-[130px] flex flex-col gap-2"
        >
          <input
            onChange={(e) => setTax(Number(e.target.value))}
            value={tax}
            step="0.01"
            required
            placeholder="Tax %"
            className="bg-darkGray w-full p-2 rounded-lg text-center h-1/2"
            type="number"
          />
          <button
            type="submit"
            className={`active:opacity-80 h-1/2 w-full p-2 ${
              isLoading ? "bg-violet-700" : "bg-purple"
            } transition duration-300  text-black font-bold rounded-lg`}
          >
            {isLoading ? <Loading /> : "Change"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeTaxForm;
