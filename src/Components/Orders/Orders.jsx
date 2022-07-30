import React, { useEffect } from "react";
const Orders = ({ selectLink }) => {
  useEffect(() => {
    selectLink("Orders");
  }, []);

  return (
    <div className=" text-white">
      <span>ORDERS</span>
    </div>
  );
};
export default Orders;
