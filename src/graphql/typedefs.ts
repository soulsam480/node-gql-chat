import { gql } from "apollo-server"

const typeDefs = gql`
  type User {
    username: String!
    email: String!
    createdAt: String
    token: String
  }
  type Message{ 
    uuid: String
    content: String!
    to: String!
    from: String!
    createdAt: String
  }
  type Query {
    getUsers: [User]!
    login(username: String! password: String!): User!
  }
  type Mutation {
    register(username: String! email:String! password: String! confirmPassword: String!):User!
    sendMessage(to: String! content: String!): Message!
  }
`;

export default typeDefs