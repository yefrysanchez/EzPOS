import { motion } from "framer-motion";
import { fadeUp } from "../../animations/animations";
import { FormEvent, useState } from "react";
import AlertError from "../Alerts/AlertError";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

type FuncProp = {
  setIsRegistered: (isRegistered: boolean) => void;
};

const Register: React.FC<FuncProp> = ({ setIsRegistered }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url = import.meta.env.VITE_BACKEND + "auth/register";
  const navigate = useNavigate();
  // Redux /////////
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${first} ${second}`,
          email,
          password,
        }),
      });

      if (!res.ok) {
        setIsLoading(false);
        throw new Error("Please complete all fields.");
      }
      const data = await res.json();
      dispatch(login(data));
      setError(null);
      setIsLoading(false);

      navigate("/newUser");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
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
            onChange={(e) => setFirst(e.target.value)}
            value={first}
            className="bg-lightGray/10 placeholder:text-gray w-full p-4 rounded-xl mb-4 md:mb-0 block md:w-1/2 "
            placeholder="First Name"
            required
            type="text"
          />
          <input
            onChange={(e) => setSecond(e.target.value)}
            value={second}
            className="bg-lightGray/10 placeholder:text-gray w-full p-4 rounded-xl block md:w-1/2"
            placeholder="Last Name"
            required
            type="text"
          />
        </div>

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="bg-lightGray/10 placeholder:text-gray block w-full p-4 rounded-xl mb-4"
          placeholder="Email"
          required
          type="email"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
