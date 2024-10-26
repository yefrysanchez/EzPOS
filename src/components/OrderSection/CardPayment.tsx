import React from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { LuSmartphoneNfc } from "react-icons/lu";

type CardPaymentType = {
  setShowPaymentMethod: (bool: boolean) => void;
  total: number;
};

const CardPayment: React.FC<CardPaymentType> = ({
  setShowPaymentMethod,
  total,
}) => {


  return (
    <div className="fixed select-none px-2 inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
      <div className="max-w-md max-h-[400px] h-full p-4 flex flex-col items-center w-full bg-white rounded-lg">
        <div className="text-black text-lg">
          <p>Pay with a card or NFC</p>
        </div>
        <div className="text-darkGray text-lg">
          <span className="font-bold text-3xl">Total: ${total}</span>
        </div>
        <div className="flex items-center gap-4 text-black text-[100px] h-full">
          <div>
            <CiCreditCard1 />
          </div>
          <span className="text-lg">or</span>
          <div className="animate-pulse">
            <LuSmartphoneNfc />
          </div>
        </div>

        <div className="flex gap-4 mt-auto">
          <button
            onClick={() => setShowPaymentMethod(false)}
            className="bg-darkGray py-2 px-8 rounded-lg text-lg "
          >
            Cancel{" "}
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default CardPayment;
