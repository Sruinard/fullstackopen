import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME, ALL_GENRES, ALL_BOOKS_BY_GENRE } from "../queries";

const Recommendations = () => {
  const { data: userData, loading: userLoading } = useQuery(ME);
  const { data: booksByGenre, loading: booksByGenreLoading } = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: userData?.me?.favoriteGenre || 'all' }
  });
  const [genre, setGenre] = useState(userData?.me?.favoriteGenre || 'all');

  useEffect(() => {
    setGenre(userData?.me?.favoriteGenre || 'all');
  }, [userData]);

  const books = booksByGenre?.allBooks || [];

  if (userLoading  || booksByGenreLoading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{genre}</strong></p>
      {genre === 'all' ? (
        <p>No favorite genre selected</p>
      ) : (
        <table>
          <tbody>
            <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Recommendations;
