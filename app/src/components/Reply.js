import React from 'react';
import { Container, colors, Typography, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TimeAgo from 'react-timeago';
import { Tooltip } from '@material-ui/core';

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
        <Avatar className={classes.avatar}>{author.name[0]}</Avatar>
      </Tooltip>

      <Typography className={classes.time} variant="caption">
        <TimeAgo date={createdAt} />
      </Typography>
      <Typography variant="body2">{message}</Typography>
    </Container>
  );
};

export default Reply;
