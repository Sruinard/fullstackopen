import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Author from "./components/Author";
import { Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <div>
        <Link to="/authors" style={{ padding: 5, textDecoration: "none"}}>authors</Link>
        <Link to="/authors/edit" style={{ padding: 5, textDecoration: "none"}}>edit authors</Link>
        <Link to="/books" style={{ padding: 5, textDecoration: "none"}}>books</Link>
        <Link to="/books/add" style={{ padding: 5, textDecoration: "none"}}>add book</Link>
      </div>

      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/edit" element={<Author />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/add" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
