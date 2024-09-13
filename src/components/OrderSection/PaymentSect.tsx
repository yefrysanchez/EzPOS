import PaymentMethod from "./PaymentMethod";
import PayBtn from "./PayBtn";
import { calculateTotal } from "../../services/calculateSubtotal.service";

const products = [
  { product: "Espresso", price: 2.5, quantity: 1 },
  { product: "Cinnamon Roll", price: 3.75, quantity: 1 },
  { product: "Latte", price: 4.0, quantity: 1 },
  { product: "Chocolate Chip Muffin", price: 2.95, quantity: 2 },
  { product: "Cappuccino", price: 3.5, quantity: 1 },
  { product: "Cappuccino", price: 3.5, quantity: 1 },
];

const sub = calculateTotal(products);
const taxPorcentage: number = 12;
const tax = Number((sub * (taxPorcentage / 100)).toFixed(2));
const total = (tax + sub).toFixed(2);



const PaymentSect = () => {
  return (
    <div className="h-fit  / lg:mt-auto">
      <div className="">
        <div className="border-b py-4 border-dotted">
          <div className="flex justify-between">
            <span className="text-base lg:text-sm">Subtotal</span>
            <span className="font-bold text-xl lg:text-base">${sub}</span>
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


