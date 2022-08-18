import React from "react";
import BeanTable from "../../Orders/RoastingList/Tables/BeanTable";
import ProductTable from "../../Orders/RoastingList/Tables/ProductTable";
import OrderTable from "../../Orders/RoastingList/Tables/OrderTable";
import RoastingListPDF from "./ExportToPDFS/RoastingListPDF";
import ProductTallyPDF from "./ExportToPDFS/ProductTallyPDF";
import { deleteCalculation, getCalculations } from "../../../myApi";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const CalculationDesktop = ({ calculation }) => {
  const queryClient = useQueryClient();
  const calculationsQuery = queryClient.getQueryData(["calculations"]);
  const navigate = useNavigate();

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
      <div className="justify-centre mb-1 flex">
        <div className="flex w-8/12 justify-start gap-2 py-1">
          <RoastingListPDF beans={calculation.beans} />
          <ProductTallyPDF products={calculation.products} />
        </div>
        <div className=" flex w-4/12 justify-end">
          <button
            onClick={() => {
              deleteCalculationMutation.mutate(calculation._id);
            }}
            className={`${
              deleteCalculationMutation.isLoading && "disabled"
            } m-1 rounded-sm bg-red-700 py-2 px-6  text-center text-white hover:bg-red-500`}
          >
            {`${deleteCalculationMutation.isLoading ? "DELETING" : "Delete"}`}
          </button>
        </div>
      </div>

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
    </div>
  );
};
export default CalculationDesktop;
