import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Toggable";
import useBlogs from "./hooks/Blogs";
import useUser from "./hooks/User";
const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [loginVisible, setLoginVisible] = useState(true);
  const { blogs, addBlog, setBlogs, deleteBlog, updateBlog, likeBlog } = useBlogs();
  const { user, login, logout } = useUser();

  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login(
        username,
        password,
      );
      console.log("user logged in:", user);
      blogService.setToken(user.token);
      setNotification("successfully logged in");
      setTimeout(() => {
        setNotification(null);
      }, 2000);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification("Wrong credentials");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const addBlogFromBlogObject = async (blogObject) => {
    try {
      // Check if user is defined before proceeding
      if (!user.exists) {
        throw new Error("User is not defined");
      }
      blogFormRef.current.toggleVisibility();
      console.log(`creating new blog for user with id: ${user.id}`);
      const newBlog = await addBlog(blogObject);
      console.log("new blog:", newBlog);
      setNotification("new blogpost created!");
      setTimeout(() => setNotification(null), 2000);
    } catch (exception) {
      setNotification("failed to create blogpost");
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const updateBlogFromBlogUpdate = async (blogObject) => {
    console.log("updating blog:", blogObject);
    const updatedBlog = await updateBlog(blogObject.id, blogObject);
    
    
    console.log("updated blog:", updatedBlog);
    setNotification("blogpost updated!");
    setTimeout(() => setNotification(null), 2000);
  };
  const handleLogout = () => {
    logout();
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload();
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <h3>login to application</h3>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm addBlogFromBlogObject={addBlogFromBlogObject} user={user} />
    </Togglable>
  );


  console.log("blogs:", blogs);
  console.log("user:", user);
  return (
    <div>
      {notification !== null ? (
        <Notification
          message={notification}
          type={notification.includes("failed") ? "error" : "success"}
        />
      ) : null}
      {!user.exists ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
        </div>
      )}

      <h2>blogs</h2>
      <div data-testid="blogs">
        {user.exists && blogs.length > 0 &&
          blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              updateBlog={updateBlogFromBlogUpdate}
              deleteBlog={deleteBlog}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
