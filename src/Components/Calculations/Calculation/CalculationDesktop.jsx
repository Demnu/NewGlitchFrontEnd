import React from "react";
import BeanTable from "../../Orders/RoastingList/Tables/BeanTable";
import ProductTable from "../../Orders/RoastingList/Tables/ProductTable";
import OrderTable from "../../Orders/RoastingList/Tables/OrderTable";
import RoastingListPDF from "./ExportToPDFS/RoastingListPDF";
import ProductTallyPDF from "./ExportToPDFS/ProductTallyPDF";
const CalculationDesktop = ({ calculation }) => {
  return (
    <div className=" h-screen flex flex-col px-2 py-2 ">
      <div className="flex gap-4 pb-2">
        <div>
          <span className=" font-bold">Calculation: </span>
          {calculation.title}
        </div>
        <div>
          <span className="font-bold">Date Saved: </span> {calculation.date}
        </div>
      </div>
      <RoastingListPDF beans={calculation.beans} />
      <ProductTallyPDF products={calculation.products} />
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
