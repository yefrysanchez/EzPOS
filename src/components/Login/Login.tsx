import { motion } from "framer-motion";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { fadeUp } from "../../animations/animations";
import { FormEvent, useState } from "react";
import AlertError from "../Alerts/AlertError";
import Loading from "../Loading/Loading";

type FuncProp = {
  setIsRegistered: (isRegistered: boolean) => void;
};

const Login: React.FC<FuncProp> = ({ setIsRegistered }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault()
    setIsLoading(true);
    setTimeout(() => {
      setError("User not found");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <motion.section
      variants={fadeUp}
      animate="enter"
      initial="initial"
      className="bg-white text-black rounded-xl p-8 shadow-lg w-full max-w-[380px]"
    >
      <form onSubmit={handleSubmit} className="text-center mb-4">
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
        <h2 className="mb-8 text-gray-700">
          Please enter your Email and Password
        </h2>
        {error && <AlertError error={error} />}

        <div className="mb-4 relative">
          <input
            className="bg-lightGray/10 placeholder:text-gray block w-full p-4 rounded-xl"
            placeholder="Email"
            required
            type="email"
          />
          <div className="absolute top-3 right-2 text-3xl text-gray-400">
            <CiUser />
          </div>
        </div>
        <div className="mb-2 relative">
          <input
            className="bg-lightGray/10 placeholder:text-gray block w-full p-4 rounded-xl"
            placeholder="Password"
            required
            type="password"
          />
          <div className="absolute top-3 right-2 text-3xl text-gray-400">
            <CiLock />
          </div>
        </div>

        <p className="text-sm text-blue-700 mb-4 text-end hover:underline cursor-pointer">
          Forgot password?
        </p>
        <button
          disabled={isLoading}
          className="bg-black placeholder:text-gray  text-xl w-full h-16 p-4 rounded-xl font-bold text-white cursor-pointer"
          type="submit"
        >
          {isLoading ? <Loading /> : "Login"}
        </button>
      </form>
      <div>
        <h2 className="text-center font-bold">
          Not a member yet?{" "}
          <span
            onClick={() => setIsRegistered(false)}
            className="text-cyan-600 hover:underline cursor-pointer"
          >
            Register!
          </span>
        </h2>
      </div>
    </motion.section>
  );
};

export default Login;
