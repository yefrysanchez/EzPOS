import Stepper from "../../components/MultiFormSteps/Stepper";
import Step1 from "../../components/MultiFormSteps/Step1";
import Step2 from "../../components/MultiFormSteps/Step2";
import Step3 from "../../components/MultiFormSteps/Step3";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";


const NewUserPage = () => {
  const { step } = useSelector((state: RootState) => state.auth);
  const localStep:number = Number(localStorage.getItem("step")) || step
  const multiFormSteps = (step: number) => {
    switch (step) {
      case 1:
        return <Step1 />
      case 2:
        return <Step2 />
      case 3:
          return <Step3 />
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-gradient-to-r
    from-pink
    via-blue
    to-purple background-animate w-full h-svh flex p-1 flex-col justify-center items-center lg:p-2"
    >
      <div className="max-w-xl sm:min-h-[500px] h-fit w-full flex flex-col gap-8 items-center bg-white rounded-xl  overflow-y-scroll hide-scrollbar-webkit  hide-scrollbar-firefox">
        <Stepper />
        {multiFormSteps(localStep)}
      </div>
    </div>
  );
};

export default NewUserPage;
