import React from "react";
import { useState } from "react";
const DetailsForm = (props) => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const usernameInputChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const ageInputChangeHandler = (event) => {
    setAge(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const user = { username: username, age: age, key: Math.random() };
    props.addUserHandler(user);
    setUsername("");
    setAge("");
  };

  return (
    <form className="max-w-sm rounded overflow-hidden shadow-lg bg">
      <label>Username</label>
      <input
        value={username}
        onChange={usernameInputChangeHandler}
        type="text"
      ></input>
      <br />
      <label>Age(Years)</label>
      <input onChange={ageInputChangeHandler} value={age} type="text"></input>
      <button onClick={formSubmitHandler} type="submit">
        Add User
      </button>
    </form>
  );
};
export default DetailsForm;
