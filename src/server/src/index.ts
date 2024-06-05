// src/index.ts
import { ApolloServer } from "apollo-server";
import { resolvers, typeDefs } from "./graphql/graphqlExports";
import { AppDataSource } from "./entity/initOrm";

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Initialize typeOrm
AppDataSource.initialize().then(() => {
  // Start the server
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
