import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const useStyles = makeStyles(theme => ({
  centered: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  padding: {
    padding: ({ padding }) => padding || 0,
  },
}));

export default ({ centered, padding }) => {
  const classes = useStyles({ padding, centered });

  return (
    <div
      className={classnames(classes.padding, {
        [classes.centered]: centered,
      })}
    >
      <CircularProgress />
    </div>
  );
};
