import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {}
    },
    reducers: {
        getUser: (state) => {
            const user = localStorage.getItem('user')
            state.data = JSON.parse(user)
        },
        setUser: (state, action) => {
            state.data = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        }
    },
})

// Action creators are generated for each case reducer function
export const { getUser, setUser } = userSlice.actions

export default userSlice.reducer