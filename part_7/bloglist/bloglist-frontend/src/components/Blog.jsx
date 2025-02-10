import { useState } from "react";

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [showDetails, setShowDetails] = useState(false);

  const isSameUser = blog.user.id === user.id;


  const handleDeleteBlog = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(blog.id);
      return blog;
    }
  };

  const update = async () => {
    const blogObject = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlog(blogObject);
    
  };
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button
        onClick={() => {
          setShowDetails(!showDetails);
        }}
      >
        {showDetails ? "hide" : "view"}
      </button>
      {showDetails && (
        <div>
          {blog.url} <br />
          likes: {blog.likes}
          <button onClick={update}>like</button>
          <div>
            {blog.user.id === user.id ? "same user" : "different user"}
          </div>
          {isSameUser && <button onClick={handleDeleteBlog}>remove</button>}
        </div>
      )}
    </div>
  );
};

export default Blog;
