import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import AddSampleFirst from './AddSampleFirst';
import AddSampleSecond from './AddSampleSecond';
import AddSampleThird from './AddSampleThird';

// Material UI imports
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Dialog,
  Button,
  Typography,
  Grid,
  Paper,
  Divider,
  Container,
} from '@material-ui/core';

function AddSample() {
  // functions from library to use
  const dispatch = useDispatch();
  const history = useHistory();

  /* Store Imports */
  const user = useSelector((store) => store.user);
  const currentSample = useSelector((store) => store.orders.currentSample);

  // get ids for company and order
  const companyID = user.companyID;
  const orderId = currentSample.id;
  // change date format on dates from store
  const newDateManufactured = moment
    .utc(currentSample.dateManufactured)
    .format('YYYY-MM-DD');
  const newHarvestDate = moment
    .utc(currentSample.harvestDate)
    .format('YYYY-MM-DD');

  /* Local State */
  const [currentInput, setCurrentInput] = useState('');

  // Dialogue button states
  const [open, setOpen] = useState(false);
  const [openShip, setOpenShip] = useState(false);

  const focusChange = (val) => {
    // TO DO - Make sure it has a value

    // Dispatch value and field name to update DB
    dispatch({
      type: 'UPDATE_SAMPLE_INFO',
      payload: {
        name: currentInput,
        value: val,
        companyID,
        orderId,
      },
    });
  }; // end focusChange

  const deleteRequest = (event) => {
    setOpen(false);

    // Delete the current sample
    if (companyID && orderId) {
      dispatch({
        type: 'DELETE_CURRENT_SAMPLE',
        payload: {
          companyID,
          orderId,
        },
      });
    }

    // go back to sample page
    history.push('/samples');
  }; // end cancelRequest

  const handleCancel = () => {
    setOpen(true);
  }; // end handleCancel

  const handleClose = () => {
    setOpen(false);
    setOpenShip(false);
  }; // end handleClose

  function enterInfo(inputValue) {
    // send to the reducer, no saga needed
    dispatch({
      type: 'UPDATE_CURRENT_SAMPLE',
      payload: {
        currentInputName: currentInput,
        newValue: inputValue,
      },
    });
  } // end enterInfo

  return (
    <Container maxWidth="md">
      <Paper style={{ padding: 17, marginBottom: 15 }}>
        <Typography variant="h1" align="center" gutterBottom>
          Sample Information
        </Typography>

        <center>
          <Divider style={{ maxWidth: '60%' }} />
        </center>

        <Grid
          container
          justify="center"
          alignItems="flex-start"
          spacing={3}
          style={{ marginTop: 15, marginBottom: 15 }}
        >
          <Grid item xs>
            <AddSampleFirst
              currentSample={currentSample}
              setCurrentInput={setCurrentInput}
              focusChange={focusChange}
              enterInfo={enterInfo}
            />
          </Grid>

          <Grid item xs>
            <AddSampleSecond
              currentSample={currentSample}
              setCurrentInput={setCurrentInput}
              focusChange={focusChange}
              enterInfo={enterInfo}
              newDateManufactured={newDateManufactured}
            />
          </Grid>

          <Grid item xs>
            <AddSampleThird
              currentSample={currentSample}
              setCurrentInput={setCurrentInput}
              focusChange={focusChange}
              enterInfo={enterInfo}
              newHarvestDate={newHarvestDate}
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid container justify="flex-end" alignItems="center" spacing={2}>
        <Grid item>
          <Button variant="outlined" color="primary" onClick={handleCancel}>
            Delete Request
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push('/sample/ship')}
          >
            Next : Shipping Info
          </Button>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete this sample?</DialogTitle>

        <DialogContent>
          <DialogContentText>This cannot be undone</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            size="small"
            variant="contained"
            onClick={deleteRequest}
            color="primary"
          >
            Yes
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={handleClose}
            color="primary"
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AddSample;
