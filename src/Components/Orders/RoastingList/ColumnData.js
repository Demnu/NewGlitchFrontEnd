const getBeansColumns = () => {
  const columns = [
    { Header: "Bean", accessor: "id" },
    { Header: "Amount", accessor: "amount" },
  ];
  return columns;
};

export { getBeansColumns };
