import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import AllProducts from "../pages/allProducts/AllProducts";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Loading from "../components/Loading";
import ProductDetails from "../pages/productDetails/ProductDetails";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/register/Register";
import MyBids from "../pages/myBids/MyBids";
import MyProducts from "../pages/my-products/MyProducts";
import CreateProduct from "../pages/create-product/CreateProduct";
import PrivateRoute from "./PrivateRoute";
import UpdateProduct from "../pages/create-product/UpdateProduct";

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
                loader: () => fetch("https://smart-deals-api-server-gamma.vercel.app/products"),
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: "product-details/:id",
                Component: ProductDetails,
                loader: ({params}) => fetch(`https://smart-deals-api-server-gamma.vercel.app/products/${params.id}`),
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: "my-bids",
                element: <PrivateRoute><MyBids></MyBids></PrivateRoute>,
            },
            {
                path: "my-products",
                element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
            },
            {
                path: "create-product",
                Component: CreateProduct,
            },
            {
                path: "update-product/:id",
                Component: UpdateProduct,
                loader: ({params}) => fetch(`https://smart-deals-api-server-gamma.vercel.app/products/${params.id}`),
                hydrateFallbackElement: <Loading></Loading>
            }
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