import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material ui imports
import { makeStyles, TextField, 
  Button, Typography } from '@material-ui/core';
// imports for dialog pop up
import { Dialog, DialogActions, 
  DialogContent, DialogTitle,
  DialogContentText } from '@material-ui/core';


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
  
  // Dialogues
  const [openBack, setBack] = React.useState(false);
  const [openContinue, setContinue] = useState(false);
  const [openFinal, setFinal] = useState(false);
  const [openShip, setOpenShip] = useState(false);

  const finalizeButton = (event) => {
    event.preventDefault();
    setFinal(false);
    // send dispatch to update order with shipping info
      dispatch({
        type: 'UPDATE_SHIPPING_INFO',
        payload: {
          shippedDate: currentSample.shippedDate,
          carrierName: currentSample.carrierName,
          trackingNumber: currentSample.trackingNumber,
          companyID: currentSample.companyID,
          orderId: currentSample.id,
        },
      });
      // TO DO - Change to styled alert
      alert('Shipping Successful!');

      // clear the current sample store
      dispatch({
        type: 'CLEAR_CURRENT_SAMPLE'
      })

      history.push('/samples');
  }; // end finalizeButton


  // dialogue functions
  const handleOpenContinue = () => {
    setContinue(true);
  };
  
  const handleBack = () => {
    setBack(true);
  };

  const handleOpenFinal = () => {
    setFinal(true);
  };
  
  const handleClose = () => {
    setBack(false);
    setOpenShip(false);
    setFinal(false);
    setContinue(false);
  };

  function enteredInput (inputKey, inputValue) {
    dispatch({
      type: 'UPDATE_CURRENT_SAMPLE',
      payload: {
        currentInputName: inputKey,
        newValue: inputValue
      },
    });
  }

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
              label="Date shipped"
              type="date"
              id="date"
              className={classes.inputs}
              InputLabelProps={{
                shrink: true,
              }}
              value={currentSample.shippedDate}
              onChange={(e) => enteredInput('shippedDate', e.target.value)}
            />
          </div>

          <div>
            <TextField
              label="Carrier"
              type="text"
              className={classes.inputs}
              variant="standard"
              value={currentSample.carrierName}
              onChange={(event) => enteredInput('carrierName', event.target.value)}
              required
            />
          </div>

          <div>
            <TextField
              label="Tracking Number"
              type="text"
              className={classes.inputs}
              variant="standard"
              value={currentSample.trackingNumber}
              onChange={(event) => enteredInput('trackingNumber', event.target.value)}
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
            Next: Finalize
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
                <Button onClick={finalizeButton} color="primary" autoFocus>
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
