import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//import { base_url } from "../firebase/database";

export const receiptApi = createApi({
    reducerPath: "receiptApi",
    baseQuery: fetchBaseQuery({baseUrl: process.env.EXPO_PUBLIC_BASE_URL}),
    endpoints: (builder) => ({
        postReceipt: builder.mutation({
            query: ({...receipt}) => ({
                url: 'receipts.json',
                method: 'POST',
                body: receipt
            }),
        }),
        getReceipts: builder.query({
            query: () => 'receipts.json',
            transformResponse: (response) => {
                return response? Object.values(response): [] 
            }
        })
        }),
})

export const { usePostReceiptMutation, useGetReceiptsQuery } = receiptApi