import React, { useEffect, useState } from "react";
import { makeCalculation } from "../../../myApi";
import BeanTable from "./BeanTable";
const RoastingList = ({ selectedOrders }) => {
  const [loading, setLoading] = useState();
  const [order, setOrder] = useState([]);
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
      var ordersArray = data[1];
      ordersArray.sort(compareProducts);
      setOrder(ordersArray);
      var beansData = data[0];
      var beansStr = [];

      for (var i = 0; i < beansData.length; i++) {
        var bean = {
          id: beansData[i].name,
          amount: beansData[i].amount + " kg",
        };
        beansStr.push(bean);
      }
      beansStr.sort(compareBeans);
      setBeans(beansStr);
    });
  }, []);
  // useEffect(() => {
  //     fetch("https://glitchhub.coffee/api/v1/roasting/makeCalculation", {
  //       credentials: "include",
  //       method: "POST",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // 'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: JSON.stringify({ orderIDs: location.state }), // body data type must match "Content-Type" header
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setLoading(false);
  //         var ordersArray = data[1];
  //         ordersArray.sort(compareProducts);
  //         setOrder(ordersArray);
  //         var beansData = data[0];
  //         var beansStr = [];

  //         for (var i = 0; i < beansData.length; i++) {
  //           var bean = {
  //             id: beansData[i].name,
  //             amount: beansData[i].amount + " kg",
  //           };
  //           beansStr.push(bean);
  //         }
  //         beansStr.sort(compareBeans);
  //         setBeans(beansStr);
  //       });
  //     var orderIDS = [];
  //     location.state.forEach((id) => {
  //       orderIDS.push({ id: id });
  //     });
  //     setOrderIDs(orderIDS);
  //   }, []);
  return (
    <div>
      <BeanTable beans={beans} />
    </div>
  );
};
export default RoastingList;
