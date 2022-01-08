import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        data: [],
        liked: []
    },
    reducers: {
        setData: (state, action) => {
            state.data = [...state.data, ...action.payload]
        },
        insertData: (state, action) => {
            state.data = [[action.payload], ...state.data]
        },
        setLiked: (state, action) => {
            state.liked = [action.payload, ...state.liked]
        },
        setUnliked: (state, action) => {
            const index = state.liked.findIndex(item => item.id === action)
            state.liked.splice(index, 1)
        },
    },
})

// Action creators are generated for each case reducer function
export const { setData, insertData, setLiked, setUnliked } = postSlice.actions

export default postSlice.reducer