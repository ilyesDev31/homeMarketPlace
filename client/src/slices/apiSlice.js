import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
const url = import.meta.env.VITE.BASE_URL;
const baseQuery = fetchBaseQuery({
  baseUrl: url,
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
  tagTypes: ["User", "Listing"],
});
