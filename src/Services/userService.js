import axios from "axios";


export async function userSignUp(data){
    return await axios.post('https://bookstore.incubation.bridgelabz.com/bookstore_user/registration',data) 
}
