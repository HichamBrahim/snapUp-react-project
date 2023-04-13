import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
};
const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    showSideBar: (state) => {
      state.isShow = true;
    },
    hideSideBar: (state) => {
      state.isShow = false;
    },
  },
});
export const { showSideBar, hideSideBar } = menuSlice.actions;
export default menuSlice.reducer;
