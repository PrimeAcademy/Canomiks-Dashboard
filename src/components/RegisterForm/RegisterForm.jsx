import { Divider, makeStyles, Switch, TextField, Typography } from '@material-ui/core';

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

function RegisterForm(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  /* Store Imports */
  const errors = useSelector((store) => store.errors);

  return (
    <form autoComplete="off" className={classes.root}>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <Typography variant="h5" style={{ fontWeight: 600 }} gutterBottom>Company Information</Typography>
      <Divider />
      <div>
        <TextField
          label="Company Name"
          id="companyName"
          className={classes.textField}
          variant="standard"
          size="small"
          value={props.companyName}
          onChange={(event) => props.setCompanyName(event.target.value)}
          required
        />
      </div>
      <div>
        <TextField
          label="Street Address"
          id="address"
          variant="standard"
          size="small"
          value={props.companyAddress}
          onChange={(event) => props.setCompanyAddress(event.target.value)}
          required
        />
      </div>

      <div>
        <TextField
          label="City"
          variant="standard"
          size="small"
          value={props.city}
          onChange={(event) => props.setCity(event.target.value)}
          required
        />
      </div>

      <div>
        <TextField
          label="State"
          variant="standard"
          size="small"
          value={props.state}
          onChange={(event) => props.setState(event.target.value)}
          required
        />
      </div>

      <div>
        <TextField
          label="Zip Code"
          variant="standard"
          size="small"
          value={props.zip}
          onChange={(event) => props.setZip(event.target.value)}
          required
        />
      </div>
    </form>
  );
}

export default RegisterForm;
