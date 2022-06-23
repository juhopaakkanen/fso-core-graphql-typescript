const { v1: uuid } = require('uuid')
let { authors, books } = require('./data')
const { UserInputError } = require('apollo-server')

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
      const { author, genre } = args
      if (!author && !genre) {
        return books
      } else if (author && genre) {
        return books
          .filter((b) => b.author === author)
          .filter((b) => b.genres.includes(genre))
      } else if (author) {
        return books.filter((b) => b.author === author)
      } else {
        return books.filter((b) => b.genres.includes(genre))
      }
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => books.filter((b) => b.author === root.name).length
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      if (books.find((b) => b.title === args.title)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.title
        })
      }
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
