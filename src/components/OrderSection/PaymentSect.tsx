import PaymentMethod from "./PaymentMethod";
import PayBtn from "./PayBtn";
import { calculateTotal } from "../../helpers/calculateSubtotal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import CashPayment from "./CashPayment";
import CardPayment from "./CardPayment";
import ZellePayment from "./ZellePayment";

const PaymentSect = () => {
  /// redux State
  const { cart } = useSelector((state: RootState) => state.cart);
  const { account } = useSelector((state: RootState) => state.auth);
  ///

  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPaymentMethod, setShowPaymentMethod] = useState(false)

  let total;
  let sub;
  let tax;
  if (account?.taxPercentage !== undefined) {
    sub = calculateTotal(cart);
    tax = Number((sub * (account?.taxPercentage / 100)).toFixed(2));
    total = (tax + sub).toFixed(2);
  }

  function paymentScreen(paymentMethod: string) {
    switch (paymentMethod) {
      case "cash":
        return <CashPayment />;
      case "card":
        return <CardPayment />;
      case "zelle":
        return <ZellePayment setShowPaymentMethod={setShowPaymentMethod} />;
      default:
        break;
    }
  }

  return (
    <div className="h-fit / lg:mt-auto">
      <div className="">
        <div className="border-b py-4 border-dotted">
          <div className="flex justify-between">
            <span className="text-base lg:text-sm">Subtotal</span>
            <span className="font-bold text-xl lg:text-base">
              ${sub?.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-base lg:text-sm">
              Tax {account?.taxPercentage}%
            </span>
            <span className="font-bold text-xl lg:text-base">${tax}</span>
          </div>
        </div>
        <div className="flex justify-between py-4">
          <span className="text-xl font-bold lg:text-sm">Total</span>
          <span className="font-bold text-xl lg:text-base">${total}</span>
        </div>
      </div>

      <div className="text-sm font-bold text-lightGray tracking-tighter mb-1 / lg:text-xs">
        <span>Payment Method</span>
      </div>
      <div>
        <PaymentMethod
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
        <PayBtn setShowPaymentMethod={setShowPaymentMethod}/>
      </div>
      {showPaymentMethod && paymentScreen(paymentMethod)}
    </div>
  );
};

export default PaymentSect;
