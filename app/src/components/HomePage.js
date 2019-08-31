import React, { useState } from 'react';
import { withStyles, Container, colors } from '@material-ui/core';
import { compose } from 'recompose';
import FeedData from '../containers/FeedData';
import FeedSubscriptionData from '../containers/FeedSubscriptionData';
import ListComments from './ListComments';
import Notice from './Notice';
import AppBar from './AppBar';
import PostComment from './PostComment';
import { useUserQuery } from '../hooks';

const styles = theme => ({
  page: {
    // padding: theme.spacing(1),
    backgroundColor: colors.grey[200],
    height: '-webkit-fill-available',
  },
  feedContainer: {},
});

const enhanced = compose(withStyles(styles));

export default enhanced(({ classes }) => {
  const [showPrivate, setShowPrivate] = useState(false);
  const { isLoggedIn } = useUserQuery();

  return (
    <React.Fragment>
      <div className={classes.page}>
        <AppBar showPrivate={showPrivate} setShowPrivate={setShowPrivate} />
        <Container maxWidth="sm" className={classes.feedContainer}>
          {isLoggedIn && <PostComment />}
          <FeedSubscriptionData>{props => <Notice {...props} />}</FeedSubscriptionData>
          <FeedData showPrivate={showPrivate}>{props => <ListComments {...props} />}</FeedData>
        </Container>
      </div>
    </React.Fragment>
  );
});
