import { Divider, makeStyles, TextField, Typography } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function TeamLeadForm(props) {
  const classes = useStyles();

  /* Store Imports */
  const errors = useSelector((store) => store.errors);

  // function to make register faster for presentation
  // one for each section/component
  function presentationFormFill () {
    // auto fill with info
    props.setPhoneNumber('333651555');
    props.setTeamLeadName('Michael');
    props.setEmail('goldenRays@email.com');
    props.setPassword('password');
    props.setPasswordConfirm('password');
  }; // end presentationFormFill

  return (
    <>
      <form autoComplete="off" className={classes.root}>
        <Typography variant="h5" style={{ fontWeight: 600 }} gutterBottom>Team Lead Information</Typography>
        <Divider />
        <div>
          <TextField
            label="Phone Number"
            variant="standard"
            size="small"
            value={props.phoneNumber}
            onChange={() => presentationFormFill()}
            // onChange={(event) => props.setPhoneNumber(event.target.value)}
            required
          />
        </div>
        <div>
          <TextField
            label="Team Lead Name"
            variant="standard"
            size="small"
            value={props.teamLeadName}
            // onChange={(event) => props.setTeamLeadName(event.target.value)}
            required
          />
        </div>

        <div>
          <TextField
            label="Email"
            variant="standard"
            size="small"
            value={props.email}
            // onChange={(event) => props.setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <TextField
            label="Password"
            type="password"
            variant="standard"
            size="small"
            value={props.password}
            // onChange={(event) => props.setPassword(event.target.value)}
            required
          />
        </div>

        <div>
          <TextField
            label="Confirm Password"
            type="password"
            variant="standard"
            size="small"
            value={props.passwordConfirm}
            // onChange={(event) => props.setPasswordConfirm(event.target.value)}
            required
          />
        </div>
      </form>
    </>
  );
}

export default TeamLeadForm;
