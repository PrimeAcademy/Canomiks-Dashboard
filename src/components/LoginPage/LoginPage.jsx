import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import LoginForm from '../LoginForm/LoginForm';

import { Button, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 350,
    paddingTop: 25,
    paddingBottom: 25,
  },
}));

function LoginPage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <center>
      <Paper className={classes.root}>
        <LoginForm />
      </Paper>
      <Typography style={{ marginTop: 50 }} variant="subtitle1">
        Need to request an account?
      </Typography>
      <Button
        size="small"
        variant="outlined"
        style={{
          color: '#1e565c',
          marginTop: 10
        }}
        onClick={() => {
          history.push('/registration');
        }}
      >
        Request
      </Button>
    </center>
  );
}

export default LoginPage;
