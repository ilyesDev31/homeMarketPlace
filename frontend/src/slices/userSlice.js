import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  profile: null,
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
    },
  },
});

export default userSlice.reducer;
export const { getUser, setUser } = userSlice.actions;
