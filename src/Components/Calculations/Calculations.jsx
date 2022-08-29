import React, { useEffect, useState } from "react";
import { getCalculations } from "../../myApi";
import CalculationsTable from "./CalculationsTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const Calculations = ({}) => {
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery(["calculations"], getCalculations, {});
  return (
    <div className=" restOfScreenHeight flex flex-col px-2 py-2">
      <div className=" flex-grow cursor-pointer rounded-sm bg-white">
        <CalculationsTable loading={isLoading} calcs={data?.data || []} />
      </div>
    </div>
  );
};
export default Calculations;
