import React, { useState } from 'react';
import { Button, Avatar, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CirclePicker } from 'react-color';
import { useUserQuery } from '../hooks';

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

const ColorPicker = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState(null);
  const { me } = useUserQuery();

  const handleChangeComplete = (color, event) => setSelected(color.hex);
  return (
    <Container className={classes.container}>
      <Avatar style={{ background: selected }}>{me && me.name[0].toUpperCase()}</Avatar>
      <CirclePicker onChangeComplete={handleChangeComplete} />
      <Button variant="contained" className={classes.button}>
        Confirm
      </Button>
    </Container>
  );
};

export default ColorPicker;
