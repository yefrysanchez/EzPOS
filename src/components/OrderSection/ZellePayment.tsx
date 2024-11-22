import { useDispatch } from "react-redux";
import { resetCart } from "../../store/cartSlice";
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/animations";

type ZellePaymentType = {
  setShowPaymentMethod: (bool: boolean) => void;
};

const ZellePayment: React.FC<ZellePaymentType> = ({ setShowPaymentMethod }) => {
  const dispatch = useDispatch();

  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed select-none px-2 inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="max-w-md p-4 flex flex-col items-center w-full bg-white rounded-lg">
        <div className="text-darkGray text-lg">
          <p>
            Scan Code to pay with{" "}
            <span className="text-violet-700 font-bold">Zelle</span>
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
          <button
            onClick={() => setShowPaymentMethod(false)}
            className="bg-darkGray py-2 px-4 rounded-lg text-lg"
          >
            Cancel{" "}
          </button>
          <button
            onClick={() => dispatch(resetCart())}
            className="bg-violet-700 py-2 px-4 rounded-lg text-lg"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ZellePayment;
