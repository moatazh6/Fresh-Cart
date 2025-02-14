import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import CounterProvider from "./Components/Context/Counter";
import UserProvider from "./Components/Context/userContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Components/Context/CartContext";
import { Toaster } from "./../node_modules/react-hot-toast/src/components/toaster";
import Checkout from "./Components/Checkout/Checkout";
import Allorders from "./Components/Allorders/Allorders";
import Wishlist from "./Components/Wishlist/WishList";
import ForgotPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import AuthContextProvider from "./Components/Context/AuthoContext";
import ResetPassVerify from "./Components/ResetPassVerify/ResetPassVerify";

let query = new QueryClient();
// Create a BrowserRouter and pass routes as children
let BrowserRouter = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "forgetPassword", element: <ForgotPassword /> },
      { path: "resetPassVerify", element: <ResetPassVerify /> },
      { path: "home", element: <Navigate to="/" replace /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserProvider>
        <CounterProvider>
          <QueryClientProvider client={query}>
            <CartContextProvider>
              <AuthContextProvider>
                <RouterProvider router={BrowserRouter} />
              </AuthContextProvider>

              <Toaster />
            </CartContextProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </CounterProvider>
      </UserProvider>
    </>
  );
}

export default App;
