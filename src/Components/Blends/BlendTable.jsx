import React from "react";
import { useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "name", headerName: "Blend", width: 300 },
  { field: "recipes", headerName: "Recipes", width: 200 },
];

const BlendTable = ({ recipes, loading }) => {
  const navigate = useNavigate();
  const recipeClickHander = (e) => {
    navigate("/blends/" + String(e.row.id), {
      state: {
        id: e.row.id,
        name: e.row.blendName,
        recipes: e.row.blendName,
      },
    });
  };
  return (
    <>
      <DataGrid
        onRowClick={(e) => {
          recipeClickHander(e);
        }}
        loading={loading}
        rows={recipes}
        columns={columns}
        disableSelectionOnClick={true}
        density={"compact"}
      />
    </>
  );
};
export default BlendTable;
