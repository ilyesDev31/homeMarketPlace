import { apiSlice } from "./apiSlice";
const BASE_URL = "api/v1/auth";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login to an exesting profile
    login: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `${BASE_URL}/login`,
        body: data,
      }),
    }),
    // register create a profile
    register: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `${BASE_URL}/register`,
        body: data,
      }),
    }),
    // check if user is auth / get profile
    getUser: builder.query({
      query: () => `${BASE_URL}/me`,
    }),
    // logout
    logout: builder.mutation({
      query: () => ({
        method: "POST",
        url: `${BASE_URL}/logout`,
      }),
    }),
    // update user profile
    updateMe: builder.mutation({
      query: (data) => ({
        method: "PUT",
        url: "api/v1/users/update",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `${BASE_URL}/forgotPassword`,
        body: data,
      }),
    }),
    checkPasswordToken: builder.query({
      query: (data) => `${BASE_URL}/checkPasswordToken/${data}`,
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `${BASE_URL}/resetPassword/${data.url}`,
        body: {
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useLogoutMutation,
  useUpdateMeMutation,
  useForgotPasswordMutation,
  useCheckPasswordTokenQuery,
  useResetPasswordMutation,
} = userApiSlice;
