import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CalculationDesktop from "./CalculationDesktop";
const calculationReducer = (state, action) => {
  switch (action.type) {
    case "setAllFromCalculationList":
      return {
        _id: action.payload._id,
        title: action.payload.title,
        date: action.payload.date,
        orderIDs: action.payload.orderIDs,
        beans: action.payload.beans,
        products: action.payload.products,
        roastingCalculation: action.payload.roastingCalculation,
      };
    case "setAllFromSaveCalculation":
      console.log(action.payload);
      return {
        _id: action.payload.id,
        title: action.payload.title,
        date: action.payload.date,
        orderIDs: action.payload.orderIDs,
        beans: action.payload.beans,
        products: action.payload.products,
        roastingCalculation: action.payload.roastingCalculation,
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
  const navigate = useNavigate();
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
    roastingCalculation: [],
  });

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
    console.log(location.state);
    if (location.state?.obj) {
      calculationDispatch({
        type: "setAllFromSaveCalculation",
        payload: location.state.obj,
      });
    } else if (location?.state) {
      calculationDispatch({
        type: "setAllFromCalculationList",
        payload: location.state,
      });
    } else {
      navigate("/calculations");
    }
  }, []);
  return (
    <div className="restOfScreenHeight">
      {calculation._id && <CalculationDesktop calculation={calculation} />}
    </div>
  );
};
export default Calculation;
