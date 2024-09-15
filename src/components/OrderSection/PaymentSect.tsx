import PaymentMethod from "./PaymentMethod";
import PayBtn from "./PayBtn";
import { calculateTotal } from "../../services/calculateSubtotal.service";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";






const PaymentSect = () => {
/// redux State
const { cart } = useSelector((state: RootState) => state.cart);
const { taxPorcentage } = useSelector((state: RootState) => state.cart);
/// 
const sub = calculateTotal(cart);

const tax = Number((sub * (taxPorcentage / 100)).toFixed(2));
const total = (tax + sub).toFixed(2);


  return (
    <div className="h-fit  / lg:mt-auto">
      <div className="">
        <div className="border-b py-4 border-dotted">
          <div className="flex justify-between">
            <span className="text-base lg:text-sm">Subtotal</span>
            <span className="font-bold text-xl lg:text-base">${sub.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base lg:text-sm">Tax {taxPorcentage}%</span>
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
        <PaymentMethod />
        <PayBtn />
      </div>
    </div>
  );
};

export default PaymentSect;


