import React, { useState } from "react";
import { getBlends } from "../../myApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import BlendTable from "./BlendTable";
const Blends = () => {
  const navigate = useNavigate();

  const { isLoading, data } = useQuery(["codes"], getBlends);
  return (
    <div className="restOfScreenHeight flex flex-col p-2 ">
      <button
        className=" mb-2 w-52 rounded-sm bg-blue-700 p-2 text-white hover:bg-blue-500"
        onClick={() => {
          navigate("/blends/newBlend");
        }}
      >
        New Blend
      </button>
      <div className=" flex-grow cursor-pointer bg-white">
        <BlendTable recipes={data?.data || []} loading={isLoading} />
      </div>
    </div>
  );
};
export default Blends;
