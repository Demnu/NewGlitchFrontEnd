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
    navigate("/recipes/" + String(e.row._id), {
      state: {
        _id: e.row._id,
        id: e.row.id,
        bean1Name: e.row.bean1Name,
        bean1Amount: e.row.bean1Amount,
        bean2Name: e.row.bean2Name,
        bean2Amount: e.row.bean2Amount,
        bean3Name: e.row.bean3Name,
        bean3Amount: e.row.bean3Amount,
        bean4Name: e.row.bean4Name,
        bean4Amount: e.row.bean4Amount,
        bean5Name: e.row.bean5Name,
        bean5Amount: e.row.bean5Amount,
        bean6Name: e.row.bean6Name,
        bean6Amount: e.row.bean6Amount,
        bean7Name: e.row.bean7Name,
        bean7Amount: e.row.bean7Amount,
        bean8Name: e.row.bean8Name,
        bean8Amount: e.row.bean8Amount,
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
