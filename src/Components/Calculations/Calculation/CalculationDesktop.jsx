import React from "react";
import BeanTable from "../../Orders/RoastingList/Tables/BeanTable";
import ProductTable from "../../Orders/RoastingList/Tables/ProductTable";
import OrderTable from "../../Orders/RoastingList/Tables/OrderTable";
import RoastingListPDF from "./ExportToPDFS/RoastingListPDF";
import ProductTallyPDF from "./ExportToPDFS/ProductTallyPDF";
import { deleteCalculation } from "../../../myApi";
import { useNavigate } from "react-router-dom";
const CalculationDesktop = ({ calculation }) => {
  const navigate = useNavigate();
  const deleteClickHandler = (id) => {
    deleteCalculation({ calculationID: id });
    navigate("/calculations");
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
      </div>
      <div className="flex justify-centre mb-1">
        <div className="flex w-8/12 justify-start">
          <RoastingListPDF beans={calculation.beans} />
          <ProductTallyPDF products={calculation.products} />
        </div>
        <div className=" w-4/12 flex justify-end">
          <button
            onClick={() => {
              deleteClickHandler(calculation._id);
            }}
            className=" bg-red-700 hover:bg-red-500 rounded-sm py-2 px-6  text-white m-1 text-center"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex-grow flex gap-2">
        <div className=" bg-white rounded-md w-3/12 ">
          <OrderTable orders={calculation.orderIDs} loading={false} />
        </div>
        <div className=" bg-white rounded-md w-2/6 ">
          <BeanTable beans={calculation.beans} loading={false} />
        </div>
        <div className=" bg-white rounded-md  w-3/6 ">
          <ProductTable products={calculation.products} loading={false} />
        </div>
      </div>
    </div>
  );
};
export default CalculationDesktop;
