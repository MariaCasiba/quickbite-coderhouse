import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value:{
            email: null,
            token: null
        }
    },
    reducers:{ // reducer son funciones que modifican el estado
        setUser: (state, action) => {
            state.value.email = action.payload.email,
            state.value.token = action.payload.idToken
        },
        clearUser: (state, action) => { // cuando cierra sesión
            state.value.email = null,
            state.value.token = null
        }
    }
})

export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer