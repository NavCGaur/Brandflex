import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    
  }),
  reducerPath: "authApi",
  tagTypes: ["auth"],
  endpoints: (build) => ({

    verifyToken: build.mutation({
      query: ({ token }) => ({
        url: "/auth/verify-token",
        method: "POST",
        body: { token }
      }),
    }),
    
    registerUser: build.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData
      }),
    }),

    getAllUsers: build.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    
    
    getUser: build.query({
      query: ({ userId, page, pageSize, sort, search }) => ({
        url: "users",
        method: "GET",
        params: { userId, page, pageSize, sort, search },

      }),
      providesTags: ["User"],
    }),

    getUserById: build.query({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: "GET",
      }),
      providesTags: ["UserById"],
    }),

    createUser: build.mutation({
      query: (userData) => ({
        url: "users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    editUser: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    
    

  }),
});

export const {
  useVerifyTokenMutation,
  useRegisterUserMutation,
  useGetUserQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  

} = authApi;
