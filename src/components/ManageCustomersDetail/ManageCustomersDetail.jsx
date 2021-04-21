import { Button, createMuiTheme, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, Switch, ThemeProvider } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const theme = createMuiTheme({
  overrides: {
    MuiSwitch: {
      switchBase: {
        // Controls default (unchecked) color for the thumb
        color: "#1e565c"
      },
      colorSecondary: {
        "&$checked": {
          // Controls checked color for the thumb
          color: "#1e565c"
        }
      },
      track: {
        // Controls default (unchecked) color for the track
        opacity: 0.2,
        backgroundColor: "#1e565c",
        "$checked$checked + &": {
          // Controls checked color for the track
          opacity: 0.7,
          backgroundColor: "#1e565c"
        }
      }
    }
  }
});

function ManageCustomersDetail({ clickedCustomer, handleClose }) {

  const dispatch = useDispatch();

  const [active, setActive] = useState(clickedCustomer.active);

  const toggleCompanyActive = (company) => {
    try {
      dispatch({
        type: 'TOGGLE_COMPANY_ACTIVE_STATUS',
        payload: {
          company,
          active
        }
      });
      handleClose();
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <DialogTitle id="view-details-slide-title">{clickedCustomer.companyName}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="view-details-slide-description">
          <p>{clickedCustomer.address}</p>
          <p>{clickedCustomer.city}, {clickedCustomer.state} {clickedCustomer.zip}</p>
        </DialogContentText>
      </DialogContent>
      <DialogTitle style={{ marginBottom: 0, paddingBottom: 0 }}>Contact:</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <p>Name: {clickedCustomer.name}</p>
          <p>Phone: {clickedCustomer.phoneNumber}</p>
          <p>Email: <a href={`mailto:${clickedCustomer.email}}`}>{clickedCustomer.email}</a></p>
        </DialogContentText>
      </DialogContent>
      <Divider />
      <center>
        <DialogActions>
          <FormControlLabel
            control={
              <Switch
                checked={active}
                onChange={(event, val) => setActive(val)}
                name="companyActiveStatus"
              />
            }
            label={active ? 'Active' : 'Inactive'}
          />
          <Button onClick={() => toggleCompanyActive(clickedCustomer)} variant="contained" style={{ backgroundColor: '#1e565c', color: 'white' }}>Confirm</Button>
        </DialogActions></center>
    </ThemeProvider>
  );
}

export default ManageCustomersDetail;
