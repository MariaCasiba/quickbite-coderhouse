import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
            query: (userId) => ({
                url: 'receipts.json',
                params: {
                    userId: userId
                }
            }), 
            transformResponse: (response) => {
                return response
                ? Object.entries(response).map(([key, value]) => ({
                    id: key,
                    ...value,
                }))
                : [] ;
            },
        }),
    }),
});

export const { usePostReceiptMutation, useGetReceiptsQuery } = receiptApi