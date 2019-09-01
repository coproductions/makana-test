import React, { useState } from 'react';
import { withStyles, Container, colors } from '@material-ui/core';
import { compose } from 'recompose';
import ListComments from './ListComments';
import AppBar from './AppBar';
import PostComment from './PostComment';
import { useUserQuery, useFeedSubscription } from '../hooks';

const styles = theme => ({
  page: {
    backgroundColor: colors.grey[200],
    height: '-webkit-fill-available',
  },
  feedContainer: {},
});

export const HomePage = ({ classes }) => {
  const [showPrivate, setShowPrivate] = useState(false);
  const { isLoggedIn } = useUserQuery();
  const { data } = useFeedSubscription(showPrivate);
  return (
    <React.Fragment>
      <div className={classes.page}>
        <AppBar showPrivate={showPrivate} setShowPrivate={setShowPrivate} />
        <Container maxWidth="sm" className={classes.feedContainer}>
          {isLoggedIn && <PostComment showPrivate={showPrivate} />}
          <ListComments comments={data.feed} showPrivate={showPrivate} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default compose(withStyles(styles))(HomePage);
