import { Button, FormControlLabel, makeStyles, Switch, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

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
  const history = useHistory();

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
  const [notifyStatusChange, setNotifyStatusChange] = useState(true);
  const [notifyResultsReady, setNotifyResultsReady] = useState(true);
  const [notifyDelay, setNotifyDelay] = useState(true);

  const registerUser = (event) => {
    event.preventDefault();
    console.log(
      companyName,
      companyAddress,
      phoneNumber,
      teamLeadName,
      email,
      password,
      notifyStatusChange,
      notifyResultsReady,
      notifyDelay
    );
    // Check that both password fields match
    if (password === passwordConfirm) {
      if (email && companyName && companyAddress && city && state && zip && phoneNumber && teamLeadName) {
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
            notifyStatusChange,
            notifyResultsReady,
            notifyDelay
          },
        });
        Swal.fire({
          icon: 'success',
          title: 'Thank you for your interest',
          text: 'You will receive an email with directions for the next step shortly.',
          showCloseButton: true,
          confirmButtonColor: '#1e565c'
        })
        clearForm();
        history.push('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Make sure the form is filled out entirely.',
        })
      }

    } else {
      // TO DO - convert to styled alert
      Swal.fire({
        icon: 'error',
        title: 'Make sure your passwords match.',
        confirmButtonColor: '#1e565c'
      })
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
    setNotifyStatusChange(true);
    setNotifyResultsReady(true);
    setNotifyDelay(true);
  }; // end clearForm

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        style={{ fontWeight: 500 }}
        gutterBottom
      >
        Register
      </Typography>
      <form autoComplete="off" className={classes.root}>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}

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
        <div>
          <Typography align="left" variant="h5" style={{ marginLeft: 30 }}>Notify me when:</Typography>
        </div>
        <FormControlLabel
          control={
            <Switch
              checked={notifyStatusChange}
              onChange={(event, val) => setNotifyStatusChange(val)}
              name="checkedA"
              color="primary"
            />
          }
          label="When there's a change in status"
        />
        <FormControlLabel
          control={
            <Switch
              checked={notifyResultsReady}
              onChange={(event, val) => setNotifyResultsReady(val)}
              name="checkedB"
              color="primary"
            />
          }
          label="When results are ready"
        />
        <FormControlLabel
          control={
            <Switch
              checked={notifyDelay}
              onChange={(event, val) => setNotifyDelay(val)}
              name="checkedC"
              color="primary"
            />
          }
          label="If there is an unexpected delay"
        />
        <div>
          <Button
            style={{ backgroundColor: '#1e565c', color: 'white', margin: 10, width: '60%' }}
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
