import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  profile: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const userSlice = createSlice({
  name: "userinfo",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.profile = action.payload;
    },
    setUser: (state, action) => {
      state.profile = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export default userSlice.reducer;
export const { getUser, setUser } = userSlice.actions;
