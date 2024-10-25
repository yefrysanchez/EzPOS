import { SiCashapp } from "react-icons/si";
import { resetCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

type CashPaymentType = {
  setShowPaymentMethod: (bool: boolean) => void;
  total: number;
};

const CashPayment: React.FC<CashPaymentType> = ({
  setShowPaymentMethod,
  total,
}) => {

  const dispatch = useDispatch()

  return (
    <div className="fixed select-none px-2 inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
      <div className="max-w-md max-h-[400px] h-full p-4 flex flex-col items-center w-full bg-white rounded-lg">
        <div className="flex flex-col h-full justify-center items-center">
        <div className="text-[60px] text-black mb-4">
          <SiCashapp />
        </div>
        <div className="text-darkGray">
          <span className="font-bold text-6xl tracking-tighter">Total: ${total}</span>
        </div>
        </div>

        <div className="flex gap-4 mt-auto">
          <button
            onClick={() => setShowPaymentMethod(false)}
            className="bg-darkGray py-2 px-8 rounded-full text-lg "
          >
            Cancel{" "}
          </button>
          <button onClick={() => dispatch(resetCart())} className="bg-emerald-700 py-2 px-4 rounded-full text-lg">Confirm Payment</button>
        </div>
      </div>
    </div>
  );
};

export default CashPayment;
