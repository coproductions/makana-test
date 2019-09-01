import { get } from 'lodash';
import { useQuery } from 'react-apollo';
import { useRef, useEffect } from 'react';

import { FEED_SUBSCRIPTION, FEED_QUERY } from '../operations';
import { useUserQuery, useErrorHandler } from '../hooks';

export const useFeedSubscription = showPrivate => {
  const ref = useRef(null);
  const { isLoggedIn, me } = useUserQuery();
  const { data, error, loading, subscribeToMore } = useQuery(FEED_QUERY, {
    variables: { showPrivate },
  });
  useErrorHandler(error);
  useEffect(() => {
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
          const mutation = get(subscriptionData, 'data.feedSubscription.mutation', '');

          switch (mutation) {
            case 'CREATED':
              const newItem = get(subscriptionData, 'data.feedSubscription.node', null);
              if (newItem && me && me.id !== newItem.author.id && (newItem.isPublic || showPrivate)) {
                return {
                  feed: [{ ...newItem, children: [] }, ...prev.feed.filter(c => c.id !== newItem.id)],
                };
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
  }, [showPrivate, me, loading]);

  return { data, loading };
};
