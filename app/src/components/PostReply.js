import React, { useState, Fragment } from 'react';
import { colors, Paper, Button, InputBase, Divider } from '@material-ui/core';
import { useMutation } from 'react-apollo';
import { CREATE_COMMENT, COMMENT_QUERY } from '../operations';
import { useUserQuery } from '../hooks';
import Loading from './Loading';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    borderRight: 0,

    // margin: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    backgroundColor: colors.grey[100],
    padding: theme.spacing(1),
  },
  iconButton: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  buttonLabel: {
    marginLeft: theme.spacing(1),
  },
}));

const PostReply = props => {
  const classes = useStyles();

  const [message, setMessage] = useState('');
  const { me } = useUserQuery();
  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    onCompleted: () => setMessage(''),
    update: (cache, { data }) => {
      try {
        const { comment } = cache.readQuery({
          query: COMMENT_QUERY,
          variables: { id: props.id },
        });
        cache.writeQuery({
          query: COMMENT_QUERY,
          variables: { id: props.id },
          data: {
            comment: { ...comment, children: [...comment.children, { ...data.createComment, author: me }] },
          },
        });
      } catch (e) {}
    },
  });

  const addComment = () =>
    createComment({ variables: { message, isPublic: props.isPublic, parentCommentId: props.id } });

  return (
    <Fragment>
      <Paper square className={classes.paper} elevation={1}>
        <InputBase
          value={message}
          onChange={e => setMessage(e.target.value)}
          className={classes.input}
          multiline={true}
          rowsMax={message ? 5 : 1}
          placeholder={`${me.name}'s opinion ...`}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <Button onClick={addComment} className={classes.iconButton} disabled={!message} aria-label="post">
          {loading ? <Loading centered /> : 'Reply'}
        </Button>
      </Paper>
      {loading && <Loading centered />}
    </Fragment>
  );
};

export default PostReply;
