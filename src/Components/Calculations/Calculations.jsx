import React, { useEffect } from "react";
const Calculations = ({ selectLink }) => {
  useEffect(() => {
    selectLink("Calculations");
  }, []);

  return (
    <div className=" text-white">
      <span className="">Calculations</span>
    </div>
  );
};
export default Calculations;
