import { useState } from "react";
import AlertError from "../Alerts/AlertError";
import Loading from "../Loading/Loading";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp } from "../../animations/animations";

type StepType = {
  setStep: (step: number) => void;
  step: number;
};

const Step2: React.FC<StepType> = ({ setStep, step }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const goBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.form
        variants={fadeUp}
        initial="initial"
        animate="enter"
        exit="exit"
        onSubmit={handleSubmit}
        className="flex flex-col text-center text-black mb-4 rounded-lg max-w-md w-full h-full"
      >
        <h1 className="text-3xl font-bold text-center mb-4 tracking-tighter">
          Products
        </h1>
        <h2 className="mb-8 text-gray">Please complete the require fields.</h2>
        {error && <AlertError error={error} />}

        <div className="mb-4 relative">
          <input
            className="form-input"
            placeholder="Email"
            required
            type="email"
          />
        </div>
        <div className=" flex justify-between mt-auto">
          <button
            onClick={goBack}
            type="button"
            className="bg-black placeholder:text-gray w-28 h-16 p-4 rounded-xl font-bold text-white cursor-pointer"
          >
            Go back
          </button>
          <button
            disabled={isLoading}
            className="bg-black placeholder:text-gray w-28 h-16 p-4 rounded-xl font-bold text-white cursor-pointer"
            type="submit"
          >
            {isLoading ? <Loading /> : "Next"}
          </button>
        </div>
      </motion.form>
    </AnimatePresence>
  );
};

export default Step2;
