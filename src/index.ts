import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typedefs";
import "reflect-metadata";
import ContextMiddleWare from "./util/ContextMiddleWare"

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ContextMiddleWare
});


createConnection().then(() => {
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  }).catch(err => {
    console.log(err);
  })
}).catch(err => {
  console.log(err);
})