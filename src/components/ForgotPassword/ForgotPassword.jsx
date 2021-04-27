import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// material ui components
import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Paper,
  Grid,
} from '@material-ui/core';

// material ui styles
const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  paper: {
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 350,
    padding: 25,
  },
}));

function ForgotPassword() {
  // material ui
  const classes = useStyles();
  // set up functions so we can use them
  const dispatch = useDispatch();
  const history = useHistory();

  // local state
  const [email, setEmail] = useState('');

  // get state from redux store
  const errors = useSelector((store) => store.errors);

  // functions
  const changePassword = (event) => {
    event.preventDefault();
    if (email) {
      dispatch({
        type: 'FORGOT_PASSWORD',
        payload: {
          email,
        },
      });
      alert('Please check your email for instructions');
      history.push('/login');
    } else {
      // dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Grid container justify="center">
      <Paper className={classes.paper}>
        <form className={classes.form}>
          <Typography
            variant="h4"
            align="center"
            style={{ fontWeight: 550 }}
            gutterBottom
          >
            Enter User Email
          </Typography>

          {errors.loginMessage && (
            <h3 className="alert" role="alert">
              {errors.loginMessage}
            </h3>
          )}

          <center>
            <div>
              <TextField
                variant="outlined"
                label="Email"
                size="small"
                name="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div>
              <Button
                style={{ margin: 10 }}
                variant="contained"
                color="primary"
                name="login"
                value="Log In"
                onClick={changePassword}
              >
                Change Password
              </Button>
            </div>
          </center>
        </form>
      </Paper>
    </Grid>
  );
}

export default ForgotPassword;
