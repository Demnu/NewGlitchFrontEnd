import React from "react";
import { useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "id", headerName: "Recipe", width: 300 },
  { field: "bean1Name", headerName: "Bean", width: 200 },
  { field: "bean2Name", headerName: "Bean", width: 200 },
  { field: "bean3Name", headerName: "Bean", width: 200 },
  { field: "bean4Name", headerName: "Bean", width: 200 },
];

const RecipesTable = ({ recipes, loading }) => {
  const navigate = useNavigate();
  const calculationClickHander = (e) => {
    navigate("/recipes/" + String(e.id), {
      state: {
        _id: e.id,
        title: e.row.title,
        date: e.row.date,
        orderIDs: e.row.orderIDs,
        products: e.row.products,
        beans: e.row.beans,
      },
    });
  };
  return (
    <>
      <DataGrid
        onRowClick={(e) => {
          calculationClickHander(e);
        }}
        isRowSelectable={true}
        loading={loading}
        rows={recipes}
        columns={columns}
        disableSelectionOnClick={true}
        density={"compact"}
      />
    </>
  );
};
export default RecipesTable;
