import { useMutation, useApolloClient } from 'react-apollo';

import { AUTH_TOKEN } from '../constants';

export const useAuthMutation = ({ mutation, enqueueSnackbar, history }) => {
  const client = useApolloClient();
  const [mutate, { loading }] = useMutation(mutation, {
    onError: err => enqueueSnackbar(err.message, { variant: 'error' }),
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      client.writeData({ data: { isLoggedIn: true } });
      history.push('/');
    },
  });

  return [mutate, loading];
};
