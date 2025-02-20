const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const Author = require('./models/Author')
const Book = require('./models/Book')


const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    dummy: () => 0,
    allGenres: async () => {
      const books = await Book.find({})
      const genres = books.map(book => book.genres).flat()
      return [...new Set(genres)]
    },
    bookCount: async () => {
      const books = await Book.find({})
      return books.length
    },
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
    },
    allAuthors: async () => {
      const authors = await Author.find({}).populate('books')
      console.log('authors', authors)
      return authors.map(author => ({
        ...author,
        bookCount: author.books.length
      }))
    },

    allBooks: async (root, args) => {
      console.log('args', args)
      console.log('Person.find')
      if (args.author && args.genre) {
        const books = await Book.find({ author: args.author, genres: args.genre }).populate('author')
        return books
      }

      if (args.author) {
        const books = await Book.find({ author: args.author }).populate('author')
        return books
      }

      if (args.genre) {
        // find all books with the genre
        const books = await Book.find({ genres: args.genre }).populate('author')
        return books
      }

      const books = await Book.find({}).populate('author')
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
  },
  Book: {
    author: async (root) => {
      console.log('Book.author')
      return await Author.findById(root.author)
    },
  },
  Author: {
    bookCount: async (root) => {
      console.log('Author.bookCount', root.books.length)
      return root.books.length
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        console.log('not authenticated')
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        console.log('author not found, creating new author')
        author = await new Author({ name: args.author }).save();
      }

      console.log('creating book')
      const book = await new Book({
            title: args.title,
            author: author._id,
            published: args.published,
            genres: args.genres,
        }).save();
      console.log('book created', book)
      context.pubsub.publish("BOOK_ADDED", { bookAdded: book })

        return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      const updatedAuthor = await author.save()
      return updatedAuthor
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      const savedUser = await user.save()
      return savedUser
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterableIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers