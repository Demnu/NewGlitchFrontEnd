import React, { useEffect } from "react";
const Calucations = ({ selectLink }) => {
  useEffect(() => {
    selectLink("Calculations");
  }, []);

  return (
    <div className=" text-white">
      <span>Calculations</span>
    </div>
  );
};
export default Calucations;
