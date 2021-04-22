import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material ui imports
import { makeStyles, TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Paper, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e565c',
      light: '#26AB6E',
      dark: '#1e565c'
    },
    secondary: {
      main: '#0044ff',
      light: '#01689b',
      contrastText: '#ffcc00',
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: 'black',
      },
    },
  }
});

function ShippingInfo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  /* Store Imports */
  const currentSample = useSelector((store) => store.orders.currentSample);

  // Dialogues
  const [openBack, setBack] = useState(false);
  const [openContinue, setContinue] = useState(false);
  const [openFinal, setFinal] = useState(false);

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

  const handleOpenFinal = () => {
    setFinal(true);
  };

  const handleClose = () => {
    setBack(false);
    setFinal(false);
    setContinue(false);
  };

  function enteredInput(inputKey, inputValue) {
    dispatch({
      type: 'UPDATE_CURRENT_SAMPLE',
      payload: {
        currentInputName: inputKey,
        newValue: inputValue
      },
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <center>
        <Paper style={{ margin: 50, padding: 17, maxWidth: 'fit-content' }}>
          <form className={classes.root}>
            <Alert style={{ maxWidth: '50%', marginBottom: 20 }} severity="warning">
              These are the available shipping dates. Samples cannot be processed
              until shipping info is filled out
          </Alert>
            <div>
              <TextField
                label="Date shipped"
                type="date"
                id="date"
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
                variant="standard"
                value={currentSample.trackingNumber}
                onChange={(event) => enteredInput('trackingNumber', event.target.value)}
                required
              />
            </div>
          </form>
        </Paper>

        <div>
          <Button
            style={{ backgroundColor: '#1e565c', color: 'white', margin: 25 }}
            variant="contained"
            color="primary"
            onClick={history.goBack}>
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
              <Button onClick={() => history.push('./add')} color="primary" autoFocus>
                Yes
                </Button>
            </DialogActions>
          </Dialog>

          <Button
            style={{ backgroundColor: '#1e565c', color: 'white', margin: 25 }}
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
            style={{ backgroundColor: '#1e565c', color: 'white', margin: 25 }}
            variant="contained"
            color="primary"
            onClick={handleOpenFinal}>
            Next : Finalize
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
    </ThemeProvider>
  );
}

export default ShippingInfo;
