import React, { useContext } from "react";
import UserContext from "../../Store/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/orders";

  const loginClickHandler = (e) => {
    userCtx.setLoggedIn(true);
    navigate(from);
  };
  return (
    <div className="flex flex-col max-w-lg  bg-zinc-200">
      <div className=" text-center">Welcome</div>
      <button
        onClick={() => {
          loginClickHandler();
        }}
        className=" mx-auto w-52 text-white rounded-sm p-2 bg-blue-700 hover:bg-blue-500"
      >
        Log In
      </button>
    </div>
  );
};
export default LoginPage;
