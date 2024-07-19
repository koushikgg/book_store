import axios from "axios";

export const getAllBooksApi = async () =>{
    return await axios.get('https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book')
}