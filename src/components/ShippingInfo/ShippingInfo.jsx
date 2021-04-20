import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';
// imports for dialog pop up
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';


const useStyles = makeStyles((theme) => ({
  inputs: {
    margin: theme.spacing(2),
  },
}));

function ShippingInfo() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  /* Store Imports */
  const currentSample = useSelector((store) => store.orders.currentSample);
  const orderId = currentSample.id;
  const companyID = currentSample.companyID;

  // Dialogues
  const [openBack, setBack] = React.useState(false);
  const [openContinue, setContinue] = useState(false);
  const [openFinal, setFinal] = useState(false);
  const [openShip, setOpenShip] = useState(false);

  
  /* Local State */
  const [carrierName, setCarrierName] = useState(currentSample.carrierName);
  const [trackingNumber, setTrackingNumber] = useState(
    currentSample.trackingNumber
  );
  const [shippedDate, setDate] = useState(currentSample.shippedDate);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFinal(false);

    if (!shippedDate || !carrierName || !trackingNumber) {
      // TO DO - Change to styled alert
      alert('All inputs are required');
      return;
    } else {
      dispatch({
        type: 'UPDATE_SHIPPING_INFO',
        payload: {
          shippedDate,
          carrierName,
          trackingNumber,
          companyID,
          orderId,
        },
      });

      // TO DO - Change to styled alert
      alert('Shipping Successful!');

      history.push('/samples');
    }
  }; // end handleSubmit

  // end continueLaterButton

  // dialogue functions
  const handleOpenContinue = () => {
    setContinue(true);
  }
  
  const handleBack = () => {
    setBack(true);
  };

  const handleOpenFinal = () => {
    setFinal(true);
  }
  
  const handleClose = () => {
    setBack(false);
    setOpenShip(false);
    setFinal(false);
    setContinue(false);
  };
  return (
    <>
      <center>
        <form>
          <Typography variant="body1">
            These are the available shipping dates. Samples cannot be processed
            until shipping info is filled out
          </Typography>
          <div>
            <TextField
              label="Date to be shipped"
              type="date"
              id="date"
              className={classes.inputs}
              InputLabelProps={{
                shrink: true,
              }}
              value={shippedDate}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <TextField
              label="Carrier"
              type="text"
              className={classes.inputs}
              variant="standard"
              value={carrierName}
              onChange={(event) => setCarrierName(event.target.value)}
              required
            />
          </div>

          <div>
            <TextField
              label="Tracking Number"
              type="text"
              className={classes.inputs}
              variant="standard"
              value={trackingNumber}
              onChange={(event) => setTrackingNumber(event.target.value)}
              required
            />
          </div>
        </form>

        <div>
          <Button 
              className={classes.inputs}
              style={{ backgroundColor: '#1e565c', color: 'white' }}
              variant="contained" 
              color="primary" 
              onClick={handleBack}>
            Back
          </Button>
          <Dialog open={openBack} onClose={handleClose}>
              <DialogTitle>
                Are you sure?
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Cancelling will erase all current inputs.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  No
                </Button>
                <Button onClick= {() => history.push('./add')} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
          </Dialog>
      
          <Button 
              className={classes.inputs}
              style={{ backgroundColor: '#1e565c', color: 'white' }}
              variant="contained" 
              color="primary" 
              onClick={handleOpenContinue}>
            Continue Later
          </Button>
          <Dialog open={openContinue} onClose={handleClose}>
              <DialogTitle>
                Continue Later?
              </DialogTitle>
              <DialogContent>
              <DialogContentText>
                  Your progress will not be saved.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  No
                </Button>
                <Button onClick={() => history.push('/samples')} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
          </Dialog>

           <Button 
              className={classes.inputs}
              style={{ backgroundColor: '#1e565c', color: 'white' }}
              variant="contained" 
              color="primary" 
              onClick={handleOpenFinal}>
            Finalize
          </Button>
          <Dialog open={openFinal} onClose={handleClose}>
              <DialogTitle>
                Are you sure you want to finalize?
              </DialogTitle>
              <DialogContent>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  No
                </Button>
                <Button onClick={handleSubmit} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
          </Dialog>
        </div> 
      </center>
    </>
  );
}

export default ShippingInfo;
