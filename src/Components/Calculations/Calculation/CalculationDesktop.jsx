import React, { useState } from "react";
import BeanTable from "../../Orders/RoastingList/Tables/BeanTable";
import ProductTable from "../../Orders/RoastingList/Tables/ProductTable";
import OrderTable from "../../Orders/RoastingList/Tables/OrderTable";
import BeansListPDF from "./ExportToPDFS/BeansListPDF";
import ProductTallyPDF from "./ExportToPDFS/ProductTallyPDF";
import { deleteCalculation, getCalculations } from "../../../myApi";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ExportButton from "./ExportToPDFS/ExportButton";
import RoastingListPDF from "./ExportToPDFS/RoastingListPDF";
import Popover from "@mui/material/Popover";
import ExportPopper from "./ExportPopper";
import RoastingList from "./RoastingList";

const CalculationDesktop = ({ calculation }) => {
  const queryClient = useQueryClient();
  const [showRoastingList, setShowRoastingList] = useState(false);
  const calculationsQuery = queryClient.getQueryData(["calculations"]);
  const navigate = useNavigate();

  const changeViewClickHandler = () => {
    setShowRoastingList(!showRoastingList);
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
      </div>
      <div className=" mb-1 flex gap-2">
        <div className=" w-2/12">
          {!showRoastingList && (
            <button
              onClick={changeViewClickHandler}
              className=" w-full rounded-sm bg-blue-700 py-2 px-2 text-center text-white hover:bg-blue-500"
            >
              View Roasting List
            </button>
          )}
          {showRoastingList && (
            <button
              onClick={changeViewClickHandler}
              className=" w-full rounded-sm bg-blue-700 py-2 px-2 text-center text-white hover:bg-blue-500"
            >
              Show Saved Calculation
            </button>
          )}
        </div>
        <div className=" w-2/12">
          <ExportPopper>
            <div className="flex justify-start gap-2 py-1 px-1">
              <RoastingListPDF isCalculated={false} />

              <BeansListPDF beans={calculation.beans} />
              <ProductTallyPDF products={calculation.products} />
            </div>
          </ExportPopper>
        </div>

        <div className=" flex w-8/12 justify-end ">
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
      {showRoastingList && <RoastingList />}
    </div>
  );
};
export default CalculationDesktop;
