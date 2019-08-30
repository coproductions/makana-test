import { useMutation, useApolloClient } from 'react-apollo';
import { AUTH_TOKEN } from '../constants';
import { FEED_QUERY } from '../operations';

export const useAuthMutation = props => {
  const client = useApolloClient();
  const [mutate, { loading }] = useMutation(props.mutation, {
    onError: err => props.enqueueSnackbar(err.message, { variant: 'error' }),
    refetchQueries: ({ data, error }) => {
      if (data && data.login.token) {
        localStorage.setItem(AUTH_TOKEN, data.login.token);
        client.writeData({ data: { isLoggedIn: true } });
        props.history.push('/');
      }
      return [{ query: FEED_QUERY, variables: { showPrivate: false } }];
    },
  });

  return [mutate, loading];
};
