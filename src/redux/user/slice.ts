import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (
    parameters: {
      mail: number | string;
      pwd: number | string;
    },
    thunkAPI
  ) => {
    let url = `http://localhost:9001/api/user/v1/login`;

    const { data } = await axios.post(url, {
      mail: parameters.mail,
      pwd: parameters.pwd,
    });
    return data.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: {
    [login.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [login.fulfilled.type]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.error = null;
    },
    [login.rejected.type]: (state, action: PayloadAction<string | null>) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  },
});
