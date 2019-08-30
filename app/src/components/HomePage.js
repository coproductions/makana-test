import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import FeedData from '../containers/FeedData';
import FeedSubscriptionData from '../containers/FeedSubscriptionData';
import ListComments from './ListComments';
import Notice from './Notice';
import AppBar from './AppBar';

const styles = theme => ({
  page: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const enhanced = compose(withStyles(styles));

export default enhanced(({ classes }) => {
  const [showPrivate, setShowPrivate] = useState(false);

  return (
    <React.Fragment>
      <AppBar showPrivate={showPrivate} setShowPrivate={setShowPrivate} />
      <div className={classes.page}>
        <FeedSubscriptionData>{props => <Notice {...props} />}</FeedSubscriptionData>

        <FeedData showPrivate={showPrivate}>{props => <ListComments {...props} />}</FeedData>
      </div>
    </React.Fragment>
  );
});
