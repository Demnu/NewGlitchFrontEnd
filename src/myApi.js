import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const getOrders = async (params) => {
  const response = await instance.get("/orders");
  return response;
};

const makeCalculation = async (params) => {
  const response = await instance.post("/roasting/makeCalculation", {
    orderIDs: params,
  });
  return response;
};

const saveCalculation = async ({ title, orderIDs, products, beans }) => {
  let newOrderIDs = [];
  let newBeans = [];
  for (let order of orderIDs) {
    newOrderIDs.push({ id: order });
  }
  for (let bean of beans) {
    newBeans.push({ id: bean.name, amount: bean.amount });
  }
  if (title.trim().length > 0) {
    const response = await instance.post("/roasting", {
      title: title,
      orderIDs: newOrderIDs,
      date: new Date(),
      products: products,
      beans: newBeans,
    });
    return response;
  }
};

const getCalculations = async (params) => {

  const response = await instance.get("/roasting");
  return response;
};

const deleteCalculation = async (params) => {

  const response = await instance.delete(
    "/roasting/" + params.calculationID
  );
  return response;
};

const getRecipes = async (params) => {
  const response = await instance.get("/recipes");
  return response;
};

export {
  getOrders,
  makeCalculation,
  saveCalculation,
  getCalculations,
  deleteCalculation,
  getRecipes
};
