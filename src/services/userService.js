

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

    export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
    endpoints: (builder) => ({
        
        putUserProfile: builder.mutation({
        query: ({ localId, firstName, lastName, address }) => ({
            url: `users/${localId}.json`, 
            method: "PUT",
            body: { firstName, lastName, address }, 
        }),
        }),
        
        getUserProfile: builder.query({
        query: (localId) => `users/${localId}.json`, 
        }),
        
        putProfilePicture: builder.mutation({
        query: ({ image, localId }) => ({
            url: `profilePictures/${localId}.json`,
            method: "PUT",
            body: { image },
        }),
        }),
        
        getProfilePicture: builder.query({
        query: (localId) => `profilePictures/${localId}.json`,
        }),
    }),
    });

    export const {
    usePutUserProfileMutation, useGetUserProfileQuery, usePutProfilePictureMutation, useGetProfilePictureQuery,} = userApi;
