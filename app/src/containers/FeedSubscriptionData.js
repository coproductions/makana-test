import { graphql } from 'react-apollo';
import { compose, withProps, toRenderProps } from 'recompose';
import { FEED_SUBSCRIPTION } from '../operations';

const enhanced = compose(
  graphql(FEED_SUBSCRIPTION),
  withProps(({ data: { feedSubscription } }) => {
    if (!feedSubscription) {
      return;
    }

    const { mutation, previousValues, node } = feedSubscription;
    const values = mutation === 'DELETED' ? previousValues : node;

    return { ...values, mutation };
  })
);

export default toRenderProps(enhanced);
