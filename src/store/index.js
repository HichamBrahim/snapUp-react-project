import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/productSlice";
import categoryReducer from "./products/categorySlice";
import menuReducer from "./home/menuSlice";
import cartBarReducer from "./home/cartBarSlice";
import cartReducer from "./cart/cartSlice";
import searchReducer from "./products/searchSlice";
const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    menu: menuReducer,
    cartBar: cartBarReducer,
    cart: cartReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});
export default store;
