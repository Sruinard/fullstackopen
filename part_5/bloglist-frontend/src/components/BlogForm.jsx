import { useState } from 'react'

const BlogForm = ({ addBlogFromBlogObject, user }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitNewBlog = (event) => {
    event.preventDefault()
    addBlogFromBlogObject({
      title: title,
      author: author,
      url: url,
      likes: 0,
      user: user.id
    })
  }
  return (
    <form onSubmit={submitNewBlog}>
      <div>
        title:
        <input
          type='text'
          value={title}
          name='Title'
          id='blog-title-input'
          onChange={({ target }) => setTitle(target.value)}
        ></input>
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          name='Author'
          id='blog-author-input'
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          name='Url'
          id='blog-url-input'
          onChange={({ target }) => setUrl(target.value)}
        ></input>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm