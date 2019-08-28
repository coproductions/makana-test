import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { AUTH_TOKEN } from '../constants';
import { resolvers, typeDefs } from '../resolvers';

// TODO: via env configs
const WS_URL = 'ws://localhost:4000';
const HTTP_URL = 'http://localhost:4000';
const cache = new InMemoryCache();
const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true,
  },
});
const httpLink = new HttpLink({ uri: HTTP_URL });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    console.log('graphqlerrors', graphQLErrors);
    for (let err of graphQLErrors) {
      if ((err.message = 'Not authenticated')) {
        // error code is set to UNAUTHENTICATED
        // when AuthenticationError thrown in resolver
        localStorage.removeItem(AUTH_TOKEN);
        cache.writeData({
          data: {
            isLoggedIn: false,
          },
        });
        const oldHeaders = operation.getContext().headers;
        operation.setContext({
          headers: {
            ...oldHeaders,
            authorization: '',
          },
        });
        return forward(operation);
      }
    }
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const splitLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const link = ApolloLink.from([authLink, errorLink, splitLink]);

const client = new ApolloClient({ link, cache, typeDefs, resolvers });

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem(AUTH_TOKEN),
  },
});
export default ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>;
