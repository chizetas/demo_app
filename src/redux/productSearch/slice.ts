import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface OrderSearchState {
  loading: boolean;
  error: string | null;
  data: any;
  pagination: any
}

const initialState: OrderSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null

};

export const searchOrder = createAsyncThunk(
  "orderSearch/searchOrder",
  async (parameters: {
    nextPage: number | string,
    pageSize: number | string,
  }, thunkAPI) => {
    let url = `http://localhost:9003/api/orderhistory/v1/page_header?page=${parameters.nextPage}&size=${parameters.pageSize}`;

    const respose = await axios.get(url);
    return {
      data: respose.data.current_data,
      pagination: respose.data.pagination
    };
  }
);

export const orderSearchSlice = createSlice({
  name: "orderSearch",
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [searchOrder.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [searchOrder.fulfilled.type]: (state, action) => {
      state.data = action.payload.data;
      state.pagination = action.payload.paginaiton;
      state.loading = false;
      state.error = null;
    },
    [searchOrder.rejected.type]: (state, action: PayloadAction<string | null>) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  }
});
