import { graphql } from 'react-apollo';
import { compose, withProps, toRenderProps } from 'recompose';
import { FEED_QUERY } from '../operations';

const enhanced = compose(
  graphql(FEED_QUERY),
  withProps(({ data: { loading, feed } }) => ({
    loading: loading,
    comments: feed,
  }))
);

export default toRenderProps(enhanced);
