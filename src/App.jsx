import React, { useEffect } from "react";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";
import Routers from "./routes/Routers";
import { HelmetProvider } from "react-helmet-async";
import { hideCartBar } from "./store/home/cartBarSlice";
function App() {
  const { cartItems, numberProductInCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClick = () => {
      dispatch(hideCartBar())
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("numberProduct", numberProductInCart);
  }, [cartItems]);
  const helmetContext = {};
  
  return (
    <HelmetProvider context={helmetContext}>
      <div className="relative min-h-screen overflow-hidden">
        <Header />
        <Routers />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          transition={Bounce}
        />
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
