import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { calculateRoastingList } from "../../../myApi";
import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
const columns = [
  { field: "blendName", headerName: "Blend", width: 300 },
  {
    field: "overflow",
    headerName: ``,
    width: 150,
    editable: true,
    renderHeader: () => (
      <div className="flex items-center gap-2 align-middle">
        {"Overflow (kg)"}
        <EditOutlinedIcon />
      </div>
    ),
  },
  {
    field: "coffeeOrdered",
    headerName: "Coffee Ordered (kg)",
    width: 150,
  },
  { field: "production", headerName: "Production (kg)", width: 150 },
  { field: "green", headerName: "Green (kg)", width: 150 },
  {
    field: "batchSize",
    headerName: "Batch Size",
    width: 150,
    editable: true,
    renderHeader: () => (
      <div className="flex items-center gap-2 align-middle">
        {"Batch Size"}
        <EditOutlinedIcon />
      </div>
    ),
  },
  {
    field: "numberOfRoasts",
    headerName: "Number of Roasts",
    width: 150,
  },
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
    if (
      newRow.overflow == oldRow.overflow &&
      newRow.batchSize == oldRow.batchSize
    ) {
      return oldRow;
    }

    setLoading(true);
    if (newRow.overflow < 0 || isNaN(newRow.overflow)) {
      setLoading(false);
      return oldRow;
    }

    if (newRow.overflow != oldRow.overflow) {
      setBlends((prevBlends) => {
        let updatedBlends = [...prevBlends];
        for (let blend of updatedBlends) {
          if (blend.blendName === newRow.blendName) {
            blend.overflow = newRow.overflow;

            blend.production = blend.coffeeOrdered - blend.overflow;
            let tempGreen = blend.production * 1.18 * 1.2;
            blend.green = tempGreen.toFixed(2);
            blend.numberOfRoasts = blend.green / blend.batchSize;
            blend.numberOfRoasts = blend.numberOfRoasts.toFixed(0);
            blend.production = blend.coffeeOrdered - blend.overflow;
            return updatedBlends;
          }
        }
        return updatedBlends;
      });
    } else if (
      newRow.batchSize != oldRow.batchSize &&
      newRow.batchSize >= 0 &&
      !isNaN(newRow.overflow)
    ) {
      setBlends((prevBlends) => {
        let updatedBlends = [...prevBlends];
        for (let blend of updatedBlends) {
          if (blend.blendName === newRow.blendName) {
            blend.batchSize = newRow.batchSize;
            blend.numberOfRoasts = blend.green / blend.batchSize;
            blend.numberOfRoasts = blend.numberOfRoasts.toFixed(0);
            blend.production = blend.coffeeOrdered - blend.overflow;
            let tempGreen = blend.production * 1.18 * 1.2;
            blend.green = tempGreen.toFixed(2);
            return updatedBlends;
          }
        }
        return updatedBlends;
      });
    }

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
