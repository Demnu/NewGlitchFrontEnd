import React from "react";
import { useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "code", headerName: "Recipe Code", width: 300 },
  { field: "blendName", headerName: "Blend Name", width: 200 },
];

const CodesTable = ({ recipes, loading }) => {
  const navigate = useNavigate();
  const recipeClickHander = (e) => {
    navigate("/codes/" + String(e.row.id), {
      state: {
        id: e.row.id,
        code: e.row.code,
        blendName: e.row.blendName,
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
export default CodesTable;
