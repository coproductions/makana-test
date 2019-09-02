import { get } from 'lodash';
import { useQuery, useApolloClient } from 'react-apollo';
import { useRef, useEffect } from 'react';

import { FEED_SUBSCRIPTION, FEED_QUERY, COMMENT_QUERY } from '../operations';
import { useUserQuery, useErrorHandler } from '../hooks';

export const useFeedSubscription = showPrivate => {
  const ref = useRef(null);
  const { isLoggedIn, me, userId } = useUserQuery();
  const { data, error, loading, subscribeToMore } = useQuery(FEED_QUERY, {
    variables: { showPrivate },
  });
  const client = useApolloClient();
  useErrorHandler(error);
  useEffect(() => {
    if (!loading && data) {
      if (ref.current) {
        // unsubscribe previous subscription
        ref.current();
      }
      ref.current = subscribeToMore({
        document: FEED_SUBSCRIPTION,
        shouldResubscribe: false,
        variables: { showPrivate: !!isLoggedIn, userId },

        updateQuery: (prev, { subscriptionData }) => {
          const mutation = get(subscriptionData, 'data.feedSubscription.mutation', '');
          switch (mutation) {
            case 'CREATED':
              const newItem = get(subscriptionData, 'data.feedSubscription.node', null);
              if (!newItem && userId === newItem.author.id) {
                // new items by this user are handled elsewhere
                return prev;
              }
              if (newItem.parent) {
                // it's a comment
                try {
                  const { comment } = client.readQuery({
                    query: COMMENT_QUERY,
                    variables: { id: newItem.parent.id },
                  });
                  client.writeQuery({
                    query: COMMENT_QUERY,
                    variables: { id: newItem.parent.id },
                    data: {
                      comment: { ...comment, children: [newItem, ...comment.children] },
                    },
                  });
                } catch (e) {}

                return {
                  feed: prev.feed.map(c =>
                    c.id === newItem.parent.id ? { ...c, children: [newItem, ...c.children] } : c
                  ),
                };
              } else {
                const updatedFeedData = {
                  feed: [{ ...newItem, children: [] }, ...prev.feed.filter(c => c.id !== newItem.id)],
                };
                // it's a post update the private feed
                client.writeQuery({
                  query: FEED_QUERY,
                  variables: { showPrivate: true },
                  data: updatedFeedData,
                });

                if (newItem.isPublic) {
                  // it's public update the public feed
                  client.writeQuery({
                    query: FEED_QUERY,
                    variables: { showPrivate: false },
                    data: updatedFeedData,
                  });
                }
                return showPrivate || newItem.isPublic ? updatedFeedData : prev;
              }
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
