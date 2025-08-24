import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  listings: [],
};

const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListing: (state, action) => {
      state.listings = action.payload;
    },
    deleteListingAct: (state, action) => {
      state.listings = state.listings.filter((a) => a.id !== action.payload);
    },
  },
});
export const { setListing, deleteListingAct } = listingSlice.actions;
export default listingSlice.reducer;
