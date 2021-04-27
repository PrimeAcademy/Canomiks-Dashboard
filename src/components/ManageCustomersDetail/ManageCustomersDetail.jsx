import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function ManageCustomersDetail({ clickedCustomer, handleClose }) {
  const dispatch = useDispatch();

  const [active, setActive] = useState(clickedCustomer.active);

  const toggleCompanyActive = (company) => {
    try {
      dispatch({
        type: 'TOGGLE_COMPANY_ACTIVE_STATUS',
        payload: {
          company,
          active,
        },
      });
      handleClose();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <DialogTitle id="view-details-slide-title">
        {clickedCustomer.companyName}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="view-details-slide-description">
          <p>{clickedCustomer.address}</p>
          <p>
            {clickedCustomer.city}, {clickedCustomer.state}{' '}
            {clickedCustomer.zip}
          </p>
        </DialogContentText>
      </DialogContent>
      <DialogTitle style={{ marginBottom: 0, paddingBottom: 0 }}>
        Contact:
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <p>Name: {clickedCustomer.name}</p>
          <p>Phone: {clickedCustomer.phoneNumber}</p>
          <p>
            Email:{' '}
            <a href={`mailto:${clickedCustomer.email}}`}>
              {clickedCustomer.email}
            </a>
          </p>
        </DialogContentText>
      </DialogContent>
      <Divider />
      <center>
        <DialogActions
          style={{
            justifyContent: 'center',
          }}
        >
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
          <Button
            onClick={() => toggleCompanyActive(clickedCustomer)}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </center>
    </>
  );
}

export default ManageCustomersDetail;
