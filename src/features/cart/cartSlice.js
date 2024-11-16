import { createSlice } from "@reduxjs/toolkit";
import { calculate_total_price } from "../../utils/functions";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value:{
            cartItems: [],
            user: 'demo',
            total: null,
            updateAt: Date.now().toLocaleString()
        }
    },
    reducers:{
        addItem: (state, action) => {
            const productInCart = state.value.cartItems.find(item=> item.id === action.payload.id)

            if(!productInCart) {
                state.value.cartItems.push(action.payload)
            } else {
                state.value.cartItems.map(item => {
                    if (item.id === action.payload.id ) {
                        item.quantity += 1
                        return item
                    }
                    return item
                })
            }

            const total = calculate_total_price(state.value.cartItems)

            state.value = {
                ...state.value,
                total,
                updatedAt: new Date().toLocaleString()
            }
        },
        removeItem: (state, action) => {
            return null // remover un producto del carrito y que se reste del total
        },
        clearCart: (state) => {
            return null  // al confirmar la orden, que se borre todo lo que hay en carrito
        }
    }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions

export default cartSlice.reducer