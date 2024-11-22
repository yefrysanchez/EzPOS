import { useState } from "react";
import { FaArrowRight, FaCartShopping } from "react-icons/fa6";
import CartProduct from "./CartProduct";
import PaymentSect from "./PaymentSect";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { BsCartX } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { fade } from "../../animations/animations";

const OrderSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useSelector((state: RootState) => state.cart);

  return (
    <section className="h-fit text-2xl text-white / lg:flex lg:h-screen lg:w-full lg:max-w-[350px]">
      <button
        onClick={() => setIsOpen(true)}
        className="absolute right-4 top-4 lg:hidden"
      >
        <FaCartShopping />
      </button>

      {cart.length > 0 ? (
        <AnimatePresence>
          <motion.div
            variants={fade}
            initial="initial"
            animate="enter"
            exit="exit"
            className={`${
              isOpen ? "absolute inset-0" : "hidden lg:flex"
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
              <span className="mx-auto lg:text-lg">Order Details</span>
            </div>

            {/* cart products */}

            <div className="my-1 overflow-y-scroll grid gap-3 hide-scrollbar-webkit hide-scrollbar-firefox / lg:flex-initial lg:gap-2">
              <AnimatePresence>
                {cart.map((p, i: number) => (
                  <CartProduct
                    key={p.id}
                    id={p.id}
                    indexList={i + 1}
                    product={p.name}
                    price={p.price}
                    quantity={p.qty}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* total and pay btn */}
            <PaymentSect />
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          variants={fade}
          initial="initial"
          animate="enter"
          exit="exit"
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
            <BsCartX />
            <span className="text-base text-lightGray tracking-tighter">
              Cart is Empty
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default OrderSection;
