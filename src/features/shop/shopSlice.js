import { createSlice } from "@reduxjs/toolkit";


export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value:{
            categorySelected: "",
            productIdSelected: null
        }
    },
    reducers:{ 
        setCategory: (state, action) => {
            state.value.categorySelected = action.payload
        },
        setProductId: (state, action) => {
            state.value.productIdSelected = action.payload
        }
    }
})

export const { setCategory, setProductId } = shopSlice.actions

export default shopSlice.reducer