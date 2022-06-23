const { ApolloServer } = require('apollo-server')
const config = require('./utils/config')
const mongoose = require('mongoose')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

console.log('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
