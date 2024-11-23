import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value:{
            email: null,
            token: null,
            localId: "",
            profilePicture: "",
            firstName: "",
            lastName: "",
            address: ""
        }
    },
    reducers:{ 
        setUser: (state, action) => {
            
            state.value.email = action.payload.email,
            state.value.token = action.payload.idToken,
            state.value.localId = action.payload.localId
            state.value.firstName = action.payload.firstName
            state.value.lastName = action.payload.lastName
            state.value.address = action.payload.address

        },
        clearUser: (state, action) => { 
            state.value.email = null,
            state.value.token = null,
            state.value.localId = "",
            state.value.profilePicture = "",
            state.value.firstName = "",
            state.value.lastName = "",
            state.value.address = ""

        },
        setProfilePicture: (state, action) => {
            state.value.profilePicture = action.payload
        }
    }
})

export const { setUser, clearUser, setProfilePicture } = authSlice.actions

export default authSlice.reducer