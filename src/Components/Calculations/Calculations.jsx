import React, { useEffect, useState } from "react";
import { getCalculations } from "../../myApi";
import CalculationsTable from "./CalculationsTable";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
const Calculations = ({}) => {
  const location = useLocation();
  const { isLoading, data } = useQuery(["calculations"], getCalculations);
  let calculationsJS = [];
  if (data?.data) {
    calculationsJS = [...data.data].reverse();
  }

  return (
    <div className=" restOfScreenHeight flex flex-col px-2 py-2">
      <div className=" flex-grow bg-white rounded-sm cursor-pointer">
        <CalculationsTable loading={isLoading} calculations={calculationsJS} />
      </div>
    </div>
  );
};
export default Calculations;
