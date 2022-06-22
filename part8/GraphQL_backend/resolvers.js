const { v1: uuid } = require('uuid')
let { authors, books } = require('./data')

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return books
      } else if (args.author && args.genre) {
        return books
          .filter((book) => book.author === args.author)
          .filter((book) => book.genres.includes(args.genre))
      } else if (args.author) {
        return books.filter((book) => book.author === args.author)
      } else {
        return books.filter((book) => book.genres.includes(args.genre))
      }
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) =>
      books.filter((book) => book.author === root.name).length
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      if (!authors.find((a) => a.name === args.author)) {
        const author = { name: args.author, id: uuid() }
        authors = authors.concat(author)
      }
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((a) => (a.name !== args.name ? a : updatedAuthor))
      return updatedAuthor
    }
  }
}

module.exports = resolvers
