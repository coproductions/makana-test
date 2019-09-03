import React, { Fragment } from 'react';
import Comment from './Comment';
import { compose } from 'recompose';
import renderWhileLoading from '../utils/renderWhileLoading';

const ListComments = ({ comments, showPrivate }) => (
  <Fragment>
    {comments && comments.map(comment => <Comment key={comment.id} {...comment} showPrivate={showPrivate} />)}
  </Fragment>
);

export default compose(renderWhileLoading)(ListComments);
