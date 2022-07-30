import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
const Orders = ({ selectLink }) => {
  useEffect(() => {
    selectLink("orders");
  }, []);

  return (
    <div className=" text-white">
      <span>ORDERS</span>
    </div>
  );
};
export default Orders;
