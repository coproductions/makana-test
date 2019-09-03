import gql from 'graphql-tag';
import { AUTH_TOKEN } from './constants';
import { IS_LOGGED_IN } from './operations';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean! @client
  }
`;

export const resolvers = {
  Mutation: {
    logout: (_, variables, { cache, client }) => {
      cache.writeQuery({
        query: IS_LOGGED_IN,
        data: { isLoggedIn: false },
      });
      localStorage.removeItem(AUTH_TOKEN);
      client.resetStore();

      return null;
    },
  },
};
