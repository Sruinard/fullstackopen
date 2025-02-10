import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { setBlogs, appendBlog, removeBlog, updateBlog as updateBlogAction, sortBlogs } from "../features/blogs/BlogSlice"
import blogService from "../services/blogs"

const useBlogs = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs.blogs)

    const addBlog = async (blog) => {
        const newBlog = await blogService.create(blog)
        dispatch(appendBlog(newBlog))
        return newBlog
    }

    const deleteBlog = async (blogId) => {
        await blogService.deleteBlog(blogId)
        dispatch(removeBlog(blogId))
        return blogId
    }

    const updateBlog = async (blogId, blog) => {
        console.log("blogId:", blogId)
        console.log("blog:", blog)
        const updatedBlogObject = { 
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes,
            user: blog.user.id,
        }   
        console.log("updatedBlogObject:", updatedBlogObject)
        const updatedBlog = await blogService.update(blogId, updatedBlogObject)
        dispatch(updateBlogAction(updatedBlog))
        dispatch(sortBlogs())
        return updatedBlog
    }

    const likeBlog = async (blogId) => {
        const blog = blogs.find((blog) => blog.id === blogId)
        const updatedBlogObject = { 
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id,
            id: blog.id
         }
        console.log("updatedBlogObject:", updatedBlogObject)
        const updatedBlog = await blogService.update(blogId, updatedBlogObject)
        console.log("updatedBlog:", updatedBlog)
        dispatch(updateBlogAction(updatedBlog))
        return updatedBlog
    }

    const initialBlogs = async () => {
        const blogs = await blogService.getAll()
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
        console.log(sortedBlogs)
        dispatch(setBlogs(sortedBlogs))
    }

    useEffect(() => {initialBlogs() }, [dispatch])

    return {
        blogs,
        addBlog,
        deleteBlog,
        updateBlog,
        likeBlog
    }
}

export default useBlogs