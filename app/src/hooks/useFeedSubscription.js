import { useSnackbar } from 'notistack';
import { useQuery } from 'react-apollo';
import { FEED_SUBSCRIPTION, FEED_QUERY } from '../operations';
import { useUserQuery } from './useUserQuery';
import { get } from 'lodash';
import { useRef } from 'react';
export const useFeedSubscription = showPrivate => {
  const ref = useRef(null);
  const { isLoggedIn, me } = useUserQuery();
  const { enqueueSnackbar } = useSnackbar();
  const { data, error, loading, subscribeToMore } = useQuery(FEED_QUERY, {
    variables: { showPrivate },
  });
  if (error) {
    enqueueSnackbar(error.message, {
      variant: 'error',
    });
  }

  if (!loading && data) {
    if (ref.current) {
      // unsubscribe previous subscription
      ref.current();
    }
    ref.current = subscribeToMore({
      document: FEED_SUBSCRIPTION,
      shouldResubscribe: true,
      variables: { showPrivate: !!isLoggedIn, userId: me ? me.id : '' },

      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const mutation = get(subscriptionData, 'data.feedSubscription.mutation', '');
        switch (mutation) {
          case 'CREATED':
            const newItem = get(subscriptionData, 'data.feedSubscription.node', null);
            console.log('in here', newItem, showPrivate);
            if (newItem && me && me.id !== newItem.author.id && (newItem.isPublic || showPrivate)) {
              return { feed: [{ ...newItem, children: [] }, ...prev.feed.filter(c => c.id !== newItem.id)] };
            }
            return prev;
          case 'DELETED':
            const deletedItem = get(subscriptionData, 'data.feedSubscription.previousValues', {});

            return { feed: prev.feed.filter(c => c.id !== deletedItem.id) };
          default:
            return prev;
        }
      },
    });
  }
  return { data, loading };
};
