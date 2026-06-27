import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const ApiSlice = createApi({
    reducerPath: "callApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER }),
    endpoints: ((builder) => ({
        getAllLists: builder.query({
            query: () => ({
                url: "/list/getAllLists",
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
        }),
        addNewList: builder.mutation({
            query: (data) => ({
                url: "/list/createNewList",
                method: "POST",
                credentials: "include",
                body: { newList: data }
            })
        }),
        deleteList: builder.mutation({
            query: (data) => ({
                url: "/list/deleteList",
                method: "POST",
                credentials: "include",
                body: data
            })
        }),
        addNewListItem: builder.mutation({
            query: (data) => ({
                url: "/list/addNewListItem",
                method: "POST",
                credentials: "include",
                body: data
            })
        }),
        removeListItem: builder.mutation({
            query: (data) => ({
                url: "/list/removeListItem",
                method: "POST",
                credentials: "include",
                body: data
            })
        }),
        toggleIsBought: builder.mutation({
            query: (data) => ({
                url: "/list/setListItemBoughtStatus",
                method: "PUT",
                credentials: "include",
                body: data
            })
        })
    }))
})

export const { useGetAllListsQuery, useLoginMutation, useSingupMutation, useAddNewListMutation, useDeleteListMutation, useAddNewListItemMutation, useRemoveListItemMutation, useToggleIsBoughtMutation } = ApiSlice