import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { makeCalculation, saveCalculation } from "../../../myApi";
import BeanTable from "./Tables/BeanTable";
import OrderTable from "./Tables/OrderTable";
import ProductTable from "./Tables/ProductTable";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TablePickerButton from "./TablePickerButton";
import { useReducer } from "react";
import InputAlert from "../../UI/InputAlert";
import SaveCalculationButton from "./SaveCalculationButton";
import userEvent from "@testing-library/user-event";
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

  useEffect(() => {
    const res = makeCalculation(selectedOrders);
    res.then((result) => {
      const data = result.data;
      setLoading(false);
      setSaveCalculationButtonDisabled(false);
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
  const [savingCalculation, setSavingCalculation] = useState(false);
  const [calculationTitle, setCalculationTitle] = useState("");
  const saveCalculationHandler = () => {
    setSavingCalculation(true);
  };
  const [saveCalculationButtonTitle, setSaveCalculationButtonTitle] =
    useState("Save Calculation");
  const [saveCalculationButtonDisabled, setSaveCalculationButtonDisabled] =
    useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (calculationTitle.trim().length > 0) {
      const response = saveCalculation({
        title: calculationTitle,
        orderIDs: selectedOrders,
        products,
        beans,
      });
      setSaveCalculationButtonDisabled(true);

      response.then((results) => {
        const _id = results.data._id;
        setSaveCalculationButtonDisabled(true);
        setSaveCalculationButtonTitle("Calculation Saved");
        setCalculationTitle("");
        navigate("/calculations/" + String(_id), {
          state: {
            _id: _id,
            title: results.data.orderIDs,
            date: results.data.date,
            orderIDs: results.data.orderIDs,
            products: results.data.results,
            beans: results.data.beans,
          },
        });
      });
      response.catch(() => {
        setSaveCalculationButtonDisabled(false);
        setSaveCalculationButtonTitle("ERROR! Please save again");
      });
    }
  }, [calculationTitle]);

  return (
    <>
      {savingCalculation && (
        <InputAlert
          setInput={setCalculationTitle}
          title={"Save Calculation"}
          description="Please enter a calculation title"
          cancel={setSavingCalculation}
        />
      )}

      {windowDimensions.width > 1200 && (
        <>
          <div className="flex justify-center w-5/6 mx-auto mb-2">
            <button
              onClick={() => {
                setShowRoastingList(false);
              }}
              className=" bg-gray-300 text-gray-500 hover:bg-gray-200 w-1/12 rounded-md py-2  m-1 text-center   "
            >
              Back
            </button>
            <SaveCalculationButton
              title={saveCalculationButtonTitle}
              onClick={saveCalculationHandler}
              loading={saveCalculationButtonDisabled}
            />
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
              <button
                onClick={() => {}}
                className=" bg-blue-700 hover:bg-blue-500 w-2/6 py-1  text-white text-center text-lg border-black rounded-br-md   "
              >
                Save Calculation
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
