import React, { useEffect, useState } from "react";
import { makeCalculation } from "../../../myApi";
import BeanTable from "./Tables/BeanTable";
import OrderTable from "./Tables/OrderTable";
import ProductTable from "./Tables/ProductTable";

const RoastingList = ({ selectedOrders }) => {
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
      setBeans(beansData);
      console.log(data[1]);
    });
  }, []);
  return (
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

      <div className="mx-2 flex gap-4 py-5 h-screen">
        {!loading && (
          <>
            <div className=" bg-white rounded-md h-min">
              <OrderTable orders={selectedOrders} />
            </div>
            <div className=" bg-white rounded-md  h-min">
              <BeanTable beans={beans} />
            </div>
            <div className=" bg-white rounded-md h-min">
              <ProductTable products={products} />
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default RoastingList;
