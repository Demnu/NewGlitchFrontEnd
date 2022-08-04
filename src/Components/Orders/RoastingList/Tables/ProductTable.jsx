import React from "react";
import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "id", headerName: "Product", width: 300 },
  { field: "hasRecipe", headerName: "Has Recipe", width: 100 },
  { field: "amount", headerName: "Amount", width: 150 },
];
const ProductTable = ({ products, loading }) => {
  return (
    <>
      <DataGrid
        loading={loading}
        rows={products}
        columns={columns}
        disableSelectionOnClick={true}
        density={"compact"}
      />
    </>
  );
};
export default ProductTable;
