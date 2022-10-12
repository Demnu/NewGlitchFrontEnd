import React from "react";
import BeanTable from "./Tables/BeanTable";
import OrderTable from "./Tables/OrderTable";
import ProductTable from "./Tables/ProductTable";
import SaveCalculationButton from "./SaveCalculationButton";
import { useState } from "react";

const RoastingListDesktop = ({
  setShowRoastingList,
  selectedOrders,
  loading,
  beans,
  products,
  saveCalculationMutation,
  setTitle,
  title,
}) => {
  const [titleError, setTitleError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const saveCalculationHandler = () => {
    if (String(title).trim().length > 0) {
      setIsSaving(true);
      saveCalculationMutation.mutate();
    } else {
      setTitleError(true);
    }
  };

  const titleInputHandler = (e) => {
    setTitleError(false);
    setTitle(e.target.value);
  };
  return (
    <>
      <div className="my-2 flex gap-2 ">
        <form className=" flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              titleInputHandler(e);
            }}
            placeholder="Calculation Title"
            className={`border bg-white ${
              !titleError
                ? "border-gray-300 hover:border-blue-300 focus:border-blue-500"
                : "hover:border-bg-red-300 border-red-500 focus:border-red-600"
            }   w-60 rounded-sm p-2 focus:outline-none `}
          />
          <button
            disabled={loading}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              saveCalculationHandler();
            }}
            className={`w-52 rounded-sm ${
              loading || isSaving || title.length === 0
                ? "bg-gray-300 text-gray-500"
                : "bg-blue-700  py-2 text-center text-white hover:bg-blue-500 "
            }  `}
          >
            {isSaving ? "Saving Calculation" : "Save Calculation"}
          </button>
        </form>

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
