import { apiSlice } from "./apiSlice";
const BASE_URL = `api/v1/listings`;

export const listingApiSLice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllListings: builder.query({
      query: () => `${BASE_URL}?offer=true`,
    }),
    getListingByCategory: builder.query({
      query: (data) => ({
        url: `${BASE_URL}/category/${data.category}?page=${data.page}&limit=${data.limit}`,
      }),
    }),
    createListing: builder.mutation({
      query: (data) => ({
        method: "POST",

        url: `${BASE_URL}/add`,
        body: data,
      }),
    }),
    fetchSingleListing: builder.query({
      query: (data) => ({
        url: `${BASE_URL}/${data}`,
      }),
    }),
    deleteListing: builder.mutation({
      query: (data) => ({
        method: "DELETE",
        url: `${BASE_URL}/${data}`,
      }),
    }),
  }),
});

export const {
  useGetAllListingsQuery,
  useGetListingByCategoryQuery,
  useCreateListingMutation,
  useFetchSingleListingQuery,
  useDeleteListingMutation,
} = listingApiSLice;
