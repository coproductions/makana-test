import { IS_LOGGED_IN, GET_USER } from '../operations';
import { useQuery } from 'react-apollo';

export const useUserQuery = () => {
  const loginQuery = useQuery(IS_LOGGED_IN);
  const isLoggedIn = !loginQuery.loading && !loginQuery.error && loginQuery.data.isLoggedIn;
  const { loading, error, data } = useQuery(GET_USER, {
    skip: !isLoggedIn,
  });

  return {
    loading: loginQuery.loading || loading,
    isLoggedIn,
    me: (data && data.me) || null,
    error: error || loginQuery.error,
  };
};
