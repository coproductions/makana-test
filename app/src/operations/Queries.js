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
        profileColor
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
      profileColor
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const COMMENT_QUERY = gql`
  query comment($id: ID!) {
    comment(id: $id) {
      id
      isPublic
      message
      createdAt
      author {
        name
        id
        profileColor
      }
      children {
        id
        message
        createdAt
        author {
          name
          id
          profileColor
        }
      }
    }
  }
`;
