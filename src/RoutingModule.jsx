import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import DashBoard from "./Components/Dashboard/Dashboard";
import AllBooks from "./Components/AllBooks/AllBooks";
import BookView from "./Components/BookView/BookView";
import { Provider } from "react-redux";
import bookStore from "./store/bookStore";



function RoutingModule() {
    const appRoutes = createBrowserRouter([
        {
            path: "/dashboard",
            element: <DashBoard />,
            children: [
                {
                    path: "allbooks",
                    element: <AllBooks />,
                },
                {
                    path: "bookview",
                    element: <BookView />,
                }
            ]
        }
    ])
    return (
        <Provider store={bookStore}>
            <RouterProvider router={appRoutes} />
        </Provider>
    )
}
export default RoutingModule;