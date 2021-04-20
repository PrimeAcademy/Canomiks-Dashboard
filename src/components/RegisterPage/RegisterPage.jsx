import { useHistory } from 'react-router-dom';

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

function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <center>
      <Typography
        variant="h1"
        component="h1"
        style={{ maxWidth: '80%', fontSize: 60, fontWeight: 800 }}
      >
        Canomiks
      </Typography>

      <Paper className={classes.root}>
        <RegisterForm />
      </Paper>

      <Button
        style={{
          backgroundColor: '#1e565c',
          color: 'white',
        }}
        onClick={() => {
          history.push('/login');
        }}
      >
        Login
      </Button>
    </center>
  );
}

export default RegisterPage;
