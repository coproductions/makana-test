import { useMutation, useApolloClient } from 'react-apollo';
import { useSnackbar } from 'notistack';

import { AUTH_TOKEN } from '../constants';

export const useAuthMutation = ({ mutation, history }) => {
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

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
