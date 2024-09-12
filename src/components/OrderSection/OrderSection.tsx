import { useState } from "react";
import { FaArrowRight, FaCartShopping } from "react-icons/fa6";
import PaymentMethod from "../CartProduct/PaymentMethod";
import PayBtn from "../CartProduct/PayBtn";
import CartProduct from "../CartProduct/CartProduct";
import { calculateTotal } from "../../services/calculateSubtotal.service";
import { PiCoffeeThin } from "react-icons/pi";

const OrderSection = () => {
  const [isOpen, setIsOpen] = useState(true);
  const sub = calculateTotal(products);
  const taxPorcentage: number = 12;
  const tax = Number((sub * (taxPorcentage / 100)).toFixed(2));
  const total = (tax + sub).toFixed(2);
  return (
    <section className="h-fit text-2xl text-white / lg:flex lg:h-screen lg:w-full lg:max-w-[350px]">
      <button
        onClick={() => setIsOpen(true)}
        className="absolute right-4 top-4 lg:hidden"
      >
        <FaCartShopping />
      </button>

      {products.length !== 0 ? (
        <div
          className={`${
            isOpen ? "absolute inset-0" : "hidden lg:block"
          } bg-black z-50 p-4 flex flex-col / lg:static lg:w-full`}
        >
          {/* Order Number and arrow */}
          <div className="flex">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-3xl lg:hidden"
            >
              <FaArrowRight />
            </button>
            <span className="mx-auto lg:text-lg">Order 245</span>
          </div>

          {/* cart products */}

          <div className="my-1 overflow-y-scroll grid gap-3 flex-1 hide-scrollbar-webkit hide-scrollbar-firefox / lg:flex-initial lg:gap-2">
            {products.map((p, i) => (
              <CartProduct
                indexList={i + 1}
                product={p.product}
                price={p.price}
                quantity={p.quantity}
              />
            ))}
          </div>

          {/* total and pay btn */}
          <div className="h-fit  / lg:mt-auto">
            <div className="">
              <div className="border-b py-4 border-dotted">
                <div className="flex justify-between">
                  <span className="text-base lg:text-sm">Subtotal</span>
                  <span className="font-bold text-xl lg:text-base">${sub}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base lg:text-sm">
                    Tax {taxPorcentage}%
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
              <PaymentMethod />
              <PayBtn />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`${
            isOpen ? "absolute inset-0" : "hidden lg:block"
          } bg-darkGray z-50 p-4 flex flex-col / lg:static lg:w-full`}
        >
          <div className="flex">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-3xl lg:hidden"
            >
              <FaArrowRight />
            </button>
          </div>
          <div className="h-full flex flex-col justify-center items-center text-7xl">
            <PiCoffeeThin />
            <span className="text-base text-lightGray tracking-tighter">
              Cart is Empty
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderSection;

const products = [
    { product: "Espresso", price: 2.5, quantity: 1 },
    { product: "Cinnamon Roll", price: 3.75, quantity: 1 },
    { product: "Latte", price: 4.0, quantity: 1 },
    { product: "Chocolate Chip Muffin", price: 2.95, quantity: 2 },
    { product: "Cappuccino", price: 3.5, quantity: 1 },
    { product: "Cappuccino", price: 3.5, quantity: 1 },
];
