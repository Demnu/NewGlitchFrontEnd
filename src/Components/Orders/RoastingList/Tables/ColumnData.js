const getBeansColumns = () => {
  const columns = [
    { header: "Bean", accessor: "id" },
    { header: "Amount (kg)", accessor: "amount" },
  ];
  return columns;
};
const getOrdersColumns = () => {
  const columns = [{ header: "Order ID", accessor: "id" }];
  return columns;
};
const getProductsColumns = () => {
  const columns = [
    { header: "Product", accessor: "name" },
    { header: "Amount", accessor: "amount" },
  ];
  return columns;
};

export { getBeansColumns, getOrdersColumns, getProductsColumns };
