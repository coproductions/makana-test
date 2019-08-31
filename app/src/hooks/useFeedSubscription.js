import { useSnackbar } from 'notistack';
import { useSubscription, useQuery } from 'react-apollo';
import { FEED_SUBSCRIPTION, FEED_QUERY } from '../operations';
import { useUserQuery } from './useUserQuery';

export const useFeedSubscription = showPrivate => {
  const { isLoggedIn } = useUserQuery();
  const { enqueueSnackbar } = useSnackbar();
  const { data, error, loading, refetch, subscribeToMore } = useQuery(FEED_QUERY, {
    variables: { showPrivate },
  });
  if (error) {
    enqueueSnackbar(error.message, {
      variant: 'error',
    });
  }

  if (!loading && data) {
    console.log('isloggedin', isLoggedIn);
    subscribeToMore({
      document: FEED_SUBSCRIPTION,
      variables: { showPrivate: isLoggedIn, isLoggedIn },

      updateQuery: (prev, { subscriptionData }) => {
        console.log('got subscription in', subscriptionData);
        if (!subscriptionData.data) {
          return prev;
        } else if (subscriptionData.data.feedSubscription.node.isPublic || showPrivate) {
          console.log('refetching');
          refetch({ showPrivate });
        } else if (isLoggedIn) {
          enqueueSnackbar('testing', {
            variant: 'info',
          });
        }
      },
    });
  }
  return { data, loading };
};
