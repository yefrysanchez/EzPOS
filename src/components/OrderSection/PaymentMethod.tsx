import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { CiBarcode, CiCreditCard2 } from "react-icons/ci";

type PaymentMethodType = {
  setPaymentMethod: (srt: string) => void;
  paymentMethod: string;
};

const PaymentMethod: React.FC<PaymentMethodType> = ({
  setPaymentMethod,
  paymentMethod,
}) => {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col w-full items-center gap-2">
        <button
        onClick={() => setPaymentMethod("cash")}
          className={`shopping-btn ${
            paymentMethod === "cash" && "bg-white text-black"
          }`}
        >
          <RiMoneyDollarBoxFill />
        </button>
        <span className="text-lg lg:text-xs">Cash</span>
      </div>{" "}
      <div className="flex flex-col w-full items-center gap-2">
        <button
        onClick={() => setPaymentMethod("card")}
          className={`shopping-btn ${
            paymentMethod === "card" && "bg-white text-black"
          }`}
        >
          <CiCreditCard2 />
        </button>
        <span className="text-lg lg:text-xs">Card</span>
      </div>{" "}
      <div className="flex flex-col w-full items-center gap-2">
        <button
        onClick={() => setPaymentMethod("zelle")}
          className={`shopping-btn ${
            paymentMethod === "zelle" && "bg-white text-black"
          }`}
        >
          <CiBarcode />
        </button>
        <span className="text-lg lg:text-xs">Zelle</span>
      </div>
    </div>
  );
};

export default PaymentMethod;
