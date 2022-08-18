import React from "react";
import BeanTable from "./Tables/BeanTable";
import OrderTable from "./Tables/OrderTable";
import ProductTable from "./Tables/ProductTable";
import SaveCalculationButton from "./SaveCalculationButton";

const RoastingListDesktop = ({
  setShowRoastingList,
  saveCalculationButtonDisabled,
  saveCalculationButtonTitle,
  saveCalculationHandler,
  selectedOrders,
  loading,
  beans,
  products,
}) => {
  return (
    <>
      <div className="my-2 flex gap-2 ">
        <SaveCalculationButton
          title={saveCalculationButtonTitle}
          onClick={saveCalculationHandler}
          loading={saveCalculationButtonDisabled}
        />
        <button
          onClick={() => {
            setShowRoastingList(false);
          }}
          className=" w-52 rounded-sm bg-gray-300  py-2 text-center text-gray-500 hover:bg-gray-100   "
        >
          Change Orders
        </button>
      </div>

      <div className={`mb-2 flex flex-grow gap-2`}>
        <>
          <div className=" w-3/12 rounded-md bg-white ">
            <OrderTable orders={selectedOrders} loading={loading} />
          </div>
          <div className=" w-2/6 rounded-md bg-white ">
            <BeanTable beans={beans} loading={loading} />
          </div>
          <div className=" w-3/6 rounded-md  bg-white ">
            <ProductTable products={products} loading={loading} />
          </div>
        </>
      </div>
    </>
  );
};
export default RoastingListDesktop;
