import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    blogs: [],
}

const blogReducer = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs(state, action) {
            state.blogs = action.payload
        },
        appendBlog(state, action) {
            state.blogs = state.blogs.concat(action.payload)
        },
        removeBlog(state, action) {
            state.blogs = state.blogs.filter((blog) => blog.id !== action.payload)
        },
        updateBlog(state, action) {
            state.blogs = state.blogs.map((blog) => blog.id === action.payload.id ? action.payload : blog)
        },
        likeBlog(state, action) {
            state.blogs = state.blogs.map((blog) => blog.id === action.payload.id ? action.payload : blog)
        },
        sortBlogs(state, action) {
            state.blogs = state.blogs.sort((a, b) => b.likes - a.likes)
        },
    },
})

export const { setBlogs, appendBlog, removeBlog, updateBlog, likeBlog, sortBlogs } = blogReducer.actions
export default blogReducer.reducer