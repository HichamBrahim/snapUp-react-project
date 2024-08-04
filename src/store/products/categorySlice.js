import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { STATUS } from "../../utils/status";

export const fetchAllCategories = createAsyncThunk(
  "category/fetchAllCategories",
  async (_, thunkAPI) => {
    try {
      const resp = await api.get("/products/categories");
      console.log(resp.data,"resp.data");
      return resp.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchProductsByCategory = createAsyncThunk(
  "category/fetchProductsByCategory",
  async (category, thunkAPI) => {
    try {
      const resp = await api.get(`/products/category/${category}`);
      return resp.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  categories: [],
  poductsByCategory: [],
  categoryStatus: STATUS.IDLE,
  cateProductsStatus: STATUS.IDLE,
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.categoryStatus = STATUS.LOADING;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.categoryStatus = STATUS.SUCCEEDED;
      state.categories = action.payload;
    });
    builder.addCase(fetchAllCategories.rejected, (state) => {
      state.categoryStatus = STATUS.FAILED;
    });
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.cateProductsStatus = STATUS.LOADING;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.cateProductsStatus = STATUS.SUCCEEDED;
      state.poductsByCategory = action.payload.products;
    });
    builder.addCase(fetchProductsByCategory.rejected, (state) => {
      state.cateProductsStatus = STATUS.FAILED;
    });
  },
});

export default categorySlice.reducer;
