import { gql } from "apollo-server"

const typeDefs = gql`
  type User {
    username: String!
    email: String!
  }
  type Query {
    getUsers: [User]!
  }
`;

export default typeDefs