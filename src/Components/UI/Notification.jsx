import React, { useEffect, useState } from "react";
import Button from "./Button";
import ReactDOM from "react-dom";
import DoneIcon from "@mui/icons-material/Done";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
const Notification = ({ msg, error, noTimeout }) => {
  const [showNotification, setShowNotification] = useState(true);
  useEffect(() => {
    if (!noTimeout) {
      setTimeout(() => {
        setShowNotification(false);
      }, 10000);
    }
  }, []);

  return (
    <>
      {showNotification && (
        <div
          className={`justify-left flex gap-2 rounded-md py-1 px-2 text-white  ${
            error ? "bg-red-700" : "bg-green-600"
          }  `}
        >
          {error ? <ReportProblemIcon /> : <DoneIcon />}
          {msg}
        </div>
      )}
    </>
  );
};
export default Notification;
