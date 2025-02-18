import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Author from "./components/Author";
import { Routes, Route, Link } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('library-user-token');
    if (token) {
      setToken(token);
    }
  }, []);

  const client = useApolloClient();
  const logout = () => {
    setToken(null);
    client.resetStore();
    localStorage.removeItem('library-user-token');
  }

  if (!token) {
    return (
      <div>
        <LoginForm setToken={setToken} />
      </div>
    )
  }


  return (
    <div>
      <div>
        <Link to="/authors" style={{ padding: 5, textDecoration: "none"}}>authors</Link>
        <Link to="/authors/edit" style={{ padding: 5, textDecoration: "none"}}>edit authors</Link>
        <Link to="/books" style={{ padding: 5, textDecoration: "none"}}>books</Link>
        <Link to="/books/add" style={{ padding: 5, textDecoration: "none"}}>add book</Link>
        <Link to="/recommendations" style={{ padding: 5, textDecoration: "none"}}>recommendations</Link>
        <button onClick={logout}>logout</button>
      </div>

      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/edit" element={<Author />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/add" element={<NewBook />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </div>
  );
};

export default App;
