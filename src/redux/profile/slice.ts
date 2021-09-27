import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {useSelector} from '../hooks';;

interface ProfileGetState{
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ProfileGetState = {
  loading: true,
  error: null,
  data: null,
};


export const getProfile = createAsyncThunk(
  "profile/profile",
  async (jwt : string, thunkAPI
  ) => {
    let url = `http://localhost:9001/api/address/v1/list?token=${jwt}`;
    const response = await axios.get(url);
    return {
      data: response.data,
    };
  }
);

export const removeAddress = createAsyncThunk(
  "profile/add",
  async (parameters: {jwt: string, addressId: string | number}, thunkAPI) => {
    let url = `http://localhost:9001/api/address/v1/del/${parameters.addressId}?token=${parameters.jwt}`;

    const {data} = await axios.delete(url);
    return data;
  }
)

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: {
    [getProfile.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [getProfile.fulfilled.type]: (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
      state.error = null;
    },
    [getProfile.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
    [removeAddress .pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [removeAddress .fulfilled.type]: (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
      state.error = null;
    },
    [removeAddress .rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  },
});
