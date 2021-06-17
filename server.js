const bookTypeDefs = require('./schemas/book/bookSchema')
const userTypeDefs = require('./schemas/user/userSchema')

const { ApolloServer } = require('apollo-server');
const { mergeSchemas } = require('graphql-tools');
const mongoose = require('./config/database');

const schema = mergeSchemas({
    schemas: [userTypeDefs, bookTypeDefs]
  });

const server = new ApolloServer({ cors: true, schema });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
});