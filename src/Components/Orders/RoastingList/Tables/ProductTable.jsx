import React, { useMemo, forwardRef } from "react";
import Table from "../../../UI/Table";
import { getBeansColumns } from "./ColumnData";

const ProductTable = ({ products }) => {
  const columns = useMemo(() => getBeansColumns(), []);
  return (
    <>
      <Table title={"Products"} columns={columns} data={products} />
    </>
  );
};
export default ProductTable;
