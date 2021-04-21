import { useHistory } from 'react-router-dom';
import { useState } from 'react';

import RegisterForm from '../RegisterForm/RegisterForm';
import RegisterForm2 from '../RegisterForm/RegisterForm2';
import RegisterNotify from '../RegisterForm/RegisterNotify';

import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 350,
    paddingTop: 25,
    paddingBottom: 25,
  },
}));

function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();

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
        component="h1"
        style={{ maxWidth: '80%', fontSize: 50, fontWeight: 800 }}
        gutterBottom
      >
        Register
        </Typography>
      <Paper style={{ marginBottom: 20 }}>
        <Grid container>

          <Grid item xs>
            <Paper style={{ margin: 50, padding: 17, maxWidth: 'fit-content' }}>
              <RegisterForm companyName={companyName} setCompanyName={setCompanyName} city={city} setCity={setCity} state={setState} zip={zip} setZip={setZip} />
            </Paper>
          </Grid>

          <Grid item xs>
            <Paper style={{ margin: 50, padding: 17, maxWidth: 'fit-content' }}>
              <RegisterForm2 phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} teamLeadName={teamLeadName} setTeamLeadName={setTeamLeadName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} passwordConfirm={passwordConfirm} setPasswordConfirm={setPasswordConfirm} />
            </Paper>
          </Grid>

          <Grid item xs>
            <Paper style={{ margin: 50, padding: 17, maxWidth: 'fit-content' }}>
              <RegisterNotify notifyStatusChange={notifyStatusChange} setNotifyStatusChange={setNotifyStatusChange} notifyResultsReady={notifyResultsReady} setNotifyResultsReady={setNotifyResultsReady} notifyDelay={notifyDelay} setNotifyDelay={setNotifyDelay} />
            </Paper>
            <Button
              style={{ backgroundColor: '#1e565c', color: 'white', width: '50%' }}
              value="Register"
              onClick={registerUser}
            >
              Register
              </Button>
          </Grid>
        </Grid>
      </Paper>

      <center>
        <Typography variant="subtitle1">
          Already have an account?
        </Typography>
        <Button
          style={{
            backgroundColor: '#1e565c',
            color: 'white',
            marginTop: 20
          }}
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
          </Button>
      </center>
    </>
  );
}

export default RegisterPage;
