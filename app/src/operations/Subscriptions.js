import gql from 'graphql-tag';

export const FEED_SUBSCRIPTION = gql`
  subscription feedSubscription($showPrivate: Boolean!, $userId: String!) {
    feedSubscription(showPrivate: $showPrivate, userId: $userId) {
      mutation
      node {
        id
        isPublic
        message
        createdAt
        parent {
          id
        }
        author {
          profileColor
          id
          name
        }
      }

      previousValues {
        isPublic
        message
        id
      }
    }
  }
`;
