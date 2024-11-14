import { createSlice } from "@reduxjs/toolkit";
import categories from '../../data/categories.json';
import products from '../../data/products.json';


export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value:{
            categories: categories,
            products: products,
            categorySelected: "",
            productsFilteredByCategory: [],
            productIdSelected: null
        }
    },
    reducers:{ // reducer son funciones que modifican el estado
        setCategory: (state, action) => {
            state.value.categorySelected = action.payload
            state.value.productsFilteredByCategory = products.filter(product => 
                product.category.toLowerCase() === action.payload.toLowerCase())
        },
        setProductId: (state, action) => {
            state.value.productIdSelected = action.payload
        }
    }
})

export const { setCategory, setProductId } = shopSlice.actions

export default shopSlice.reducer