import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { getAllBooksApi } from "../../Services/bookService";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllBooks } from "../../store/bookListSlice";


function DashBoard (){
    const dispatch = useDispatch();
    useEffect(()=>{
        fectchBooks()
    },[])

    async function fectchBooks(){
        const res= await getAllBooksApi();
        const list = res?.data?.result
        dispatch(getAllBooks(list))
    }
    return (
        <>
        <Header/>
        <Outlet />
        </>
    )
}

export default DashBoard;



