import React, { useState } from 'react';
import { Container, colors } from '@material-ui/core';
import ListComments from './ListComments';
import AppBar from './AppBar';
import { useFeedSubscription } from '../hooks';
import { makeStyles } from '@material-ui/core/styles';
import { useUserQuery } from '../hooks';

const useStyles = makeStyles(theme => ({
  page: {
    overflow: 'scroll',
    backgroundColor: colors.grey[200],
    height: '-webkit-fill-available',
  },
  feedContainer: {
    marginTop: ({ isLoggedIn }) => (isLoggedIn ? 140 : 80),
  },
}));

export const HomePage = () => {
  const { isLoggedIn } = useUserQuery();
  const classes = useStyles({ isLoggedIn });
  const [showPrivate, setShowPrivate] = useState(false);
  const { data } = useFeedSubscription(showPrivate);
  return (
    <div className={classes.page}>
      <AppBar showPrivate={showPrivate} setShowPrivate={setShowPrivate} />
      <Container maxWidth="sm" className={classes.feedContainer}>
        <ListComments comments={data.feed} showPrivate={showPrivate} />
      </Container>
    </div>
  );
};

export default HomePage;
