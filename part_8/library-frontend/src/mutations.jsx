import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
    title
    published
    author {
      name
      born
      bookCount
      id
    }
    genres
    id
  }
    }
`;

export const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            name, born
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`