import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const SIGN_UP = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        name
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation logout {
    logout @client
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($message: String!, $isPublic: Boolean!, $parentCommentId: ID) {
    createComment(message: $message, isPublic: $isPublic, parentCommentId: $parentCommentId) {
      id
    }
  }
`;
