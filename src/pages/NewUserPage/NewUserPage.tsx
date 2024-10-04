import { useState } from "react";
import Stepper from "../../components/MultiFormSteps/Stepper";
import Step1 from "../../components/MultiFormSteps/Step1";
import Step2 from "../../components/MultiFormSteps/Step2";
import Step3 from "../../components/MultiFormSteps/Step3";


const NewUserPage = () => {
  const [step, setStep] = useState(1);

  const multiFormSteps = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        return <Step1 step={step} setStep={setStep} />
      case 2:
        return <Step2 step={step} setStep={setStep} />
      case 3:
          return <Step3 step={step} setStep={setStep} />
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-gradient-to-r
    from-pink
    via-blue
    to-purple background-animate w-full min-h-screen flex flex-col justify-center items-center p-2"
    >
      <div className="max-w-xl min-h-[600px] w-full flex flex-col gap-8 items-center bg-white rounded-xl p-4">
        <Stepper step={step} />
        {multiFormSteps(step)}
      </div>
    </div>
  );
};

export default NewUserPage;
