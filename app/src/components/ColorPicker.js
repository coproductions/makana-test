import React, { useState } from 'react';
import { Button, Avatar, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CirclePicker } from 'react-color';
import { useUserQuery } from '../hooks';
import { UPDATE_COLOR, GET_USER } from '../operations';
import { useMutation } from 'react-apollo';
import { useErrorHandler } from '../hooks';
import Loading from './Loading';

const useStyles = makeStyles(theme => ({
  container: {
    // background: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 250,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 100,
    width: 100,
    hover: {
      background: 'white',
    },
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const ColorPicker = ({ closeModal }) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(null);
  const { me } = useUserQuery();
  const [updateColor, { error, loading }] = useMutation(UPDATE_COLOR, {
    update: (cache, { data }) => {
      try {
        cache.writeQuery({
          query: GET_USER,
          data: {
            me: { ...me, profileColor: data.updateColor.profileColor },
          },
        });
      } catch (e) {}
    },
    onCompleted: closeModal,
  });
  useErrorHandler(error);

  const handleConfirm = () => updateColor({ variables: { profileColor: selected } });
  const handleChangeComplete = (color, event) => setSelected(color.hex);

  return (
    <Container className={classes.container}>
      <Avatar style={{ background: selected }}>{me && me.name[0].toUpperCase()}</Avatar>
      <CirclePicker onChangeComplete={handleChangeComplete} />
      <Button disabled={loading} onClick={handleConfirm} variant="contained" className={classes.button}>
        {loading ? <Loading centered size={20} /> : 'Confirm'}
      </Button>
    </Container>
  );
};

export default ColorPicker;
