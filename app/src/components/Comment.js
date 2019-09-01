import { CardContent, colors, Typography, CardHeader, Avatar, IconButton } from '@material-ui/core';
import { compose } from 'recompose';
import { useMutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { Fragment } from 'react';
import TimeAgo from 'react-timeago';

import { DELETE_COMMENT, FEED_QUERY } from '../operations';
import { useUserQuery } from '../hooks';
import Loading from './Loading';

const styles = theme => ({
  card: {
    margin: theme.spacing(2),
  },
  publicAvatar: {
    margin: 10,
    color: 'black',
    backgroundColor: colors.blue[50],
  },
  privateAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: colors.grey[900],
  },
});

const enhanced = compose(withStyles(styles));

export default enhanced(({ classes, message, createdAt, author, id, isPublic, showPrivate }) => {
  const { me } = useUserQuery();
  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT, {
    update: (cache, { data }) => {
      try {
        const { feed } = cache.readQuery({
          query: FEED_QUERY,
          variables: { showPrivate },
        });
        cache.writeQuery({
          query: FEED_QUERY,
          variables: { showPrivate },
          data: {
            feed: feed.filter(comment => comment.id !== data.deleteComment.id),
          },
        });
      } catch (e) {}
    },
  });

  const isMine = me && me.id === author.id;

  return (
    <Card className={classes.card}>
      {loading ? (
        <Loading centered padding={20} />
      ) : (
        <Fragment>
          <CardHeader
            avatar={
              <Avatar
                className={isPublic ? classes.publicAvatar : classes.privateAvatar}
                aria-label={author.name}
              >
                {author.name[0].toUpperCase()}
              </Avatar>
            }
            action={
              isMine && (
                <IconButton
                  aria-label="delete"
                  disabled={loading}
                  onClick={() => deleteComment({ variables: { id } })}
                >
                  <DeleteIcon />
                </IconButton>
              )
            }
            title={author.name}
            subheader={<TimeAgo date={createdAt} />}
          ></CardHeader>
          <CardContent>
            <Typography variant="body1">{message}</Typography>
          </CardContent>
        </Fragment>
      )}
    </Card>
  );
});
