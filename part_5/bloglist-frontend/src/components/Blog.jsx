import { useState } from 'react'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showDetails, setShowDetails] = useState(false)


  const isSameUser = (blog.user === user.id)

  const handleDeleteBlog = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlog(blog.id)
      return blog
    }
  }

  const handleUpdateBlog = () => {

    console.log(`old number of likes ${blog.likes}`)
    blog.likes = blog.likes + 1
    console.log(`new number of likes ${blog.likes}`)
    updateBlog( {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user.id
    })
  }
  return <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={() => {setShowDetails(!showDetails)}}>{showDetails ? 'hide' : 'view'}</button>
    {showDetails && <div>
      {blog.url} <br/>
      likes: {blog.likes} 
      <button onClick={handleUpdateBlog}>like</button>
      {isSameUser && <button onClick={handleDeleteBlog}>remove</button>}
    </div>
    }
  </div>
}

export default Blog