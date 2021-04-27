import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import AddSampleFirst from './AddSampleFirst';
import AddSampleSecond from './AddSampleSecond';
import AddSampleThird from './AddSampleThird';

// Material UI imports
import {
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Dialog,
  Button,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Typography,
  Grid,
  Paper,
  Divider,
  Fade,
  Tooltip,
  Container,
  InputAdornment,
} from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';

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

  /* Tool Tip Test */
  const nameText = `Pick an ingredient from this menu. If your ingredient is not listed, please use the 'other' option. For more detailed instructions, refer to the instruction manual.`;
  const lotText = `Please use the lot number you have created for this batch. For more detailed instructions, refer to the instruction manual.`;
  const formatText = `Select the proper ingredient format. For more detailed instructions, please refer to the instruction manual.`;
  const purityText = `Add percent purity of the active ingredient if known. For more detailed instructions, please refer to the instruction manual.`;
  const dateText = `Add the date that the ingredient was extracted or manufactured. For more detailed instructions, please refer to the instruction manual.`;
  const extractionText = `Add the extraction method such as ethanol, water etc. for the extraction of the ingredient. If no extraction method was used, please write the concentrator method for the ingredient. For more detailed instructions, please refer to the instruction manual.`;
  const regionText = `If known please add the region where the plant was grown. If ingredient was extracted from plants grown in more than one region, please write that in the blank space.`;
  const strainText = `If known please add the exact strain of the crop.`;
  const harvestDateText = `When was the plant harvested?`;
  const sustainabilityText = `Add information about sustainability such as fair trade, water conservation practices for the crop, sustainability certifications here.`;

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
