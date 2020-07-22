/**
 * Global Constant
 */
require("dotenv").config()

/**
 * Boiler Plate
 */
import { ApolloServer, gql } from "apollo-server"

require("./mongo/connect").connect()

/**
 * Create Instance
 */

const server = new ApolloServer({
  typeDefs: gql`
    type Todo {
      _id
      content
      createdAt
    }

    type Query {
      todos: [Todo]
    }

    type Mutation {
      addTodo(
        content: String!
      ): Todo!
    }
  `,
  resolvers: {
    Query: {
      todos(_, params, ctx) {

      }
    },
    Mutation: {

    }
  },
  context: (req, res) => {
    return {
      req
    }
  },
})


server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})