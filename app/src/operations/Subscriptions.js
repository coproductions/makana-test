import gql from 'graphql-tag';

export const FEED_SUBSCRIPTION = gql`
  subscription {
    feedSubscription {
      mutation
      node {
        id
        message
        updatedAt
        author {
          name
        }
      }
      previousValues {
        id
        message
      }
    }
  }
`;
