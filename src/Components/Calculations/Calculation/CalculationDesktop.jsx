import React, { useState } from "react";
import BeanTable from "../../Orders/RoastingList/Tables/BeanTable";
import ProductTable from "../../Orders/RoastingList/Tables/ProductTable";
import OrderTable from "../../Orders/RoastingList/Tables/OrderTable";
import BeansListPDF from "./ExportToPDFS/BeansListPDF";
import ProductTallyPDF from "./ExportToPDFS/ProductTallyPDF";
import Notification from "../../UI/Notification";
import {
  calculateRoastingList,
  deleteCalculation,
  getCalculations,
  saveRoastingCalculation,
} from "../../../myApi";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ExportButton from "./ExportToPDFS/ExportButton";
import RoastingListPDF from "./ExportToPDFS/RoastingListPDF";
import Popover from "@mui/material/Popover";
import ExportPopper from "./ExportPopper";
import RoastingList from "./RoastingList";
import { useEffect } from "react";

const CalculationDesktop = ({ calculation }) => {
  const queryClient = useQueryClient();
  const [reset, setReset] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);
  const [showRoastingList, setShowRoastingList] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const calculationsQuery = queryClient.getQueryData(["calculations"]);
  const [loading, setLoading] = useState(true);
  const [blends, setBlends] = useState([]);
  const navigate = useNavigate();

  const showRoastingCalculation = () => {
    setShowRoastingList(true);
  };
  const showSummary = () => {
    setShowRoastingList(false);
  };
  const deleteCalculationMutation = useMutation((id) => {
    deleteCalculation({ calculationID: id }).then(() => {
      let changedCalcs = calculationsQuery.data.filter(
        (calc) => calc.id != calculation._id
      );
      calculationsQuery.data = changedCalcs;
      queryClient.setQueryData(["calculations"], calculationsQuery);
      navigate("/calculations", { state: { optimisticUpdate: true } });
    });
  });

  const saveRoastingCalculationMutation = useMutation(
    () => {
      return saveRoastingCalculation({
        _id: calculation._id,
        roastingCalculation: blends,
      });
    },
    {
      onSettled: () => {
        setChangesMade(false);
        setIsCalculated(true);
        console.log(blends);
      },
    }
  );

  useEffect(() => {
    if (calculation.roastingCalculation.length <= 0) {
      console.log("NEEDS TO BE CALCULATED");
      const response = calculateRoastingList({
        products: calculation.products,
      });
      response.then((data) => {
        let tempBlends = data.data;

        for (let blend of tempBlends) {
          blend.production = blend.coffeeOrdered - blend.overflow;
          let tempGreen = blend.production * 1.18 * 1.2;
          blend.green = tempGreen.toFixed(2);
        }

        setBlends(tempBlends);
        setLoading(false);
      });
    } else {
      setLoading(false);
      setIsCalculated(true);
      setBlends(calculation.roastingCalculation);
    }
  }, []);

  const resetClickHandler = () => {
    setLoading(true);
    const response = calculateRoastingList({ products: calculation.products });
    response.then((data) => {
      let tempBlends = data.data;

      for (let blend of tempBlends) {
        blend.production = blend.coffeeOrdered - blend.overflow;
        let tempGreen = blend.production * 1.18 * 1.2;
        blend.green = tempGreen.toFixed(2);
      }

      setBlends(tempBlends);
      setLoading(false);
    });
    setChangesMade(true);
  };
  return (
    <div className=" restOfScreenHeight flex flex-col px-2 py-2 ">
      <div className="flex gap-4 pb-1 text-black">
        <div>
          <span className=" font-bold">Calculation: </span>
          {calculation.title}
        </div>
        <div>
          <span className="font-bold">Date Saved: </span> {calculation.date}
        </div>
        <div>
          <span className="font-bold">Roasting list calculated: </span>{" "}
          {isCalculated ? "true" : "false"}
        </div>
      </div>
      <div className=" mb-1 flex gap-2">
        <div className=" flex w-6/12 gap-2">
          <ExportPopper>
            <div className="flex justify-start gap-2 py-1 px-1">
              <div className=" ml-1">
                <RoastingListPDF
                  isCalculated={isCalculated}
                  blends={blends}
                  title={calculation.title}
                />
              </div>

              <BeansListPDF
                beans={calculation.beans}
                title={calculation.title}
              />
              <div className=" mr-1">
                <ProductTallyPDF
                  products={calculation.products}
                  title={calculation.title}
                />
              </div>
            </div>
          </ExportPopper>
        </div>
        <div className=" flex w-6/12 justify-end ">
          <button
            onClick={() => {
              deleteCalculationMutation.mutate(calculation._id);
            }}
            className={`${
              deleteCalculationMutation.isLoading && "disabled"
            }  rounded-sm bg-red-700 py-2 px-6  text-center text-white hover:bg-red-500`}
          >
            {`${deleteCalculationMutation.isLoading ? "DELETING" : "Delete"}`}
          </button>
        </div>
      </div>
      <div className=" mt-2 flex items-center gap-2 align-middle font-bold">
        <button
          onClick={showSummary}
          className={`  w-44 rounded-sm p-2 hover:bg-white ${
            !showRoastingList && "bg-white"
          } `}
        >
          Summary
        </button>
        <button
          onClick={showRoastingCalculation}
          className={` w-44 rounded-sm p-2 hover:bg-white ${
            showRoastingList && "bg-white"
          } `}
        >
          Roasting Calculation
        </button>
        {showRoastingList && (
          <>
            <button
              onClick={() => {
                saveRoastingCalculationMutation.mutate();
              }}
              className={`w-20 rounded-sm bg-blue-700 p-2 font-normal text-white hover:bg-blue-500 `}
            >
              Save
            </button>
            <button
              onClick={resetClickHandler}
              className={`w-20 rounded-sm bg-white p-2 font-normal text-black  hover:bg-blue-100 `}
            >
              Reset
            </button>
            {changesMade && (
              <div className="flex h-full items-center rounded-md bg-red-300 px-2 align-middle">
                Unsaved Changes
              </div>
            )}
            {saveRoastingCalculationMutation.isSuccess && (
              <div className=" w-52 font-normal">
                <Notification msg={"Calculation Saved!"} />
              </div>
            )}
          </>
        )}
      </div>
      {!showRoastingList && (
        <div className="flex flex-grow gap-2">
          <div className=" w-3/12 rounded-md bg-white ">
            <OrderTable orders={calculation.orderIDs} loading={false} />
          </div>
          <div className=" w-2/6 rounded-md bg-white ">
            <BeanTable beans={calculation.beans} loading={false} />
          </div>
          <div className=" w-3/6 rounded-md  bg-white ">
            <ProductTable products={calculation.products} loading={false} />
          </div>
        </div>
      )}
      {showRoastingList && (
        <div className=" flex-grow rounded-md bg-white">
          <RoastingList
            products={calculation.products}
            reset={reset}
            setChangesMade={setChangesMade}
            loading={loading}
            blends={blends}
            setBlends={setBlends}
            setLoading={setLoading}
          />
        </div>
      )}
    </div>
  );
};
export default CalculationDesktop;
