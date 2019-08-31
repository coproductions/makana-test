import gql from 'graphql-tag';

export const FEED_SUBSCRIPTION = gql`
  subscription feedSubscription($showPrivate: Boolean!, $isLoggedIn: Boolean!) {
    feedSubscription(showPrivate: $showPrivate, isLoggedIn: $isLoggedIn) {
      mutation
      node {
        isPublic
        author {
          name
          id
        }
      }

      previousValues {
        id
        message
      }
    }
  }
`;
