import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  numberProductInCart: JSON.parse(localStorage.getItem("numberProduct")) || 0,
  total: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload.product;
      const existItem = state.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      let count = action.payload.productCount;
      if (existItem) {
        if (existItem.amount + count <= existItem.stock) {
          existItem.amount += count;
          toast.success("The item has been successfully added to your cart.");
        } else {
          toast("Out of stock");
        }
      } else {
        state.cartItems.push(product);
        state.numberProductInCart += 1;
        toast.success("The item has been successfully added to your cart.");
      }
    },
    increaseItemCart: (state, action) => {
      const id = action.payload;
      const searchItem = state.cartItems.find((item) => item.id === id);
      if (searchItem.amount < searchItem.stock) {
        searchItem.amount++;
        toast.success("The item has been successfully added to your cart.");
      } else {
        toast("Out of stock");
      }
    },
    decreaseItemCart: (state, action) => {
      const id = action.payload;
      const searchItem = state.cartItems.find((item) => item.id === id);
      if (searchItem.amount > 1) {
        searchItem.amount--;
        toast("Number of products has been decreased!");
      }
    },
    calcTotal: (state) => {
      state.total = state.cartItems.reduce((prevItem, currItem) => {
        return prevItem + currItem.amount * currItem.finalPrice;
      }, 0);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.numberProductInCart = 0;
      toast.dark(
        "Your cart has been successfully cleared. You can now start adding new items."
      );
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
      state.numberProductInCart -= 1;
      toast.dark("The item has been successfully removed from your cart!");
    },
  },
});
export const {
  addToCart,
  increaseItemCart,
  decreaseItemCart,
  calcTotal,
  clearCart,
  removeItem,
} = cartSlice.actions;
export default cartSlice.reducer;
