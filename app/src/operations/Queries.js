import gql from 'graphql-tag';

export const FEED_QUERY = gql`
  query feed($showPrivate: Boolean!) {
    feed(showPrivate: $showPrivate) {
      id
      isPublic
      message
      createdAt
      author {
        name
        id
      }
      children {
        id
      }
    }
  }
`;

export const GET_USER = gql`
  {
    me {
      name
      email
      id
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
