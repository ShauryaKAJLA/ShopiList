import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const ApiSlice = createApi({
    reducerPath: "callApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER }),
    tagTypes: ["Lists"],
    endpoints: ((builder) => ({
        getAllLists: builder.query({
            query: () => {
                const accessToken = localStorage.getItem('accessToken');
                return {
                    url: "/list/getAllLists",
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Authorization": accessToken ? `Bearer ${accessToken}` : ""
                    }
                };
            },
            providesTags: ["Lists"]
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/user/login",
                method: "POST",
                credentials: "include",
                body: data
            }),
            invalidatesTags: ["Lists"]
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
            query: (data) => {
                const accessToken = localStorage.getItem('accessToken');
                return {
                    url: "/list/createNewList",
                    method: "POST",
                    credentials: "include",
                    body: { newList: data },
                    headers: {
                        "Authorization": accessToken ? `Bearer ${accessToken}` : ""
                    }
                }

            }
        }),
        deleteList: builder.mutation({
            query: (data) => {
                const accessToken = localStorage.getItem('accessToken');
                return {
                    url: "/list/deleteList",
                    method: "POST",
                    credentials: "include",
                    body: data,
                    headers: {
                        "Authorization": accessToken ? `Bearer ${accessToken}` : ""
                    }
                }
            }
        }),
        addNewListItem: builder.mutation({
            query: (data) => {
                const accessToken = localStorage.getItem('accessToken');
                return {
                    url: "/list/addNewListItem",
                    method: "POST",
                    credentials: "include",
                    body: data,
                    headers: {
                        "Authorization": accessToken ? `Bearer ${accessToken}` : ""
                    }
                }
            }
        }),
        removeListItem: builder.mutation({
            query: (data) => {
                const accessToken = localStorage.getItem('accessToken');
                return {
                    url: "/list/removeListItem",
                    method: "POST",
                    credentials: "include",
                    body: data,
                    headers: {
                        "Authorization": accessToken ? `Bearer ${accessToken}` : ""
                    }
                }
            }
        }),
        toggleIsBought: builder.mutation({
            query: (data) => {
                const accessToken = localStorage.getItem('accessToken');
                return {
                    url: "/list/setListItemBoughtStatus",
                    method: "PUT",
                    credentials: "include",
                    body: data,
                    headers: {
                        "Authorization": accessToken ? `Bearer ${accessToken}` : ""
                    }
                }
            }
        }),
        logout: builder.mutation({
            query: (data) => {
                const accessToken = localStorage.getItem('accessToken');
                return {
                    url: "/user/logout",
                    method: "POST",
                    credentials: "include",
                    body: data,
                    headers: {
                        "Authorization": accessToken ? `Bearer ${accessToken}` : ""
                    }
                }
            }
        })
    }))
})

export const { useGetAllListsQuery, useLoginMutation, useSingupMutation, useAddNewListMutation, useDeleteListMutation, useAddNewListItemMutation, useRemoveListItemMutation, useToggleIsBoughtMutation, useLogoutMutation } = ApiSlice