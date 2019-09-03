import React from 'react';
import { Container, colors, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TimeAgo from 'react-timeago';
import { Tooltip } from '@material-ui/core';
import ColorAvatar from './ColorAvatar';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
  },
  avatar: {
    margin: 10,
    width: 20,
    height: 20,
    fontSize: '1rem',
  },
  time: {
    color: colors.grey[600],
    paddingRight: theme.spacing(1),
  },
}));

const Reply = ({ author, message, createdAt }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Tooltip title={author.name}>
        <ColorAvatar {...author} className={classes.avatar} />
      </Tooltip>

      <Typography className={classes.time} variant="caption">
        <TimeAgo date={createdAt} />
      </Typography>
      <Typography variant="body2">{message}</Typography>
    </Container>
  );
};

export default Reply;
