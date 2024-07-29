import axios from "axios";


export async function userSignUpApi(data){
    return await axios.post('https://bookstore.incubation.bridgelabz.com/bookstore_user/registration',data) 
}
