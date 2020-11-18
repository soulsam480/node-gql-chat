import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typedefs";
import "reflect-metadata";


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ctx => ctx
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