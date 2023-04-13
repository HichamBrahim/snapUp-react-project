import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/status";
import api from "../../utils/api";
const initialState = {
  searchProduct: [],
  searchStatus: STATUS.IDLE,
};
export const fetchSearchProduct = createAsyncThunk(
  "search/fetchSearchProduct",
  async (search, thunkAPI) => {
    try {
      const resp = await api.get(`/products/search?q=${search}`);
      return resp.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const searchSlice = createSlice({
  name: "search",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSearchProduct.pending, (state) => {
      state.searchStatus = STATUS.LOADING;
    });
    builder.addCase(fetchSearchProduct.fulfilled, (state, action) => {
      state.searchStatus = STATUS.SUCCEEDED;
      state.searchProduct = action.payload.products;
    });
  },
});
export default searchSlice.reducer;
