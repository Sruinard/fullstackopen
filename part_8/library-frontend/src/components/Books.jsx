import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES, ALL_BOOKS_BY_GENRE } from "../queries";

const Books = () => {
  const [genre, setGenre] = useState(null);
  const { data: genresData, loading: genresLoading } = useQuery(ALL_GENRES);
  const { data: booksByGenre, loading: booksByGenreLoading } = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: genre }
  });

  if (genresLoading || booksByGenreLoading) {
    return <div>loading...</div>;
  }
  const books = booksByGenre?.allBooks || [];

  // add 'all genres' to the list of genres
  const allGenres = genresData?.allGenres || [];
  const genres = [...allGenres, 'all genres'];

  const handleGenreClick = (genre) => {
    setGenre(genre === 'all genres' ? null : genre);
  }


  return (
    <div>
      <h2>books</h2>

      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreClick(genre)}>{genre}</button>
        ))}
      </div>

      

      {books.length === 0 ? (
        <p>No books found</p>
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
  )
}

export default Books
