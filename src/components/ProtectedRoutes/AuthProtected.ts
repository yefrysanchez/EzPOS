import { PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

export default function AuthProtected({ children }: PropsWithChildren) {
  const { account } = useSelector((state: RootState) => state.auth);
  const { clockedEmployee } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (account !== null) {
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
