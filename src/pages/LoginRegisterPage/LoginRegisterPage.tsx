import { useEffect, useState } from 'react'
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import { AccountType } from '../../types/types';
import { login } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginRegisterPage = () => {
   const [isRegistered, setIsRegistered] = useState(true);

   const dispatch = useDispatch()
   const navigate = useNavigate()
   useEffect(() => {
    // for protected route purpose
    const storedAccount = localStorage.getItem("account");
      if (storedAccount) {
        const accountData: AccountType = JSON.parse(storedAccount);
        dispatch(login(accountData)); // Restore account state from local storage
        if(accountData.firstLogin){
          navigate("/newuser")
        } else {
          navigate("/clockin")
        }
      }
  },[dispatch, navigate])

  return (
    <div className="bg-gradient-to-r
    from-pink
    via-blue
    to-purple background-animate w-full min-h-dvh flex justify-center items-center p-2">
      {isRegistered ? (
        <Login setIsRegistered={setIsRegistered} />
      ) : (
        <Register setIsRegistered={setIsRegistered} />
      )}
    </div>
  );
};


export default LoginRegisterPage