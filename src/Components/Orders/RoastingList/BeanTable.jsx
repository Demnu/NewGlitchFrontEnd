import React, { useMemo, forwardRef } from "react";

import { getBeansColumns } from "./ColumnData";

const BeanTable = ({ beans }) => {
  const columns = useMemo(() => getBeansColumns(), []);

  return <></>;
};
export default BeanTable;
