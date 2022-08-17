import React, { useContext } from "react";
import UserContext from "../../Store/UserContext";
import LoginTextInput from "./LoginTextInput";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./logo.png";

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
    <div className="flex flex-col justify-center place-items-center mt-20 mx-2">
      <form className="flex flex-col justify-center w-9/12 bg-zinc-200 rounded-xl">
        <div className="flex justify-center  place-items-center">
          <img src={logo} alt="Glitch" className="w-2/12" />
        </div>
        <div className="text-center text-3xl m-3">Sign In</div>
        <div className="flex flex-col place-items-center gap-3 ">
          <LoginTextInput label={"Email"} autofocus={true} />
          <LoginTextInput label={"Password"} />
        </div>

        <button
          type="submit"
          onClick={() => {
            loginClickHandler();
          }}
          className=" mx-auto w-5/12 text-white rounded-sm p-2 bg-blue-700 hover:bg-blue-500 my-5"
        >
          Log In
        </button>
      </form>
    </div>
  );
};
export default LoginPage;
