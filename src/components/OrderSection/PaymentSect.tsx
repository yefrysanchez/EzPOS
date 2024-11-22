import PaymentMethod from "./PaymentMethod";
import PayBtn from "./PayBtn";
import { calculateTotal } from "../../helpers/calculateSubtotal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import CashPayment from "./CashPayment";
import CardPayment from "./CardPayment";
import ZellePayment from "./ZellePayment";
import { AnimatePresence } from "framer-motion";

const PaymentSect = () => {
  // Redux State
  const { cart } = useSelector((state: RootState) => state.cart);
  const { account } = useSelector((state: RootState) => state.auth);

  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [showPaymentMethod, setShowPaymentMethod] = useState<boolean>(false);

  let sub = 0;
  let tax = 0;
  let total = 0;

  if (account?.taxPercentage !== undefined) {
    sub = calculateTotal(cart);
    tax = Number((sub * (account.taxPercentage / 100)).toFixed(2));
    total = Number((sub + tax).toFixed(2));
  }

  function paymentScreen(paymentMethod: string) {
    switch (paymentMethod) {
      case "cash":
        return <CashPayment total={total} setShowPaymentMethod={setShowPaymentMethod} />;
      case "card":
        return (
          <CardPayment
            setShowPaymentMethod={setShowPaymentMethod}
            total={total}
          />
        );
      case "zelle":
        return <ZellePayment setShowPaymentMethod={setShowPaymentMethod} />;
      default:
        return null; // Explicit return for default case
    }
  }

  return (
    <div className="h-fit / lg:mt-auto">
      <div>
        <div className="border-b py-4 border-dotted">
          <div className="flex justify-between">
            <span className="text-base lg:text-sm">Subtotal</span>
            <span className="font-bold text-xl lg:text-base">
              ${sub.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-base lg:text-sm">
              Tax {account?.taxPercentage || 0}%
            </span>
            <span className="font-bold text-xl lg:text-base">
              ${tax.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-4">
          <span className="text-xl font-bold lg:text-sm">Total</span>
          <span className="font-bold text-xl lg:text-base">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="text-sm font-bold text-lightGray tracking-tighter mb-1 / lg:text-xs">
        <span>Payment Method</span>
      </div>
      <div>
        <PaymentMethod
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />{" "}
        {showPaymentMethod && !paymentMethod && (
          <div className="text-red-500 text-sm text-center">
            Please select a payment method.
          </div>
        )}
        <PayBtn paymentMethod={paymentMethod} setShowPaymentMethod={setShowPaymentMethod} />
      </div>
      {showPaymentMethod && <AnimatePresence>{paymentScreen(paymentMethod)}</AnimatePresence>}
    </div>
  );
};

export default PaymentSect;
