import React from 'react';
import { compose } from 'recompose';
import TimeAgo from 'react-timeago';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { useUserQuery } from '../hooks';

const styles = theme => ({
  card: {
    margin: theme.spacing(2),
    // maxWidth: 400,
  },
});

const enhanced = compose(withStyles(styles));

export default enhanced(({ classes, message, createdAt, author }) => {
  const { me } = useUserQuery();
  const allowDelete = me && me.id === author.id;

  return (
    <Card className={classes.card}>
      <CardActions>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {author.name}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          <TimeAgo date={createdAt} />
        </Typography>
      </CardActions>
      <CardContent>
        <Typography variant="body1">{message}</Typography>
      </CardContent>
    </Card>
  );
});
