import { motion } from "framer-motion";
import { CiUser, CiLock } from "react-icons/ci";
import { fadeUp } from "../../animations/animations";
import { FormEvent, useState } from "react";
import AlertError from "../Alerts/AlertError";
import Loading from "../Loading/Loading";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

type FuncProp = {
  setIsRegistered: (isRegistered: boolean) => void;
};

const Login: React.FC<FuncProp> = ({ setIsRegistered }) => {
  const backend = import.meta.env.VITE_BACKEND;
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Basic validation
      if (!email || !password) {
        throw new Error("Please fill in all fields.");
      }

      const res = await fetch(`${backend}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.msg)
        return
      }

      const data = await res.json();
      dispatch(login(data));

      navigate("/clockin"); // Ensure navigation is after a successful login
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };

  const demoLogin = () => {
    setEmail("demo@test.com");
    setPassword("1234");
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
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="Email"
            required
            type="email"
            value={email}
          />
          <div className="absolute top-3 right-2 text-3xl text-gray-400">
            <CiUser />
          </div>
        </div>
        <div className="mb-2 relative">
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="Password"
            required
            type="password"
            value={password}
          />
          <div className="absolute top-3 right-2 text-3xl text-gray-400">
            <CiLock />
          </div>
        </div>

        <p className="text-sm text-blue-700 mb-4 text-end hover:underline cursor-pointer">
          Forgot password?
        </p>
        <button
        onClick={demoLogin}
          disabled={isLoading}
          className="bg-gray mb-2 placeholder:text-gray text-lg w-full h-16 p-4 rounded-xl font-bold text-white cursor-pointer"
          type="submit"
        >
          {isLoading ? <Loading /> : "Use Demo Account"}
        </button>
        <button
          disabled={isLoading}
          className="bg-black placeholder:text-gray text-xl w-full h-16 p-4 rounded-xl font-bold text-white cursor-pointer"
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
