import axios from "axios";

const headerConfig = {
    headers: {
        'x-access-token': localStorage.getItem('token')
    }
};


export const getAllBooksApi = async () => {
    return await axios.get('https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book', headerConfig)
}

export const getallCartDetailsApi = async () => {
    const res = await axios.get("https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items", headerConfig)
    return res?.data?.result
}

export const addToCartListApi = async (id) => {
    return await axios.post(`https://bookstore.incubation.bridgelabz.com/bookstore_user/add_cart_item/${id}`, "", headerConfig);
}

export const updateCartListApi = async (id, quantity) => {
    return await axios.put(`https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${id}`, { quantityToBuy: quantity }, headerConfig);
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


