import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

  // material ui imports 
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, MenuItem, FormHelperText, FormControl, 
  Select, Typography } from '@material-ui/core';

// material ui styling
const useStyles = makeStyles((theme) => ({
  inputs: {
   margin: theme.spacing(2),
  },
}));

function ShippingInfo () {
  // material ui
  const classes = useStyles();

  // set functions for use
  const history = useHistory();
  const dispatch = useDispatch();

  // get state from store
  const currentSample = useSelector(store => store.orders.currentSample);
  const orderId = currentSample.id;
  const companyID = currentSample.companyID

  // local state
  const [carrierName, setCarrierName] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('')
  const [shippedDate, setDate] = useState('');

  function finalizeButton(event) {
    event.preventDefault()
    if (!shippedDate || !carrierName || !trackingNumber) {
      alert("All inputs are required");
      return;
    }
    else {
      dispatch({
        type: 'ADD_SHIPPING_INFO',
        payload: {
          shippedDate,
          carrierName,
          trackingNumber,
          companyID,
          orderId
        },
      });
      alert("Shipping Successful!");
      history.push("/samples")
    }
  }; // end handleSubmit 

  const backBtn = () => {
    console.log("back button");
    history.push("/addSample");
  }; // end backBtn

  function continueLaterButton(event) {
    event.preventDefault();
    alert("Sample cannot be processed until shipping information is entered");
    history.push("/");
  }; // end handleContinue

  return (
    <>
      <center>
        <form>
          <Typography variant='body1'>
            These are the available shipping dates.
            Samples cannot be processed until shipping info is filled out
            </Typography>
          <div>
            <TextField
              id="date"
              label="Date to be shipped:"
              type="date"
              value={shippedDate}
              className={classes.inputs}
              defaultValue="2021-01-01"
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}/>
          </div>
          <div>
            <TextField
              className={classes.inputs}
              required
              label='Carrier:'
              variant='filled'
              value={carrierName} 
              type="text" 
              onChange={(event) => setCarrierName(event.target.value)}/>
          </div>
          <div>
            <TextField
              className={classes.inputs}
              required
              label='Tracking Number:'
              variant='filled'
              value={trackingNumber} 
              type="text" 
              onChange={(event) => setTrackingNumber(event.target.value)}/>
          </div>
        </form>
        <span>
          <Button 
          className={classes.inputs}
          style={{ backgroundColor: "#1e565c", color: "white" }}
          variant='contained'
          onClick={backBtn}> 
            Back 
          </Button>

          <Button 
          className={classes.inputs}
          style={{ backgroundColor: "#1e565c", color: "white" }}
          variant='contained'
          onClick={continueLaterButton}>
            Continue Later
           </Button>

          <Button 
          className={classes.inputs}
          style={{ backgroundColor: "#1e565c", color: "white" }}
          variant='contained'
          onClick={finalizeButton}> 
            Finalize
          </Button>

        </span>
      </center>
    </>
  )
}; // end shippingInfo


export default ShippingInfo;