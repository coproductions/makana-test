import gql from 'graphql-tag';
import { AUTH_TOKEN } from './constants';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    logout: (_, variables, { cache, client }) => {
      localStorage.removeItem(AUTH_TOKEN);
      client.resetStore();
      cache.writeData({ data: { isLoggedIn: false } });
      return null;
    },
  },
};
