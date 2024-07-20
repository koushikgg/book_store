import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import DashBoard from "./Components/Dashboard/Dashboard";
import AllBooks from "./Components/AllBooks/AllBooks";
import BookView from "./Components/BookView/BookView";
import { Provider } from "react-redux";
import bookStore from "./store/bookStore";
import Cart from "./Components/Cart/Cart";
import Wishlist from "./Components/WishList/WishList";


function RoutingModule() {
    const appRoutes = createBrowserRouter([
        {
            path: "/dashboard",
            element: <DashBoard />,
            children: [
                {
                    path: "",
                    element: <AllBooks />,
                },
                {
                    path: "bookview/:bookid",
                    element: <BookView />,
                },
                {
                    path: "cart",
                    element: <Cart />,
                },{
                    path: "wishlist",
                    element: <Wishlist />,
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