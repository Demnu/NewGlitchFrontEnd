import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../Store/UserContext";
import LoginTextInput from "./LoginTextInput";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./logo.png";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../myApi";
import Notification from "../UI/Notification";

const LoginPage = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/orders";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (userCtx.loggedIn === true) {
      navigate(from, { replace: true });
    }
  }, [userCtx]);

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginMutation = useMutation(
    () => {
      return login({ email: email, password: password });
    },
    {
      onSuccess: () => {
        userCtx.setLoggedIn(true);
        navigate(from, { replace: true });
      },
      onError: (error) => {
        setErrorMsg(error.response.data);
      },
    }
  );
  return (
    <div className="flex flex-col justify-center place-items-center mt-20 mx-2">
      <form className="flex flex-col justify-center w-9/12 bg-zinc-200 rounded-xl">
        <div className="flex justify-center  place-items-center">
          <img src={logo} alt="Glitch" className="w-2/12" />
        </div>

        <div className="text-center text-3xl m-3">Sign In</div>
        {errorMsg.length > 0 && (
          <div className="mx-auto w-5/12 m-2">
            <Notification msg={errorMsg} error={true} noTimeout={true} />
          </div>
        )}

        <div className="flex flex-col place-items-center gap-3 ">
          <LoginTextInput
            label={"Email"}
            autofocus={true}
            onChange={emailChangeHandler}
            value={email}
          />
          <LoginTextInput
            label={"Password"}
            onChange={passwordChangeHandler}
            value={password}
          />
        </div>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            loginMutation.mutate();
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
