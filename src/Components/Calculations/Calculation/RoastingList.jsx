import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { calculateRoastingList } from "../../../myApi";
import { useState } from "react";

const columns = [
  { field: "blendName", headerName: "Blend", width: 300 },
  {
    field: "overflow",
    headerName: "Overflow (kg)",
    width: 300,
    editable: true,
  },
  { field: "coffeeOrdered", headerName: "Coffee Ordered (kg)", width: 300 },
  { field: "production", headerName: "Production (kg)", width: 300 },
  { field: "green", headerName: "Green (kg)", width: 300 },
];
const RoastingList = ({
  products,
  setChangesMade,
  blends,
  loading,
  setLoading,
  setBlends,
}) => {
  let firstLoad = true;

  const processRowUpdate = (newRow, oldRow) => {
    setLoading(true);
    if (newRow.overflow < 0 || isNaN(newRow.overflow)) {
      setLoading(false);
      return oldRow;
    }
    setBlends((prevBlends) => {
      let updatedBlends = [...prevBlends];
      for (let blend of updatedBlends) {
        if (blend.blendName === newRow.blendName) {
          blend.overflow = newRow.overflow;
          blend.production = blend.coffeeOrdered - blend.overflow;
          let tempGreen = blend.production * 1.18 * 1.2;
          blend.green = tempGreen.toFixed(2);
          return updatedBlends;
        }
      }
      return updatedBlends;
    });
    setChangesMade(true);
    setLoading(false);
    return newRow;
  };
  return (
    <DataGrid
      experimentalFeatures={{ newEditingApi: true }}
      processRowUpdate={processRowUpdate}
      onRowClick={(e) => {}}
      loading={loading}
      rows={blends || []}
      columns={columns}
      onProcessRowUpdateError={(error) => console.log(error)}
      density={"compact"}
    />
  );
};
export default RoastingList;
