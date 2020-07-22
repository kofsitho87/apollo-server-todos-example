/**
 * Global Constant
 */
require("dotenv").config()

/**
 * Boiler Plate
 */
import { GraphQLScalarType } from "graphql"
import { ApolloServer, gql } from "apollo-server"
require("./mongo/connect").connect()

import Todo from "./mongo/todo"
/**
 * Create Instance
 */


const myDateTime = new GraphQLScalarType({
  name: "datetime",
  description: "Description of my custom scalar type",
  serialize(value) {
    return value.getTime()
  },
  parseValue(value) {
    return new Date(value)
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }
    return null
  },
})
const server = new ApolloServer({
  typeDefs: gql`
    scalar myDateTime

    # type User {
    #   _id: ID!
    #   userName: String!
    # }

    type Todo {
      _id: ID!
      writer: String!
      content: String!
      createdAt: myDateTime!
    }

    type Query {
      todos(
        writer: String
      ): [Todo]
    }

    type Mutation {
      addTodo(
        writer: String!
        content: String!
      ): Todo!
    }
  `,
  resolvers: {
    Query: {
      async todos(_, { writer }) {
        const payload = {}
        if (writer) {
          payload["writer"] = writer
        }
        return Todo.find(payload)
      }
    },
    Mutation: {
      async addTodo(_, { writer, content }) {
        let todo = await new Todo({
          writer,
          content
        })
          .save()

        return todo
      }
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