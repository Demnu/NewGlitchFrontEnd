import React from "react";
import User from "../User/User";
const Users = (props) => {
  return (
    <ul>
      {props.users.map((user) => (
        <User username={user.username} age={user.age} key={user.key} />
      ))}
    </ul>
  );
};
export default Users;
