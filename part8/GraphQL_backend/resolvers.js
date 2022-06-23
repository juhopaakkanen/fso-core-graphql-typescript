const { UserInputError } = require('apollo-server')
const Book = require('./models/Book')
const Author = require('./models/Author')

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    allBooks: async (root, args) => {
      const { author, genre } = args
      if (!author && !genre) {
        return Book.find({}).populate('author')
      } else if (author && genre) {
        const a = await Author.findOne({ name: author })
        return Book.find({ author: a._id })
          .find({ genres: { $in: genre } })
          .populate('author')
      } else if (author) {
        const a = await Author.findOne({ name: author })
        return Book.find({ author: a._id }).populate('author')
      } else {
        return Book.find({ genres: { $in: genre } }).populate('author')
      }
    }
  },
  Author: {
    bookCount: async (root) => {
      const authorBooks = await Book.find({ author: root.id })
      return authorBooks.length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      let book
      try {
        if (!author) {
          author = new Author({
            name: args.author,
            born: null
          })
          await author.save()
        }
        book = new Book({ ...args, author: author })
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      const editedAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { $set: { born: args.setBornTo } },
        { new: true }
      )
      return editedAuthor
    }
  }
}

module.exports = resolvers
