import React from 'react';
import { colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PostReply from './PostReply';
import Reply from './Reply';
import { COMMENT_QUERY } from '../operations';
import { useQuery } from 'react-apollo';
import { useUserQuery } from '../hooks';

const useStyles = makeStyles(theme => ({
  replies: {
    background: colors.grey[100],
  },
}));

const Replies = props => {
  const { isLoggedIn } = useUserQuery();

  const classes = useStyles();
  const {
    data: { comment },
    loading,
    // error,
  } = useQuery(COMMENT_QUERY, {
    variables: { id: props.id },
  });
  return (
    <div className={classes.replies}>
      {isLoggedIn && <PostReply {...props} loading={loading} />}
      {comment && comment.children.map(c => <Reply key={c.id} {...c} />)}
    </div>
  );
};

export default Replies;
