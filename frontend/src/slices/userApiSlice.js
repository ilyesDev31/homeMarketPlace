import { apiSlice } from "./apiSlice";
const BASE_URL = "api/v1/users";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (data) => `${BASE_URL}/${data}`,
    }),
  }),
});

export const { useGetUserByIdQuery } = userApiSlice;
