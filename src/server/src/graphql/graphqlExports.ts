import { readFileSync } from 'fs';
import { resolve } from 'path';
import { gql } from 'apollo-server';
import { storiesResolver } from './resolvers';
import { addCommentMutation, addStoryMutation } from './mutations';

// Load the schema from the schema.graphql file
export const typeDefs = gql(readFileSync(resolve(__dirname, 'schema.graphql'), { encoding: 'utf8' }));

// Define resolvers
export const resolvers = {
  Query: {
    stories: storiesResolver,
  },
  Mutation: {
    addStory: addStoryMutation,
    addComment: addCommentMutation
  }
};
