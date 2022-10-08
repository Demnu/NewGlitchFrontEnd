import axios from "axios";

const instance = axios.create({
  // baseURL: "https://glitchhub.coffee/api/v1",
  baseURL: "http://localhost:3000/api/v1",
});

const getOrders = async (params) => {
  const response = await instance.get("/orders");
  return response;
};
const updateOrder = async (params) =>{
  const response = await instance.post("/orders",params)
  return response;
}

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

const updateRecipe = async (params) => {
  const response = await instance.patch("/recipes/" + params._id, {
    _id: params._id,
    product: params.product,
    bean1Name: params.bean1Name,
    bean1Amount: params.bean1Amount,
    bean2Name: params.bean2Name,
    bean2Amount: params.bean2Amount,
    bean3Name: params.bean3Name,
    bean3Amount: params.bean3Amount,
    bean4Name: params.bean4Name,
    bean4Amount: params.bean4Amount,
    bean5Name: params.bean5Name,
    bean5Amount: params.bean5Amount,
    bean6Name: params.bean6Name,
    bean6Amount: params.bean6Amount,
    bean7Name: params.bean7Name,
    bean7Amount: params.bean7Amount,
    bean8Name: params.bean8Name,
    bean8Amount: params.bean8Amount,
  })
  return response
}
const deleteRecipe = async (params) => {
  const response = await instance.delete("/recipes/" + params);
  return response
}

const getUnusedProducts = async () => {
  const response = await instance.get("/products/unusedProducts");
  return response
}

const saveRecipe = async (params) => {
  const response = await instance.post("/recipes", { params })
  return response
}

const login = async (params) => {
  const response = await instance.post("/user/login", { email: params.email, password: params.password })
  return response
}

const authenticate = async () => {
  const response = await instance.get("/user/authenticate")
  return response
}

const logoutServer = async () => {
  const response = await instance.post("/user/logout")
  return response
}

const getRecipeCodes = async()=>{
  const response = await instance.get("/recipeCodes");
  return response;
}


export {
  getOrders,
  updateOrder,
  makeCalculation,
  saveCalculation,
  getCalculations,
  deleteCalculation,
  getRecipes,
  updateRecipe,
  deleteRecipe,
  getUnusedProducts,
  saveRecipe,
  login,
  authenticate,
  logoutServer,
  getRecipeCodes
};
