import { motion } from "framer-motion";
import { fadeUp } from "../../animations/animations";
import { FormEvent, useState } from "react";
import AlertError from "../Alerts/AlertError";
import Loading from "../Loading/Loading";

type FuncProp = {
  setIsRegistered: (isRegistered: boolean) => void;
};

const Register: React.FC<FuncProp> = ({ setIsRegistered }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setError("Server is dowm :(");
    }, 2000);
  };
  return (
    <motion.section
      variants={fadeUp}
      animate="enter"
      initial="initial"
      className="bg-white text-black rounded-xl p-8 shadow-lg w-full max-w-[500px] "
    >
      <form onSubmit={handleSubmit} className="text-center mb-4">
        <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
        <h2 className="mb-8 text-gray-700">Please complete all fields</h2>
        {error && <AlertError error={error} />}

        <div className="md:flex gap-2 mb-4">
          <input
            className="bg-lightGray/10 placeholder:text-gray w-full p-4 rounded-xl mb-4 md:mb-0 block md:w-1/2 "
            placeholder="Name"
            required
            type="text"
          />
          <input
            className="bg-lightGray/10 placeholder:text-gray w-full p-4 rounded-xl block md:w-1/2"
            placeholder="Last name"
            required
            type="text"
          />
        </div>

        <input
          className="bg-lightGray/10 placeholder:text-gray block w-full p-4 rounded-xl mb-4"
          placeholder="Username"
          required
          type="text"
        />

        <input
          className="bg-lightGray/10 placeholder:text-gray block w-full p-4 rounded-xl mb-4"
          placeholder="Email"
          required
          type="email"
        />

        <input
          className="bg-lightGray/10 placeholder:text-gray block w-full p-4 rounded-xl mb-4"
          placeholder="Password"
          required
          type="password"
        />

        <button
          className="bg-black text-white active:bg-gray text-xl duration-200 h-16 w-full p-4 rounded-xl font-bold cursor-pointer"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loading /> : "Register"}
        </button>
      </form>
      <div>
        <h2 className="text-center font-bold">
          Already a member?{" "}
          <span
            onClick={() => setIsRegistered(true)}
            className="text-violet-500 hover:underline cursor-pointer"
          >
            Login!
          </span>
        </h2>
      </div>
    </motion.section>
  );
};

export default Register;
