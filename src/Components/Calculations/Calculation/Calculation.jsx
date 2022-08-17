import React, { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import BeanTable from "../../Orders/RoastingList/Tables/BeanTable";
import ProductTable from "../../Orders/RoastingList/Tables/ProductTable";
import OrderTable from "../../Orders/RoastingList/Tables/OrderTable";
import CalculationDesktop from "./CalculationDesktop";
import CalculationMobile from "./CalculationMobile";
import { useQueryClient } from "@tanstack/react-query";
const calculationReducer = (state, action) => {
  switch (action.type) {
    case "setAllFromRedirect":
      return {
        _id: action.payload._id,
        title: action.payload.title,
        date: action.payload.date,
        orderIDs: action.payload.orderIDs,
        beans: action.payload.beans,
        products: action.payload.products,
      };
  }
};
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
const Calculation = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const location = useLocation();
  const [calculation, calculationDispatch] = useReducer(calculationReducer, {
    _id: null,
    title: "",
    date: "",
    orderIDs: [],
    beans: [],
    products: [],
  });

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
    if (location.state) {
      calculationDispatch({
        type: "setAllFromRedirect",
        payload: location.state,
      });
    } else {
    }
  }, []);
  return (
    <div className="restOfScreenHeight">
      {windowDimensions.width > 1200 && calculation._id && (
        <CalculationDesktop calculation={calculation} />
      )}
      {windowDimensions.width <= 1200 && calculation._id && (
        <div>
          <CalculationMobile calculation={calculation} />
        </div>
      )}
    </div>
  );
};
export default Calculation;
