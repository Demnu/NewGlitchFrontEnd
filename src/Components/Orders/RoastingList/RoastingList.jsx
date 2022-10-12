import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { makeCalculation, saveCalculation } from "../../../myApi";
import BeanTable from "./Tables/BeanTable";
import OrderTable from "./Tables/OrderTable";
import ProductTable from "./Tables/ProductTable";
import TablePickerButton from "./TablePickerButton";
import { useReducer } from "react";
import CalculationTitleAlert from "./CalculationTitleAlert";
import RoastingListDesktop from "./RoastingListDesktop";
import { useMutation, useQueryClient } from "@tanstack/react-query";
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
function compareProducts(productA, productB) {
  var stringA = String(productA.id);
  var stringB = String(productB.id);
  return stringA.localeCompare(stringB);
}

function compareBeans(productA, productB) {
  var stringA = String(productA.id);
  var stringB = String(productB.id);
  return stringA.localeCompare(stringB);
}
const DisplayTableReducer = (state, action) => {
  switch (action.type) {
    case "showOrderIDs":
      return {
        showOrderIDs: true,
        showRoastingList: false,
        showProductsList: false,
      };
    case "showRoastingList":
      return {
        showOrderIDs: false,
        showRoastingList: true,
        showProductsList: false,
      };
    case "showProductTally":
      return {
        showOrderIDs: false,
        showRoastingList: false,
        showProductsList: true,
      };
    default:
      return {
        showOrderIDs: false,
        showRoastingList: true,
        showProductsList: false,
      };
  }
};
const RoastingList = ({ selectedOrders, setShowRoastingList }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [beans, setBeans] = useState([]);
  const [title, setTitle] = useState([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const calculationsQuery = queryClient.getQueryData(["calculations"]);
  const [savingCalculation, setSavingCalculation] = useState(false);
  const saveCalculationHandler = () => {
    setSavingCalculation(true);
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [displayTableState, displayTableStateDispatch] = useReducer(
    DisplayTableReducer,
    {
      showOrderIDs: false,
      showRoastingList: true,
      showProductsList: false,
    }
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const saveCalculationMutation = useMutation(() => {
    saveCalculation({
      title: title,
      orderIDs: selectedOrders,
      products,
      beans,
    }).then((response) => {
      const results = response.data;
      let date = new Date();

      let obj = {
        id: results._id,
        title: results.title,
        date: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
        orderIDs: results.orderIDs,
        products: results.products,
        beans: results.beans,
        roastingCalculation: [],
      };
      console.log(obj);
      try {
        calculationsQuery.data.push(obj);
      } catch (e) {}
      navigate("/calculations/" + String(results._id), { state: { obj } });
    });
  });

  useEffect(() => {
    const res = makeCalculation(selectedOrders);
    res.then((result) => {
      const data = result.data;
      setLoading(false);
      var productsArray = data[1];
      productsArray.sort(compareProducts);
      setProducts(data[1]);
      var beansData = data[0];
      beansData.sort(compareBeans);
      setBeans(beansData);
    });
  }, []);

  return (
    <>
      {windowDimensions.width > 1200 && (
        <div className="restOfScreenHeight flex flex-col">
          <RoastingListDesktop
            setShowRoastingList={setShowRoastingList}
            saveCalculationMutation={saveCalculationMutation}
            saveCalculationHandler={saveCalculationHandler}
            loading={loading}
            products={products}
            selectedOrders={selectedOrders}
            beans={beans}
            setTitle={setTitle}
            title={title}
          />
        </div>
      )}
      {windowDimensions.width <= 1200 && (
        <>
          <div className="">
            <div className="mx-auto mb-1 flex w-5/6 justify-center  divide-x-2 shadow-lg ">
              <button
                onClick={() => {
                  setShowRoastingList(false);
                }}
                className=" w-2/6 rounded-bl-md border-black bg-zinc-400  py-1 text-center text-lg text-white hover:bg-zinc-500   "
              >
                Back
              </button>
              <TablePickerButton
                selected={displayTableState.showOrderIDs}
                title={"Order ID's"}
                onClick={() => {
                  displayTableStateDispatch({ type: "showOrderIDs" });
                }}
              />

              <TablePickerButton
                selected={displayTableState.showRoastingList}
                title={"Roasting List"}
                onClick={() => {
                  displayTableStateDispatch({ type: "showRoastingList" });
                }}
              />
              <TablePickerButton
                selected={displayTableState.showProductsList}
                title={"Product Tally"}
                rounded=""
                color="blue"
                onClick={() => {
                  displayTableStateDispatch({ type: "showProductTally" });
                }}
              />
              {/* <TablePickerButton title={"Export PDF"} /> */}
              <button
                onClick={() => {}}
                className=" w-2/6 rounded-br-md border-black bg-blue-700  py-1 text-center text-lg text-white hover:bg-blue-500   "
              >
                Save Calculation
              </button>
            </div>
          </div>
          <div className=" mx-2 flex flex-grow justify-center">
            <div className=" mt-4 flex-grow rounded-md bg-white">
              {displayTableState.showOrderIDs && (
                <OrderTable orders={selectedOrders} loading={loading} />
              )}
              {displayTableState.showRoastingList && (
                <BeanTable beans={beans} loading={loading} />
              )}
              {displayTableState.showProductsList && (
                <ProductTable products={products} loading={loading} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default RoastingList;
