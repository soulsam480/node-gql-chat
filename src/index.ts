import { ApolloServer } from 'apollo-server';
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typedefs";
import "reflect-metadata";
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);

});