import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "title", headerName: "Calculation", width: 300 },
  { field: "date", headerName: "Date Added", width: 300 },
  {
    field: "calculatedRoastingList",
    headerName: "Roasting List Calculated",
    width: 300,
  },
];

const CalculationsTable = ({ loading, calcs }) => {
  const navigate = useNavigate();
  const calculationClickHander = (e) => {
    console.log(e);
    navigate("/calculations/" + String(e.id), {
      state: {
        _id: e.id,
        title: e.row.title,
        date: e.row.date,
        orderIDs: e.row.orderIDs,
        products: e.row.products,
        beans: e.row.beans,
        roastingCalculation: e.row.roastingCalculation,
      },
    });
  };
  return (
    <>
      <DataGrid
        onRowClick={(e) => {
          calculationClickHander(e);
        }}
        loading={loading}
        rows={calcs || []}
        columns={columns}
      />
    </>
  );
};
export default CalculationsTable;
