import { useMutation, useApolloClient } from 'react-apollo';
import { useSnackbar } from 'notistack';
import { useErrorHandler } from '../hooks';

import { AUTH_TOKEN } from '../constants';

export const useAuthMutation = ({ mutation, history }) => {
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  const [mutate, { loading, error }] = useMutation(mutation, {
    onError: err => enqueueSnackbar(err.message, { variant: 'error' }),
    onCompleted: ({ login, signup }) => {
      const token = (login && login.token) || (signup && signup.token) || '';
      localStorage.setItem(AUTH_TOKEN, token);
      client.writeData({ data: { isLoggedIn: true } });
      history.push('/');
    },
  });
  useErrorHandler(error);

  return [mutate, loading];
};
