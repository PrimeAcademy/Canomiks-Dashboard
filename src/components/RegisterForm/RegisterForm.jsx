import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function RegisterForm() {
  const dispatch = useDispatch();
  const classes = useStyles();

  /* Store Imports */
  const errors = useSelector((store) => store.errors);

  /* Local State */
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [teamLeadName, setTeamLeadName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const registerUser = (event) => {
    event.preventDefault();

    // Check that both password fields match
    if (password === passwordConfirm) {
      dispatch({
        type: 'REGISTER',
        payload: {
          companyName,
          companyAddress,
          city,
          state,
          zip,
          phoneNumber,
          teamLeadName,
          email,
          password,
        },
      });
      console.log(
        companyName,
        companyAddress,
        phoneNumber,
        teamLeadName,
        email,
        password
      );
      clearForm();
    } else {
      // TO DO - convert to styled alert
      alert('Make sure passwords match');
    }
  }; // end registerUser

  const clearForm = () => {
    setCompanyName('');
    setCompanyAddress('');
    setCity('');
    setState('');
    setZip('');
    setPhoneNumber('');
    setTeamLeadName('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  }; // end clearForm

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        style={{ fontWeight: 550 }}
        gutterBottom
      >
        Register
      </Typography>
      <form className={classes.root}>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <div>
          <TextField
            label="Company Name"
            id="companyName"
            className={classes.textField}
            variant="standard"
            size="small"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            required
          />

          <TextField
            label="Street Address"
            id="address"
            variant="standard"
            size="small"
            value={companyAddress}
            onChange={(event) => setCompanyAddress(event.target.value)}
            required
          />

          <TextField
            label="City"
            variant="standard"
            size="small"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
          />

          <TextField
            label="State"
            variant="standard"
            size="small"
            value={state}
            onChange={(event) => setState(event.target.value)}
            required
          />

          <TextField
            label="Zip Code"
            variant="standard"
            size="small"
            value={zip}
            onChange={(event) => setZip(event.target.value)}
            required
          />

          <TextField
            label="Phone Number"
            variant="standard"
            size="small"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            required
          />
        </div>

        <div>
          <TextField
            label="Team Lead Name"
            variant="standard"
            size="small"
            value={teamLeadName}
            onChange={(event) => setTeamLeadName(event.target.value)}
            required
          />

          <TextField
            label="Email"
            variant="standard"
            size="small"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <TextField
            label="Password"
            type="password"
            variant="standard"
            size="small"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <TextField
            label="Confirm Password"
            type="password"
            variant="standard"
            size="small"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
            required
          />
        </div>

        <div>
          <Button
            style={{ backgroundColor: '#1e565c', color: 'white', margin: 10 }}
            value="Register"
            onClick={registerUser}
          >
            Register
          </Button>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
