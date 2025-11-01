import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import AllProducts from "../pages/allProducts/AllProducts";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Loading from "../components/Loading";
import ProductDetails from "../pages/productDetails/ProductDetails";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/register/Register";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "all-products",
                Component: AllProducts,
                loader: () => fetch("http://localhost:3000/products"),
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: "all-products/:id",
                Component: ProductDetails,
                loader: ({params}) => fetch(`http://localhost:3000/products/${params.id}`),
                hydrateFallbackElement: <Loading></Loading>
            },
        ]
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            },
        ]
    }
])

export default router;