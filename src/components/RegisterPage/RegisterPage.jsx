import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CompanyForm from '../RegisterForm/CompanyForm';
import TeamLeadForm from '../RegisterForm/TeamLeadForm';
import NotifyForm from '../RegisterForm/NotifyForm';

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
  const errors = useSelector((store) => store.errors);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyCity, setCompanyCity] = useState('');
  const [companyState, setCompanyState] = useState('');
  const [companyZip, setCompanyZip] = useState('');
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

    // Check that both password fields match
    if (password === passwordConfirm) {
      if (email && companyName && companyAddress && companyCity && companyState && companyZip && phoneNumber && teamLeadName) {
        dispatch({
          type: 'REGISTER',
          payload: {
            companyName,
            companyAddress,
            companyCity,
            companyState,
            companyZip,
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
        dispatch({
          type: 'REGISTRATION_INPUT_ERROR'
        })
      }
    } else {
      // TO DO - convert to styled alert
      dispatch({
        type: 'INVALID_PASSWORD'
      })
    }
  }; // end registerUser

  const clearForm = () => {
    setCompanyName('');
    setCompanyAddress('');
    setCompanyCity('');
    setCompanyState('');
    setCompanyZip('');
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

      <Paper style={{ marginBottom: 20 }}>
        <center>
          {errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {errors.registrationMessage}
            </h3>
          )}
        </center>
        <Grid container>

          <Grid item xs>
            <Paper style={{ margin: 50, padding: 17, maxWidth: 'fit-content' }}>
              <CompanyForm companyName={companyName} setCompanyName={setCompanyName} companyAddress={companyAddress} setCompanyAddress={setCompanyAddress} companyCity={companyCity} setCompanyCity={setCompanyCity} companyState={companyState} setCompanyState={setCompanyState} companyZip={companyZip} setCompanyZip={setCompanyZip} />
            </Paper>
          </Grid>

          <Grid item xs>
            <Paper style={{ margin: 50, padding: 17, maxWidth: 'fit-content' }}>
              <TeamLeadForm phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} teamLeadName={teamLeadName} setTeamLeadName={setTeamLeadName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} passwordConfirm={passwordConfirm} setPasswordConfirm={setPasswordConfirm} />
            </Paper>
          </Grid>

          <Grid item xs>
            <Paper style={{ margin: 50, padding: 17, maxWidth: 'fit-content' }}>
              <NotifyForm notifyStatusChange={notifyStatusChange} setNotifyStatusChange={setNotifyStatusChange} notifyResultsReady={notifyResultsReady} setNotifyResultsReady={setNotifyResultsReady} notifyDelay={notifyDelay} setNotifyDelay={setNotifyDelay} />
            </Paper>
            <center>
              <Button
                align="center"
                style={{ backgroundColor: '#1e565c', color: 'white', width: '50%' }}
                value="Register"
                onClick={registerUser}
              >
                Register
              </Button>
            </center>
          </Grid>
        </Grid>
      </Paper>

      <center>
        <Typography style={{ marginTop: 50 }} variant="subtitle1">
          Already have an account?
        </Typography>
        <Button
          size="small"
          variant="outlined"
          style={{
            color: '#1e565c',
            marginTop: 10
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
