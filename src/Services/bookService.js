import axios from "axios";
const headerConfig = {
    headers: {
        'x-access-token': localStorage.getItem('accessToken')
    }
};


export const getAllBooksApi = async () => {
    return await axios.get('https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book', headerConfig)
}

export const getallCartDetailsApi = async () => {
    const res = await axios.get("https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items", {
        headers: {
            'x-access-token': localStorage.getItem('accessToken')
        }
    })
    return res?.data?.result
}

export const addToCartListApi = async (id) => {
    return await axios.post(`https://bookstore.incubation.bridgelabz.com/bookstore_user/add_cart_item/${id}`, {}, headerConfig);
}

export const updateCartListApi = async (id, quantity) => {
    const res = await axios.put(`https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${id}`, { quantityToBuy  : quantity }, headerConfig);
    return res
}
export const removeCartListApi = async (id) => {
    return await axios.delete(`https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_cart_item/${id}`, headerConfig);
}

export const getWishlistItemsApi = async () => {
    const res = await axios.get("https://bookstore.incubation.bridgelabz.com/bookstore_user/get_wishlist_items", {
        headers: {
            'x-access-token': localStorage.getItem('accessToken')
        }
    })
    return res?.data?.result
}

export const addToWishListApi = async (id) => {
    return await axios.post(`https://bookstore.incubation.bridgelabz.com/bookstore_user/add_wish_list/${id}`, '', headerConfig);
}

export const removeWishListApi = async (id) => {
    return await axios.delete(`https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_wishlist_item/${id}`, headerConfig);
}

export const placeOrderApi = async (data) => {
    return await axios.post(`https://bookstore.incubation.bridgelabz.com/bookstore_user/add/order`,data, {
        headers: {
            'x-access-token': localStorage.getItem('accessToken')
        }
    })
}
