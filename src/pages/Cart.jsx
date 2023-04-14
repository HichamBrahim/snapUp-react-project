import React, { useEffect } from "react";
import ToggleLayout from "../components/Layout/ToggleLayout";
import { useDispatch, useSelector } from "react-redux";
import CartPageItem from "../components/Common/CartPageItem";
import Button from "../components/Common/Button";
import { calcTotal, clearCart } from "../store/cart/cartSlice";
import formatter from "../utils/formatter";
import { Link } from "react-router-dom";
import shopping from "../assets/shopping_cart.png";
import { Helmet } from "react-helmet-async";
function Cart() {
  const { cartItems, numberProductInCart, total } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calcTotal());
  }, [cartItems]);
  return (
    <main className="main">
      <Helmet>
        <title>
          Your SnapUp Shopping Cart - Easy Checkout and Secure Payment
        </title>
        <link rel="icon" type="image/png" href="icon.jpg" sizes="32x32" />
      </Helmet>
      <ToggleLayout />
      <section className="py-8 bg-WhiteSmoke min-h-75">
        <div className="container p-4 mx-auto">
          {cartItems.length > 0 ? (
            <div className="text-16">
              <ul
                className="hidden items-center opacity-90 bg-white
                    px-4 py-2 rounded-sm md:flex"
              >
                <li className="w-24">S.N.</li>
                <li className="w-96">Product</li>
                <li className="w-52">Unit Price</li>
                <li className="w-52">Quantity</li>
                <li className="w-52">Total Price</li>
                <li className="w-52">Actions</li>
              </ul>
              <ul className="mt-6 bg-white">
                {cartItems.map((cartItem, idx) => {
                  return (
                    <CartPageItem key={cartItem.id} {...cartItem} idx={idx} />
                  );
                })}
              </ul>
              <div
                className="flex flex-col space-y-2 justify-between bg-white
                                p-4 mt-6 w-fit mx-auto sm:w-full sm:flex-row"
              >
                <button
                  className="p-2 text-pinkClr border-1 border-pinkClr
                  flex items-center space-x-1 h-fit w-fit mx-auto sm:m-0"
                  onClick={() => dispatch(clearCart())}
                >
                  <i className="fa-solid fa-trash"></i>
                  <span>CLEAR CART</span>
                </button>
                <div className="space-y-2">
                  <p>
                    {`Total (${numberProductInCart}) items:`}{" "}
                    <span className="text-mainOrange">
                      {`$${formatter(total)}`}
                    </span>
                  </p>
                  <Button width={"w-full"}>Check Out</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="w-fit space-y-2">
                <img
                  className="w-28 mx-auto"
                  src={shopping}
                  alt="shpping cart"
                />
                <p className="pb-2">Your shopping cart is empty.</p>
                <Link to="/">
                  <Button width={"w-full"}>Go Shopping Now</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Cart;
