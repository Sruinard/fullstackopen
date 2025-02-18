import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name, born, bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      title
      published
      author {
        name
        born
        bookCount
      }
      genres
    }
  }
`;

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`;

export const ALL_BOOKS_BY_GENRE = gql`
  query AllBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`;



export const ME = gql`
  query {
    me {
      username, favoriteGenre
    }
  }
`;