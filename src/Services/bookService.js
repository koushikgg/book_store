import axios from "axios";
const headerConfig = {
    headers: {
        'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4NjlkMDQ0MGNlYTAwMGU3NmQ1MzgiLCJpYXQiOjE3MjI2NjUxNTIsImV4cCI6MTcyMjc1MTU1Mn0._YoIneDW8l9RckLaBvgLw5mf6gLJYDAQ1WcZ-vci32k"
    }
};


export const getAllBooksApi = async () => {
    return await axios.get('https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book', headerConfig)
}

export const getallCartDetailsApi = async () => {
    console.log( localStorage.getItem('accessToken'));
    console.log(headerConfig);
    const res = await axios.get("https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items", headerConfig)
    return res?.data?.result
}

export const addToCartListApi = async (id) => {
    console.log(id,headerConfig);
    return await axios.post(`https://bookstore.incubation.bridgelabz.com/bookstore_user/add_cart_item/${id}`, {}, headerConfig);
}

export const updateCartListApi = async (id, quantity) => {
    console.log(id, quantity);
    const res = await axios.put(`https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${id}`, { quantityToBuy  : quantity }, headerConfig);
    console.log(res);
    return res
}
export const removeCartListApi = async (id) => {
    return await axios.delete(`https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_cart_item/${id}`, headerConfig);
}

export const getWishlistItemsApi = async () => {
    const res = await axios.get("https://bookstore.incubation.bridgelabz.com/bookstore_user/get_wishlist_items", headerConfig)
    return res?.data?.result
}

export const addToWishListApi = async (id) => {
    return await axios.post(`https://bookstore.incubation.bridgelabz.com/bookstore_user/add_wish_list/${id}`, '', headerConfig);
}

export const removeWishListApi = async (id) => {
    return await axios.delete(`https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_wishlist_item/${id}`, headerConfig);
}
