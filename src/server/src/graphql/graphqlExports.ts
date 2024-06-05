import { readFileSync } from 'fs';
import { resolve } from 'path';
import { gql } from 'apollo-server';
import { userResolver } from './resolvers';
import { addUserMutation } from './mutations';

// Load the schema from the schema.graphql file
export const typeDefs = gql(readFileSync(resolve(__dirname, 'schema.graphql'), { encoding: 'utf8' }));

// Define resolvers
export const resolvers = {
  Query: {
    users: userResolver,
  },
  Mutation: {
    addUser: addUserMutation
  }
};
