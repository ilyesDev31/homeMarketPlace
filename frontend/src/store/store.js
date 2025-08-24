import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice";
import userSlice from "../slices/userSlice";
import listingSlice from "../slices/listingSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    listing: listingSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
