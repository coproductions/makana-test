import React, { useState } from 'react';
import { withStyles, Container, colors } from '@material-ui/core';
import { compose } from 'recompose';
import FeedData from '../containers/FeedData';
import FeedSubscriptionData from '../containers/FeedSubscriptionData';
import ListComments from './ListComments';
import Notice from './Notice';
import AppBar from './AppBar';
import PostComment from './PostComment';
import { useUserQuery, useFeedSubscription } from '../hooks';
import { useSnackbar } from 'notistack';

const styles = theme => ({
  page: {
    // padding: theme.spacing(1),
    backgroundColor: colors.grey[200],
    height: '-webkit-fill-available',
  },
  feedContainer: {},
});

export const HomePage = ({ classes }) => {
  const [showPrivate, setShowPrivate] = useState(false);
  const { isLoggedIn } = useUserQuery();
  const { loading, data } = useFeedSubscription(showPrivate);
  console.log(data);
  return (
    <React.Fragment>
      <div className={classes.page}>
        <AppBar showPrivate={showPrivate} setShowPrivate={setShowPrivate} />
        <Container maxWidth="sm" className={classes.feedContainer}>
          {isLoggedIn && <PostComment />}
          {
            //  <FeedSubscriptionData>{props => <Notice {...props} />}</FeedSubscriptionData>
          }
          <FeedData showPrivate={showPrivate}>{props => <ListComments {...props} />}</FeedData>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default compose(withStyles(styles))(HomePage);
