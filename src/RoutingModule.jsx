import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import DashBoard from "./Components/Dashboard/Dashboard";
import AllBooks from "./Components/AllBooks/AllBooks";



function RoutingModule() {
    const appRoutes = createBrowserRouter([
        {
            path: "/dashboard",
            element: <DashBoard />,
            children: [
                {
                    path: "allbooks",
                    element: <AllBooks />,
                }
            ]
        }
    ])
    return (
        <RouterProvider router={appRoutes} />
    )
}
export default RoutingModule;