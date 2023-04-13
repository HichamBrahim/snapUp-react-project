import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { STATUS } from "../../utils/status";

export const fetchAllProducts = createAsyncThunk(
  "product/fetchProductsByCategory",
  async (limit, thunkAPI) => {
    try {
      const resp = await api.get(`/products?limit=${limit}`);
      return resp.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (id, thunkAPI) => {
    try {
      const resp = await api.get(`/products/${id}`);
      return resp.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  singleProduct: {},
  productStatus: STATUS.IDLE,
  singleProductStatus: STATUS.IDLE,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.productStatus = STATUS.LOADING;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.productStatus = STATUS.SUCCEEDED;
      state.products = action.payload.products;
    });
    builder.addCase(fetchAllProducts.rejected, (state) => {
      state.productStatus = STATUS.FAILED;
    });
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.singleProductStatus = STATUS.LOADING;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.singleProductStatus = STATUS.SUCCEEDED;
      state.singleProduct = action.payload;
    });
    builder.addCase(fetchSingleProduct.rejected, (state) => {
      state.singleProductStatus = STATUS.FAILED;
    });
  },
});

export default productSlice.reducer;
