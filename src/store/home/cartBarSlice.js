import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
};
const cartBarSlice = createSlice({
  name: "cartBar",
  initialState,
  reducers: {
    toggleCartBar: (state) => {
      state.isShow = !state.isShow;
    },
    hideCartBar: (state) => {
      state.isShow = false;
    },
    openCartBar: (state) => {
      state.isShow = true;
    },
  },
});
export const { toggleCartBar, hideCartBar, openCartBar } = cartBarSlice.actions;
export default cartBarSlice.reducer;
