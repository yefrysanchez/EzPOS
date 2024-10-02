import { ChangeEvent, FormEvent, useState } from "react";
import AlertError from "../Alerts/AlertError";
import Loading from "../Loading/Loading";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp } from "../../animations/animations";

type StepType = {
  setStep: (step: number) => void,
};

const Step1: React.FC<StepType> = ({ setStep }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pin, setPin] = useState("")

  const handlePin = (e: ChangeEvent<HTMLInputElement>) => {
    const validatePIN = e.target.value.split("")
    
    if(validatePIN.length > 4){
        return
    }
    console.log(validatePIN.join(""))
    setPin(validatePIN.join(""))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if(pin.length < 4){
        setError("PIN needs to be 4 digits.")
        return
    }
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
        setIsLoading(false)
        setStep(2)
    }, 1000);
  };
  return (<AnimatePresence>
    <motion.form
    variants={fadeUp}
    initial="initial"
    animate="enter"
    exit="exit"
      onSubmit={handleSubmit}
      className="flex flex-col text-center text-black mb-4 p-4 rounded-lg max-w-md w-full h-full"
    >
      <h1 className="text-3xl font-bold text-center mb-4 tracking-tighter">
        Employee
      </h1>
      <h2 className="mb-8 text-gray">Please add employees</h2>
      {error && <AlertError error={error} />}
      <div className="h-12 flex items-center ">
        <div className="hover:bg-lightGray/10 w-1/2 py-2 rounded-lg transition ">
          <label className="cursor-pointer" htmlFor="admin">
            Admin <input className="cursor-pointer" type="radio" name="role" id="admin" />
          </label>
        </div>
        <div  className="hover:bg-lightGray/10 w-1/2 py-2 rounded-lg transition ">
          <label className="cursor-pointer" htmlFor="employee">
            Employee <input required className="cursor-pointer" type="radio" name="role" id="employee" />
          </label>
        </div>
      </div>
      <div className="mb-4">
        <input
          className="form-input"
          placeholder="Name"
          required
          name="name"
          type="text"
        />
      </div>
      <div className="mb-4">
        <input
        onChange={handlePin}
          className="form-input"
          placeholder="PIN"
          value={pin}
          required
          name="pin"
          type="number"
        />
      </div>
     
      <button
          disabled={isLoading}
          className="bg-black mt-auto self-end placeholder:text-gray w-28 h-16 p-4 rounded-xl font-bold text-white cursor-pointer"
          type="submit"
        >
          {isLoading ? <Loading /> : "Next"}
        </button>
    </motion.form>
    </AnimatePresence>
  );
};

export default Step1;
