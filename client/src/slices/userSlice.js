import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  profile: JSON.parse(localStorage.getItem("userInfo")) || null,
};

const userSlice = createSlice({
  name: "userinfo",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.profile = action.payload;
      localStorage.setItem("userInfo", action.payload);
    },
    setUser: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { getUser, setUser } = userSlice.actions;
