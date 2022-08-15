import React, { useEffect, useState } from "react";
import Button from "./Button";
import ReactDOM from "react-dom";
import DoneIcon from "@mui/icons-material/Done";

const Notification = ({ msg, error }) => {
  const [showNotification, setShowNotification] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowNotification(false);
    }, 10000);
  }, []);

  return (
    <>
      {showNotification && (
        <div
          className={`flex justify-left gap-2 text-white rounded-md py-1 px-2 max-w-sm ${
            error ? "bg-red-700" : "bg-green-600"
          }  `}
        >
          <DoneIcon /> {msg}
        </div>
      )}
    </>
  );
};
export default Notification;
