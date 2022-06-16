import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//taken from https://stackoverflow.com/questions/50284841/how-to-extract-token-string-from-bearer-token
function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

const fetcher = async ({ userId, password }) => {
  return async () => {
    const apiResponse = await fetch("https://localhost/authenticate", {
      method: "GET",
      headers: {
        Authorization: "Basic " + window.btoa(userId + ":" + password),
      },
    });
    // const token = extractToken(apiResponse);

    // console.log("TOKEN :", token);
    const user = await apiResponse.json();
    console.log(user);
    return user;
  };
};
export const login = createAsyncThunk(
  "/login",
  async ({ userId, password }) => {
    const apiResponse = await fetch("https://localhost/authenticate", {
      method: "GET",
      headers: {
        Authorization: "Basic " + window.btoa(userId + ":" + password),
      },
    }).then((data) => data.json());
    return apiResponse;
  }
);

const initialState = {
  id: undefined,
  userId: undefined,
  userName: undefined,
  loading: false,
  isLoggedIn: false,
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
    },

    [login.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
