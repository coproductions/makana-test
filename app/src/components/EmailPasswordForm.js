import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Loading from './Loading';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function EmailPasswordForm({ values, setValues, onSubmit, submitLabel, includeName, loading }) {
  const classes = useStyles();

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value.trim(),
    });
  };

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {includeName && (
        <TextField
          className={classes.textField}
          value={values.name}
          onChange={handleChange('name')}
          label="name"
          margin="normal"
          variant="outlined"
          name="name"
          type="text"
        />
      )}
      <TextField
        className={classes.textField}
        value={values.email}
        onChange={handleChange('email')}
        label="email"
        margin="normal"
        variant="outlined"
        name="email"
        type="email"
      />

      <TextField
        className={classes.textField}
        value={values.password}
        onChange={handleChange('password')}
        margin="normal"
        variant="outlined"
        label="password"
        name="password"
        type="password"
      />
      {loading ? (
        <Loading />
      ) : (
        <Button variant="outlined" type="submit">
          {submitLabel}
        </Button>
      )}
    </form>
  );
}

EmailPasswordForm.propTypes = {
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  setValues: PropTypes.func,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
  includeName: PropTypes.bool,
  loading: PropTypes.bool,
};

export default EmailPasswordForm;
