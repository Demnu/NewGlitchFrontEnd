import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
  });



const  getOrders = async (params) =>{
    const response = await instance.get('/orders');
    return response

}

const makeCalculation = async(params)=>{
    const response = await instance.post('/roasting/makeCalculation',{orderIDs:params})
    return response;
}
export{
    getOrders,
    makeCalculation
}