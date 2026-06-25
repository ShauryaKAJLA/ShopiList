import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const ApiSlice = createApi({
    reducerPath: "callApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER }),
    endpoints: ((builder) => ({
        getAllLists: builder.query({
            query: () => ({
                url: "/tasks",
                method: "GET",
                credentials: "include",

            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/user/login",
                method: "POST",
                credentials: "include",
                body: data
            })
        }),
        singup: builder.mutation({
            query: (data) => ({
                url: "/user/signup",
                method: "POST",
                credentials: "include",
                body: data
            })
        })
    }))
})

export const { useGetAllListsQuery, useLoginMutation, useSingupMutation } = ApiSlice