import gql from 'graphql-tag';

export const FEED_QUERY = gql`
  query feed {
    feed {
      id
      message
      createdAt
      author {
        name
      }
      children {
        id
      }
    }
  }
`;

export const GET_NAME = gql`
  {
    me {
      name
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
