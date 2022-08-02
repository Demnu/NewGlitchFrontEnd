import React, { useMemo, forwardRef } from "react";
import Table from "../../../UI/Table";
import { getBeansColumns } from "./ColumnData";

const BeanTable = ({ beans }) => {
  const columns = useMemo(() => getBeansColumns(), []);
  return (
    <>
      <Table title={"Roasting List"} columns={columns} data={beans} />
    </>
  );
};
export default BeanTable;
