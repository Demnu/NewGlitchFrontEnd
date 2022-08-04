import React from "react";
import { useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "title", headerName: "Calculation", width: 300 },
  { field: "date", headerName: "Date Added", width: 300 },
];

const CalculationsTable = ({ calculations, loading }) => {
  const navigate = useNavigate();
  const calculationClickHander = (e) => {
    navigate("/calculations/" + String(e.id), {
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
        rows={calculations}
        columns={columns}
        disableSelectionOnClick={true}
      />
    </>
  );
};
export default CalculationsTable;
