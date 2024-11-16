import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../firebase/database";

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({baseUrl: base_url}),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: ()=>'categories.json'
        }),
        getProducts: builder.query({
            query: ()=>'products.json'
        }),
        getProductsByCategory: builder.query({
            query: (category) =>`products.json?orderBy=%22category%22&equalTo=%22${category}%22`,
            transformResponse: (response) => (
                response ? Object.values(response): []
            )
        }),
        getProduct: builder.query({
            query: (productId)=> `products.json/?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => (
                response ? Object.values(response)[0]: []
            )
        }),
        getPromos: builder.query({
            query: () => 'promos.json',
            transformResponse: (response) => (
                response ? Object.values(response) : null
            )
        })
    })

})

export const { useGetCategoriesQuery, useGetProductsQuery, useGetProductsByCategoryQuery, useGetProductQuery, useGetPromosQuery } = shopApi