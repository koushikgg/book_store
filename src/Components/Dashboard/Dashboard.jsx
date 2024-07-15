import { Outlet } from "react-router-dom";
import Header from "../Header/Header";


function DashBoard (){
    return (
        <>
        <Header/>
        <Outlet />
        </>
    )
}

export default DashBoard;