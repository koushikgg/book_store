import axios from "axios";
const config = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  }

export const getAllBooksApi = async () => {
    return await axios.get('https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book', { headers: config })
}

export const getallCartDetailsApi = async () =>{
    const res = await axios .get("https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items", { headers: config })
    console.log(res);
}

export const addToCartListApi = async (id) => {
    return await axios.post(`https://bookstore.incubation.bridgelabz.com/bookstore_user/add_cart_item/${id}`, "", { headers: config });
}

export const updateCartListApi = async (id, quantity) => {
    return await axios.put(`https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${id}`,{ quantityToBuy: quantity},  { headers: config });
}
export const removeCartListApi = async (id) => {
    return await axios.post(`https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_cart_item/${id}`, "", { headers: config });
}

