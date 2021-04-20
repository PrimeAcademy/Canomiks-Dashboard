import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  /* Store Imports */
  const user = useSelector((store) => store.user);
  const currentSample = useSelector((store) => store.orders.currentSample);
  const companyID = user.companyID;
  const orderId = currentSample.id;

  /* Local State */
  const [ingredientName, setName] = useState(
    currentSample.ingredientName ? currentSample.ingredientName : ''
  );
  const [lotNumber, setLotNumber] = useState(currentSample.lotNumber);
  const [format, setFormat] = useState(
    currentSample.format ? currentSample.format : ''
  );
  const [ingredientAmount, setAmount] = useState(
    currentSample.ingredientAmount
  );
  const [ingredientUnit, setIngredientUnit] = useState(
    currentSample.ingredientUnit ? currentSample.ingredientUnit : ''
  );
  const [purity, setPurity] = useState(currentSample.purity);
  const [dateManufactured, setDateManufactured] = useState('');
  const [extractionMethod, setMethod] = useState(
    currentSample.extractionMethod
  );
  const [city, setCity] = useState(currentSample.city);
  const [state, setState] = useState(currentSample.state);
  const [country, setCountry] = useState(currentSample.country);
  const [harvestDate, setHarvestDate] = useState(currentSample.harvestDate);
  const [sustainabilityInfo, setSustainability] = useState(
    currentSample.sustainabilityInfo
  );
  const [cropStrain, setCropStrain] = useState(currentSample.cropStrain);
  const [currentInput, setCurrentInput] = useState('');

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

  const handleSubmit = () => {
    // Verify all required inputs are filled out
    //  If they aren't, alert the user and don't continue
    if (
      !ingredientName ||
      !ingredientAmount ||
      !format ||
      !dateManufactured ||
      !lotNumber ||
      !extractionMethod
      ) {
        // TO DO - Make this a styled modal
      alert('Please complete required inputs');

      return;
    }

    history.push('/sample/ship');
  }; // end handleSubmit

  const cancelRequest = (event) => {
    // TO DO - Add confirmation pop up
    // TO DO - Currently throwing errors for undefined values

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
    dispatch({
      type: 'DELETE_CURRENT_SAMPLE',
      payload: {
        companyID,
        orderId,
      },
    });
  }; // end cancelRequest



  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);

    handleSubmit;
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>      
      <Grid container justify="center" alignItems="flex-start">
        {/* Ingredient Name */}
        <FormControl variant="standard" className={classes.formControl}>
          <Select
            inputProps={{ 'aria-label': 'Without label' }}
            value={ingredientName}
            onFocus={() => setCurrentInput('ingredientName')}
            onBlur={() => focusChange(ingredientName)}
            onChange={(e) => setName(e.target.value)}
            displayEmpty
            required
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
          value={lotNumber}
          onFocus={() => setCurrentInput('lotNumber')}
          onBlur={() => focusChange(lotNumber)}
          onChange={(event) => setLotNumber(event.target.value)}
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
            value={format}
            onFocus={() => setCurrentInput('format')}
            onBlur={() => focusChange(format)}
            onChange={(e) => setFormat(e.target.value)}
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
          value={ingredientAmount}
          onFocus={() => setCurrentInput('ingredientAmount')}
          onBlur={() => focusChange(ingredientAmount)}
          onChange={(event) => setAmount(event.target.value)}
          required
        />

        <FormControl variant="standard" className={classes.formControl}>
          <Select
            inputProps={{ 'aria-label': 'Without label' }}
            value={ingredientUnit}
            onFocus={() => setCurrentInput('ingredientUnit')}
            onBlur={() => focusChange(ingredientUnit)}
            onChange={(e) => setIngredientUnit(e.target.value)}
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
          value={purity}
          onFocus={() => setCurrentInput('purity')}
          onBlur={() => focusChange(purity)}
          onChange={(event) => setPurity(event.target.value)}
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
          value={dateManufactured}
          onFocus={() => setCurrentInput('dateManufactured')}
          onBlur={() => focusChange(dateManufactured)}
          onChange={(e) => setDateManufactured(e.target.value)}
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
          onBlur={() => focusChange(extractionMethod)}
          className={classes.inputs}
          label="Extraction Method"
          variant="standard"
          value={extractionMethod}
          type="text"
          onChange={(event) => setMethod(event.target.value)}
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
          value={cropStrain}
          onFocus={() => setCurrentInput('cropStrain')}
          onBlur={() => focusChange(cropStrain)}
          onChange={(event) => setCropStrain(event.target.value)}
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
          value={city}
          onFocus={() => setCurrentInput('city')}
          onBlur={() => focusChange(city)}
          onChange={(event) => setCity(event.target.value)}
          required
        />

        <TextField
          label="State"
          type="text"
          className={classes.inputs}
          variant="standard"
          value={state}
          onFocus={() => setCurrentInput('state')}
          onBlur={() => focusChange(state)}
          onChange={(event) => setState(event.target.value)}
          required
        />

        <TextField
          label="Country"
          type="text"
          className={classes.inputs}
          variant="standard"
          value={country}
          onFocus={() => setCurrentInput('country')}
          onBlur={() => focusChange(country)}
          onChange={(event) => setCountry(event.target.value)}
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
          value={harvestDate}
          onFocus={() => setCurrentInput('harvestDate')}
          onBlur={() => focusChange(harvestDate)}
          onChange={(e) => setHarvestDate(e.target.value)}
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
          value={sustainabilityInfo}
          onFocus={() => setCurrentInput('sustainabilityInfo')}
          onBlur={() => focusChange(sustainabilityInfo)}
          onChange={(event) => setSustainability(event.target.value)}
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

      {/* Buttons */}
      <Grid container justify="center" alignItems="flex-start">
        {/* <Button
          className={classes.inputs}
          style={{ backgroundColor: '#1e565c', color: 'white' }}
          variant="contained"
          onClick={handleSubmit}
        >
          Old Shipping Info
        </Button> */}

 
        <div>
          <Button 
              className={classes.inputs}
              style={{ backgroundColor: '#1e565c', color: 'white' }}
              variant="contained" 
              color="primary" 
              onClick={handleClickOpen}>
            Shipping Info
          </Button>
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                Continue to Shipping?
              </DialogTitle>
              <DialogContent>
                  {/*
                <DialogContentText>
                   Do you do coding ?
                </DialogContentText> */}
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


        {/* <div>
          <Button 
              className={classes.inputs}
              style={{ backgroundColor: '#1e565c', color: 'white' }}
              variant="contained" 
              color="primary" 
              onClick={handleClickOpen}>
            Cancel Request
          </Button>
          <Dialog open={open} onClose={handleClose}>
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
                <Button onClick={cancelRequest} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
          </Dialog>
        </div> */}
      </Grid>
    </>
  );
}

export default AddSample;
