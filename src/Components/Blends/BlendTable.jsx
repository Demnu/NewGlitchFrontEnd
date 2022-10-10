import React from "react";
import { useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "name", headerName: "Blend", width: 300 },
  {
    field: "recipes",
    headerName: "Recipes",
    width: 3000,
    renderCell: (params) => {
      return (
        <div className="">
          {params.row.recipes.map((recipe) => (
            <span key={recipe._id} className="m-1">
              <b>{recipe.id}</b>
            </span>
          ))}
        </div>
      );
    },
  },
];

const BlendTable = ({ blends, loading }) => {
  const navigate = useNavigate();
  const recipeClickHander = (e) => {
    navigate("/blends/" + String(e.row.id), {
      state: {
        id: e.row.id,
        name: e.row.name,
        recipes: e.row.recipes,
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
        rows={blends}
        columns={columns}
        disableSelectionOnClick={true}
        density={"compact"}
      />
    </>
  );
};
export default BlendTable;
