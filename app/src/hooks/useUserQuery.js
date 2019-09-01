import { IS_LOGGED_IN, GET_USER } from '../operations';
import { useQuery } from 'react-apollo';
import { useErrorHandler } from '../hooks';

export const useUserQuery = () => {
  const loginQuery = useQuery(IS_LOGGED_IN);
  const isLoggedIn = !loginQuery.loading && !loginQuery.error && loginQuery.data.isLoggedIn;
  const { loading, error, data } = useQuery(GET_USER, {
    skip: !isLoggedIn,
  });
  const combinedError = error || loginQuery.error;
  useErrorHandler(combinedError);

  return {
    loading: loginQuery.loading || loading,
    isLoggedIn: !loading && isLoggedIn,
    me: (data && data.me) || null,
    error: combinedError,
  };
};
