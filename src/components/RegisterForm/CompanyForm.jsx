import { Divider, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function CompanyForm(props) {
  const classes = useStyles();

  return (
    <form autoComplete="off" className={classes.root}>
      <Typography variant="h5" style={{ fontWeight: 600 }} gutterBottom>
        Company Information
      </Typography>

      <Divider />

      <div>
        <TextField
          label="Company Name"
          id="companyName"
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
          value={props.companyCity}
          onChange={(event) => props.setCompanyCity(event.target.value)}
          required
        />
      </div>

      <div>
        <TextField
          label="State"
          variant="standard"
          size="small"
          value={props.companyState}
          onChange={(event) => props.setCompanyState(event.target.value)}
          required
        />
      </div>

      <div>
        <TextField
          label="Zip Code"
          variant="standard"
          size="small"
          value={props.companyZip}
          onChange={(event) => props.setCompanyZip(event.target.value)}
          required
        />
      </div>
    </form>
  );
}

export default CompanyForm;
