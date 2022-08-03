import React, { useEffect, useState } from "react";
import { makeCalculation } from "../../../myApi";
import BeanTable from "./Tables/BeanTable";
import OrderTable from "./Tables/OrderTable";
import ProductTable from "./Tables/ProductTable";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TablePickerButton from "./TablePickerButton";
import { useReducer } from "react";
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
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
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [beans, setBeans] = useState([]);

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
  const [displayTableState, displayTableStateDispatch] = useReducer(
    DisplayTableReducer,
    {
      showOrderIDs: false,
      showRoastingList: true,
      showProductsList: false,
    }
  );
  const showOrderIds = () => {};
  return (
    <>
      {windowDimensions.width > 1200 && (
        <>
          <div className="flex justify-center">
            <button
              className={
                "bg-blue-700 hover:bg-blue-500 w-3/6 rounded-md py-2 text-white m-1 text-center"
              }
            >
              Calculate Orders
            </button>
          </div>
          <div className={`mx-2 flex gap-2 pb-2 h-screen`}>
            <>
              <div className=" bg-white rounded-md w-3/12 ">
                <OrderTable orders={selectedOrders} loading={loading} />
              </div>
              <div className=" bg-white rounded-md w-2/6 ">
                <BeanTable beans={beans} loading={loading} />
              </div>
              <div className=" bg-white rounded-md  w-3/6 ">
                <ProductTable products={products} loading={loading} />
              </div>
            </>
          </div>
        </>
      )}
      {windowDimensions.width <= 1200 && (
        <>
          <div className="">
            <div className="flex justify-center w-5/6 mb-1 divide-x-2  mx-auto shadow-lg ">
              <button
                onClick={() => {
                  setShowRoastingList(false);
                }}
                className=" bg-zinc-400 hover:bg-zinc-500 w-2/6 py-1  text-white text-center text-lg border-black rounded-bl-md   "
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
              <button className=" bg-blue-600 hover:bg-blue-700 w-2/6 py-1  text-white text-center text-lg border-black rounded-br-md   ">
                Export PDF
              </button>
            </div>
          </div>
          <div className=" mx-2 flex justify-center flex-grow">
            <div className=" bg-white rounded-md flex-grow mt-4">
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
