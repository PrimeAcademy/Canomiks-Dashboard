import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

// imports for dialog pop up
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Typography,
  Grid,
  Tooltip,
  Fade,
} from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';

// material ui styling
const useStyles = makeStyles((theme) => ({
  inputs: {
    margin: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 180,
  },
}));

function AddSample() {
  // material ui style
  const classes = useStyles();
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
  const nameText = `
  Pick an ingredient from this menu. If your ingredient is not listed, please use the 'other' option. For more detailed instructions, refer to the instruction manual.`;
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

  const cancelRequest = (event) => {
    // Clear all inputs
    setName('');
    setLotNumber('');
    setFormat('');
    setPurity('');
    setDateManufactured('');
    setMethod('');
    setCity('');
    setAmount('');
    setState('');
    setCountry('');
    setCropStrain('');
    setHarvestDate('');
    setSustainability('');

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

  const handleOpenShipping = () => {
    setOpenShip(true);
  };

  const handleCancel = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenShip(false);
  };

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
    <>
      <Grid container justify="center" alignItems="flex-start">
        {/* Ingredient Name */}
        <FormControl variant="standard" className={classes.formControl}>
          <Select
            inputProps={{ 'aria-label': 'Without label' }}
            value={currentSample.ingredientName}
            onFocus={() => setCurrentInput('ingredientName')}
            onBlur={() => focusChange(currentSample.ingredientName)}
            onChange={(event) => enterInfo(event.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Pick Ingredient
            </MenuItem>
            <MenuItem value={'CBD'}>CBD</MenuItem>
            <MenuItem value={'Other'}>Other</MenuItem>
          </Select>
          <FormHelperText>Ingredient Name</FormHelperText>
        </FormControl>

        <Tooltip
          title={nameText}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="top-end"
        >
          <InfoOutlined />
        </Tooltip>

        {/* Lot Number */}
        <TextField
          label="Lot Number"
          type="text"
          className={classes.inputs}
          variant="standard"
          value={currentSample.lotNumber}
          onFocus={() => setCurrentInput('lotNumber')}
          onBlur={() => focusChange(currentSample.lotNumber)}
          onChange={(event) => enterInfo(event.target.value)}
          required
        />
        <Tooltip
          title={lotText}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="top-end"
        >
          <InfoOutlined />
        </Tooltip>

        {/* Ingredient Format */}
        <FormControl variant="standard" className={classes.formControl}>
          <Select
            inputProps={{ 'aria-label': 'Without label' }}
            value={currentSample.format}
            onFocus={() => setCurrentInput('format')}
            onBlur={() => focusChange(currentSample.format)}
            onChange={(e) => enterInfo(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Pick a Format
            </MenuItem>
            <MenuItem value={'Powder'}>Powder</MenuItem>
            <MenuItem value={'Tincture'}>Tincture</MenuItem>
            <MenuItem value={'Oil'}>Oil</MenuItem>
            <MenuItem value={'Other'}>Other</MenuItem>
          </Select>
          <FormHelperText>Product Format</FormHelperText>
        </FormControl>

        <Tooltip
          title={formatText}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="top-end"
        >
          <InfoOutlined />
        </Tooltip>
      </Grid>
      <Grid container justify="center" alignItems="flex-start">
        {/* Sample Amount */}
        <TextField
          label="Ingredient Amount"
          type="text"
          className={classes.inputs}
          variant="standard"
          value={currentSample.ingredientAmount}
          onFocus={() => setCurrentInput('ingredientAmount')}
          onBlur={() => focusChange(currentSample.ingredientAmount)}
          onChange={(event) => enterInfo(event.target.value)}
          required
        />

        <FormControl variant="standard" className={classes.formControl}>
          <Select
            inputProps={{ 'aria-label': 'Without label' }}
            value={currentSample.ingredientUnit}
            onFocus={() => setCurrentInput('ingredientUnit')}
            onBlur={() => focusChange(currentSample.ingredientUnit)}
            onChange={(e) => enterInfo(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Pick a Unit
            </MenuItem>
            <MenuItem value={'Milligrams'}>Milligrams</MenuItem>
            <MenuItem value={'Grams'}>Grams</MenuItem>
            <MenuItem value={'Ounces'}>Ounces</MenuItem>
          </Select>
          <FormHelperText>Ingredient Unit</FormHelperText>
        </FormControl>
        <Tooltip
          title={formatText}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="top-end"
        >
          <InfoOutlined />
        </Tooltip>

        {/* Purity */}
        <TextField
          label="Purity"
          type="text"
          className={classes.inputs}
          variant="standard"
          value={currentSample.purity}
          onFocus={() => setCurrentInput('purity')}
          onBlur={() => focusChange(currentSample.purity)}
          onChange={(event) => enterInfo(event.target.value)}
        />
        <Tooltip
          title={purityText}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="top-end"
        >
          <InfoOutlined />
        </Tooltip>
      </Grid>
      <Grid container justify="center" alignItems="flex-start">
        {/* Manufactured Date */}
        <TextField
          label="Date Manufactured"
          type="date"
          id="date"
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.inputs}
          value={newDateManufactured}
          onFocus={() => setCurrentInput('dateManufactured')}
          onBlur={() => focusChange(currentSample.dateManufactured)}
          onChange={(e) => enterInfo(e.target.value)}
        />

        <Tooltip
          title={dateText}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="top-end"
        >
          <InfoOutlined />
        </Tooltip>

        {/* Extraction Method */}
        <TextField
          onFocus={() => setCurrentInput('extractionMethod')}
          onBlur={() => focusChange(currentSample.extractionMethod)}
          className={classes.inputs}
          label="Extraction Method"
          variant="standard"
          value={currentSample.extractionMethod}
          type="text"
          onChange={(event) => enterInfo(event.target.value)}
          required
        />
        <Tooltip
          title={extractionText}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="top-end"
        >
          <InfoOutlined />
        </Tooltip>

        {/* Crop Strain */}
        <TextField
          className={classes.inputs}
          label="Strain Of Crop"
          variant="standard"
          type="text"
          value={currentSample.cropStrain}
          onFocus={() => setCurrentInput('cropStrain')}
          onBlur={() => focusChange(currentSample.cropStrain)}
          onChange={(event) => enterInfo(event.target.value)}
          required
        />
        <Tooltip
          title={strainText}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="top-end"
        >
          <InfoOutlined />
        </Tooltip>
      </Grid>
      <Grid container justify="center" alignItems="flex-start">
        {/* Growth Region */}
        <Typography variant="body1">Growth Region:</Typography>

        <TextField
          label="City"
          type="text"
          className={classes.inputs}
          variant="standard"
          value={currentSample.city}
          onFocus={() => setCurrentInput('city')}
          onBlur={() => focusChange(currentSample.city)}
          onChange={(event) => enterInfo(event.target.value)}
          required
        />

        <TextField
          label="State"
          type="text"
          className={classes.inputs}
          variant="standard"
          value={currentSample.state}
          onFocus={() => setCurrentInput('state')}
          onBlur={() => focusChange(currentSample.state)}
          onChange={(event) => enterInfo(event.target.value)}
          required
        />

        <TextField
          label="Country"
          type="text"
          className={classes.inputs}
          variant="standard"
          value={currentSample.country}
          onFocus={() => setCurrentInput('country')}
          onBlur={() => focusChange(currentSample.country)}
          onChange={(event) => enterInfo(event.target.value)}
          required
        />
        <Tooltip
          title={regionText}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="top-end"
        >
          <InfoOutlined />
        </Tooltip>
      </Grid>
      <Grid container justify="center" alignItems="flex-start">
        {/* Harvest Date */}
        <TextField
          label="Harvest Date"
          type="date"
          id="date"
          className={classes.inputs}
          InputLabelProps={{
            shrink: true,
          }}
          value={newHarvestDate}
          onFocus={() => setCurrentInput('harvestDate')}
          onBlur={() => focusChange(currentSample.harvestDate)}
          onChange={(e) => enterInfo(e.target.value)}
        />
        <Tooltip
          title={harvestDateText}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="top-end"
        >
          <InfoOutlined />
        </Tooltip>

        {/* Susatinability Info */}
        <TextField
          label="Sustainability Info"
          type="text"
          className={classes.inputs}
          variant="standard"
          value={currentSample.sustainabilityInfo}
          onFocus={() => setCurrentInput('sustainabilityInfo')}
          onBlur={() => focusChange(currentSample.sustainabilityInfo)}
          onChange={(event) => enterInfo(event.target.value)}
        />
        <Tooltip
          title={sustainabilityText}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="top-end"
        >
          <InfoOutlined />
        </Tooltip>
      </Grid>
      <Grid container justify="center" alignItems="flex-start">
        <div>
          <Button
            className={classes.inputs}
            style={{ backgroundColor: '#1e565c', color: 'white' }}
            variant="contained"
            color="primary"
            onClick={handleCancel}
          >
            Cancel Request
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Cancelling will erase all current inputs.
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                No
              </Button>
              <Button onClick={cancelRequest} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Button
            className={classes.inputs}
            style={{ backgroundColor: '#1e565c', color: 'white' }}
            variant="contained"
            color="primary"
            onClick={handleOpenShipping}
          >
            Shipping Info
          </Button>

          <Dialog open={openShip} onClose={handleClose}>
            <DialogTitle>Continue to Shipping?</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                No
              </Button>

              <Button
                onClick={() => history.push('/sample/ship')}
                color="primary"
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Grid>
    </>
  );
}

export default AddSample;
