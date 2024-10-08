import { PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

export default function AuthProtected({ children }: PropsWithChildren) {
  const { account } = useSelector((state: RootState) => state.auth);
  const { clockedEmployee } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

    // Check local storage for account data on component mount
    useEffect(() => {
      const storedAccount = localStorage.getItem("account");
      if (storedAccount) {
        const accountData = JSON.parse(storedAccount);
        dispatch(login(accountData)); // Restore account state from local storage
      }
    }, [dispatch]);

  useEffect(() => {
    if (account !== null) {
      if (account.firstLogin) {
        navigate("/newUser", { replace: true });
        return;
      }
      navigate("/clockin", { replace: true });
      return;
    }
    if (account === null) {
      navigate("/", { replace: true });
      return;
    }
    if (clockedEmployee === null) {
      navigate("/clockin", { replace: true });
      return;
    }
  }, [account, navigate, clockedEmployee]);

  return children;
}
