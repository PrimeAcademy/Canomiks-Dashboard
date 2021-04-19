import { useHistory } from 'react-router-dom';
import './LandingPage.css';

import RegisterForm from '../RegisterForm/RegisterForm';

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

function LandingPage() {
  const classes = useStyles();
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  }; // end onLogin

  return (
    <center>
      <Typography
        variant="h1"
        style={{ maxWidth: '80%', fontSize: 60, fontWeight: 800 }}
        component="h1"
      >
        Canomiks
      </Typography>

      <Paper className={classes.root}>
        <RegisterForm />
      </Paper>

      <Typography>Already have an account?</Typography>
      <Button
        style={{
          backgroundColor: '#1e565c',
          color: 'white',
          marginTop: 5,
        }}
        onClick={onLogin}
      >
        Login
      </Button>
    </center>
  );
}

export default LandingPage;
