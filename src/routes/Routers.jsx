import React from "react";
import Login from "../pages/Login";
import RecoverPassword from "../pages/RecoverPassword";
import Register from "../pages/Register";
import SearchPage from "../pages/SearchPage";
import NotFound from "../pages/NotFound";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import CategoryPage from "../pages/CategoryPage";
import SingleProduct from "../pages/SingleProduct";
import Profile from "../pages/Profile";
import Checkout from "../pages/Checkout";
import ProtectedRoute from "./ProtectedRoute";
function Routers() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"cart"} element={<Cart />} />
        <Route path={"account/register"} element={<Register />} />
        <Route path={"account/login"} element={<Login />} />
        <Route
          path={"account/profile"}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={"checkout"}
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path={"account/login/recover"} element={<RecoverPassword />} />
        <Route path={"category/:category"} element={<CategoryPage />} />
        <Route path={"product/:productId"} element={<SingleProduct />} />
        <Route path={"search/:searchId"} element={<SearchPage />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Routers;
