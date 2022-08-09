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
      {/* <div className="flex justify-between w-5/6 mx-auto">
        <div className=" flex w-3/12">
          <button
            onClick={() => {
              setShowRoastingList(false);
            }}
            className=" bg-gray-300 text-gray-500 hover:bg-gray-100 flex-grow rounded-sm py-2  m-1 text-center   "
          >
            Add/Remove Orders
          </button>
        </div>

        <SaveCalculationButton
          title={saveCalculationButtonTitle}
          onClick={saveCalculationHandler}
          loading={saveCalculationButtonDisabled}
        />
        <div className=" w-3/12"></div>
      </div> */}
      <div className="flex gap-2 my-2 ">
        <SaveCalculationButton
          title={saveCalculationButtonTitle}
          onClick={saveCalculationHandler}
          loading={saveCalculationButtonDisabled}
        />
        <button
          onClick={() => {
            setShowRoastingList(false);
          }}
          className=" bg-gray-300 text-gray-500 hover:bg-gray-100  rounded-sm py-2 w-52 text-center   "
        >
          Change Orders
        </button>
      </div>

      <div className={`flex gap-2 flex-grow mb-2`}>
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
  );
};
export default RoastingListDesktop;
