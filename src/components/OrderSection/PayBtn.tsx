
type PayBtnType = {
  setShowPaymentMethod: (bool:boolean) => void
}

const PayBtn: React.FC<PayBtnType> = ({setShowPaymentMethod}) => {
  return (
    <button onClick={() => setShowPaymentMethod(true)} className="bg-white disabled:opacity-20 font-bold text-black w-full p-4 lg:p-2 rounded-full mt-4 duration-200 active:bg-darkGray active:text-white">Pay</button>
  )
}

export default PayBtn