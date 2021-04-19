import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// material ui components
import { Button, makeStyles, TextField, Typography, Paper, Grid } from '@material-ui/core';

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
    padding: 25
  }
}));

function ResetPassword() {
  // material ui
  const classes = useStyles();
  // set up functions so we can use them
  const dispatch = useDispatch();
  const history = useHistory();

  // local state
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');


  // get state from redux store
  const errors = useSelector((store) => store.errors);

  // functions
  const changePassword = (event) => {
    event.preventDefault();
    console.log('new password button clicked')
  }; // end login

  return (
    <Grid container justify='center'>
      <Paper className={classes.paper}>
        <form className={classes.form}>
          <Typography variant="h4" 
          align="center" 
          style={{ fontWeight: 550 }} 
          gutterBottom>
            Enter New Password
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
                label="newPassword"
                size="small"
                type="password"
                name="newPassword"
                required
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}/>
            </div>
            
            <div>
            <TextField
              variant="outlined"
              size="small"
              type="password"
              label="Confirm Password"
              value={passwordConfirm}
              required
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
            </div>

            <div>
              <Button
                style={{ backgroundColor: '#1e565c', color: 'white', margin: 10 }}
                name="login"
                value="Log In"
                onClick={changePassword}>
                Set Password
              </Button>
            </div>

          </center>
        </form>
      </Paper>
    </Grid>
  );
}

export default ResetPassword;
