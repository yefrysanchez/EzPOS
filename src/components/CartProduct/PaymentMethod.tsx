import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { CiBarcode, CiCreditCard2 } from "react-icons/ci";


const PaymentMethod = () => {
  return (
    <div className="flex gap-2">
            <div className="flex flex-col w-full items-center gap-2">
                <button className="shopping-btn "><RiMoneyDollarBoxFill /></button>
                <span className="text-lg lg:text-xs">Cash</span>
            </div> <div className="flex flex-col w-full items-center gap-2">
                <button className="shopping-btn "><CiCreditCard2 /></button>
                <span className="text-lg lg:text-xs">Card</span>
            </div> <div className="flex flex-col w-full items-center gap-2">
                <button className="shopping-btn "><CiBarcode /></button>
                <span className="text-lg lg:text-xs">Zelle</span>
            </div>
          </div>
  )
}

export default PaymentMethod