import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import LoginForm from '../LoginForm/LoginForm';

import { Button, createMuiTheme, makeStyles, Paper, ThemeProvider, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 350,
    paddingTop: 25,
    paddingBottom: 25,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e565c',
      light: '#26AB6E',
      dark: '#1e565c'
    },
    secondary: {
      main: '#0044ff',
      light: '#01689b',
      contrastText: '#ffcc00',
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: 'black',
      },
    },
  }
});

function LoginPage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <ThemeProvider theme={theme}>
      <center>
        <Paper className={classes.root}>
          <LoginForm />
        </Paper>
        <Typography style={{ marginTop: 50 }} variant="subtitle1">
          Want to test your ingredients?
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
          Request Account
      </Button>
      </center>
    </ThemeProvider>
  );
}

export default LoginPage;
