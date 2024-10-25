import { useDispatch } from "react-redux";
import { resetCart } from "../../store/cartSlice";

type ZellePaymentType = {
  setShowPaymentMethod: (bool: boolean) => void
}

const ZellePayment: React.FC<ZellePaymentType> = ({setShowPaymentMethod}) => {

  const dispatch = useDispatch()

  return (
    <div className="fixed select-none px-2 inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
      <div className="max-w-md p-4 flex flex-col items-center w-full bg-white rounded-lg">
        <div className="text-darkGray text-lg">
          <p>
            Scan Code to pay with <span className="text-violet-700 font-bold">Zelle</span>
          </p>
        </div>
        <div className="h-40 w-40">
          <img
            className="h-full w-full object-cover"
            src="/qr.png"
            alt="qr code image"
          />
        </div>

        <div className="w-40">
          <img
            className="h-full object-cover"
            src="/zelle.png"
            alt="zelle logo"
          />
        </div>
        <div className="mt-4 flex gap-4">
          <button onClick={() => setShowPaymentMethod(false)} className="bg-darkGray py-2 px-4 rounded-full text-lg">Cancel </button>
          <button onClick={() => dispatch(resetCart())} className="bg-violet-700 py-2 px-4 rounded-full text-lg">Confirm Payment</button>
        </div>
      </div>
    </div>
  );
};

export default ZellePayment;
