import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        data: [],
        liked: [],
        page: 1
    },
    reducers: {
        setData: (state, action) => {
            state.data = [...state.data, ...action.payload.data]
            state.page = action.payload.page
        },
        insertData: (state, action) => {
            state.data.unshift(action.payload)
        },
        removeData: (state, action) => {
            const indexPost = state.data.findIndex(item => item.id === action.payload)
            const indexLiked = state.liked.findIndex(item => item.id === action.payload)
            state.data.splice(indexPost, 1)
            state.liked.splice(indexLiked, 1)
            const liked = JSON.stringify(state.liked)
            localStorage.setItem('liked', liked)
        },
        updateData: (state, action) => {
            const indexPost = state.data.findIndex(item => item.id === action.payload.id)
            const indexLiked = state.liked.findIndex(item => item.id === action.payload.id)
            state.data.splice(indexPost, 1, action.payload)
            state.liked.splice(indexLiked, 1, action.payload)
            const liked = JSON.stringify(state.liked)
            localStorage.setItem('liked', liked)
        },
        getLiked: (state) => {
            let liked = localStorage.getItem('liked')
            liked = JSON.parse(liked)
            state.liked = liked || []
        },
        setLiked: (state, action) => {
            state.liked.unshift(action.payload)
            const liked = JSON.stringify(state.liked)
            localStorage.setItem('liked', liked)
        },
        setUnliked: (state, action) => {
            const index = state.liked.findIndex(item => item.id === action.payload.id)
            state.liked.splice(index, 1)
            const liked = JSON.stringify(state.liked)
            localStorage.setItem('liked', liked)
        },
    },
})

// Action creators are generated for each case reducer function
export const { setData, insertData, removeData, updateData, getLiked, setLiked, setUnliked } = postSlice.actions

export default postSlice.reducer