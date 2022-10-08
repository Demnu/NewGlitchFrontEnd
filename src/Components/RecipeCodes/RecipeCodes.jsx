import React, { useState } from "react";
import { getRecipeCodes } from "../../myApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import CodesTable from "./CodesTable";
const RecipeCodes = () => {
  const navigate = useNavigate();

  const { isLoading, data } = useQuery(["codes"], getRecipeCodes);
  return (
    <div className="restOfScreenHeight flex flex-col p-2 ">
      <button
        className=" mb-2 w-52 rounded-sm bg-blue-700 p-2 text-white hover:bg-blue-500"
        onClick={() => {
          navigate("/codes/newCode");
        }}
      >
        New Code
      </button>
      <div className=" flex-grow cursor-pointer bg-white">
        <CodesTable recipes={data?.data || []} loading={isLoading} />
      </div>
    </div>
  );
};
export default RecipeCodes;
