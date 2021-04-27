import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material ui imports
import {
  makeStyles,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Paper,
  Container,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

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

    // clear the current sample store
    dispatch({
      type: 'CLEAR_CURRENT_SAMPLE',
    });

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
        newValue: inputValue,
      },
    });
  }

  return (
    <Container maxWidth="md">
      <Paper style={{ padding: 17, marginBottom: 15 }}>
        <Typography variant="h1" align="center" gutterBottom>
          Shipping Information
        </Typography>

        <center>
          <Divider style={{ maxWidth: '60%', marginBottom: 15 }} />
        </center>

        <form className={classes.root}>
          <Alert
            style={{ maxWidth: '100%', marginBottom: 20 }}
            severity="warning"
          >
            Orders can only be shipped on Monday, Tuesday, or Wednesday of the
            week and must be shipped over night or two day. Samples will not be
            processed until all shipping information is filled out.
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
              onChange={(event) =>
                enteredInput('carrierName', event.target.value)
              }
              required
            />
          </div>
          <div>
            <TextField
              label="Tracking Number"
              type="text"
              variant="standard"
              value={currentSample.trackingNumber}
              onChange={(event) =>
                enteredInput('trackingNumber', event.target.value)
              }
              required
            />
          </div>
        </form>
      </Paper>

      <Grid container justify="flex-end" alignItems="center" spacing={2}>
        <Grid item>
          <Button variant="outlined" color="primary" onClick={history.goBack}>
            Back
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenContinue}
          >
            Continue Later
          </Button>
        </Grid>

        <Grid item>
          <Button variant="contained" color="primary" onClick={handleOpenFinal}>
            Next : Finalize
          </Button>
        </Grid>
      </Grid>

      {/* Back Button Dialog */}
      <Dialog open={openBack} onClose={handleClose}>
        <DialogTitle>Are you sure?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Cancelling will erase all current inputs.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            No
          </Button>
          <Button
            onClick={() => history.push('./add')}
            variant="contained"
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Continue Later Dialog */}
      <Dialog open={openContinue} onClose={handleClose}>
        <DialogTitle>Continue Later?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Your Shipping information will not be saved.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            size="small"
            onClick={handleClose}
            color="primary"
            autoFocus
          >
            No
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => history.push('/samples')}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Finalize Dialog */}
      <Dialog open={openFinal} onClose={handleClose}>
        <DialogTitle>Are you sure you want to finalize?</DialogTitle>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            No
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={finalizeButton}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ShippingInfo;
