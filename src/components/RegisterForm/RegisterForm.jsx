import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  }
}));

function RegisterForm() {
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

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const classes = useStyles();

  const registerUser = (event) => {
    event.preventDefault();
    // check to make sure the password is confirmed. They must match
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
      console.log('Make sure passwords match');
      alert('Make sure passwords match');
    }
  }; // end registerUser

  const clearForm = () => {
    setCompanyName('')
    setCompanyAddress('')
    setCity('')
    setState('')
    setZip('')
    setPhoneNumber('')
    setTeamLeadName('')
    setEmail('')
    setPassword('')
    setPasswordConfirm('')
  }

  return (
    <>
      <Typography variant="h4" align="center" style={{ fontWeight: 550 }} gutterBottom>Register</Typography>
      <form className={classes.root} onSubmit={registerUser}>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <TextField
          className={classes.textField}
          variant="outlined"
          size="small"
          id="companyName"
          label="Company Name"
          value={companyName}
          required
          onChange={(event) => setCompanyName(event.target.value)}
        />
        <TextField
          variant="outlined"
          size="small"
          id="address"
          label="Street Address"
          value={companyAddress}
          required
          onChange={(event) => setCompanyAddress(event.target.value)}
        />
        <TextField
          variant="outlined"
          size="small"
          label="City"
          value={city}
          required
          onChange={(event) => setCity(event.target.value)}
        />
        <TextField
          variant="outlined"
          size="small"
          label="State"
          value={state}
          required
          onChange={(event) => setState(event.target.value)}
        />
        <TextField
          variant="outlined"
          size="small"
          label="Zip Code"
          value={zip}
          required
          onChange={(event) => setZip(event.target.value)}
        />
        <TextField
          variant="outlined"
          size="small"
          label="Phone Number"
          value={phoneNumber}
          required
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <TextField
          variant="outlined"
          size="small"
          label="Team Lead Name"
          value={teamLeadName}
          required
          onChange={(event) => setTeamLeadName(event.target.value)}
        />
        <TextField
          variant="outlined"
          size="small"
          label="Email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          variant="outlined"
          size="small"
          type="password"
          label="Password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          variant="outlined"
          size="small"
          type="password"
          label="Confirm Password"
          value={passwordConfirm}
          required
          onChange={(event) => setPasswordConfirm(event.target.value)}
        />
        <div>
          <Button type="submit" style={{ backgroundColor: '#1e565c', color: 'white', margin: 10 }} value="Register">
            Register
        </Button>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
