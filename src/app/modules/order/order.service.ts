
const createOrder = async (token:string, payload) => {
    // ...
    console.log("From service ",token);
    return true;
    
};

export const OrderService = {
    createOrder,
};
