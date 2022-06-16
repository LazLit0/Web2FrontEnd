import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "/login",
  async ({ userId, password }) => {
    const apiResponse = await fetch("https://localhost/authenticate", {
      method: "GET",
      headers: {
        Authorization: "Basic " + window.btoa(userId + ":" + password),
      },
    });

    const { headers } = apiResponse;
    const token = headers.get("Authorization").split(" ")[1];
    const result = await apiResponse.json();

    return {
        ...result,
        token
    };
  }
);

const initialState = {
  id: undefined,
  userId: undefined,
  userName: undefined,
  loading: false,
  isLoggedIn: false,
  token: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = undefined;
      state.userName = undefined;
      state.id = undefined;
      state.loading = false;
      state.token = undefined;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },

    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.id = action.payload.id;
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },

    [login.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
