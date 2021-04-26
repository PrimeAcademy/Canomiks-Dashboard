import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

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
  makeStyles,
  Tooltip,
  Container,
} from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function AddSample() {
  // functions from library to use
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

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
    // Clear all inputs

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
    <Container maxWidth="md">
      <Paper style={{ padding: 17, marginBottom: 15 }}>
        <Typography variant="h1" align="center" gutterBottom>
          Sample Information
        </Typography>

        <center>
          <Divider style={{ maxWidth: '60%' }} />
        </center>

        <form className={classes.root}>
          <Grid
            container
            justify="center"
            alignItems="flex-start"
            spacing={3}
            style={{ marginTop: 15, marginBottom: 15 }}
          >
            <Grid item xs>
              <Paper style={{ padding: 17, maxWidth: 'fit-content' }}>
                {/* Ingredient Name */}
                <div>
                  <FormControl variant="standard">
                    <Select
                      inputProps={{ 'aria-label': 'Without label' }}
                      value={currentSample.ingredientName}
                      onFocus={() => setCurrentInput('ingredientName')}
                      onBlur={() => focusChange(currentSample.ingredientName)}
                      onChange={(event) => enterInfo(event.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Ingredient Name
                      </MenuItem>
                      <MenuItem value={'CBD'}>CBD</MenuItem>
                      <MenuItem value={'Other'}>Other</MenuItem>
                    </Select>
                    <FormHelperText>Ingredient Name</FormHelperText>
                  </FormControl>
                  <Tooltip
                    arrow
                    title={nameText}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    placement="top"
                  >
                    <InfoOutlined />
                  </Tooltip>
                </div>

                {/* Lot Number */}
                <div>
                  <FormControl variant="standard">
                    <TextField
                      label="Lot Number"
                      type="text"
                      variant="standard"
                      value={currentSample.lotNumber}
                      onFocus={() => setCurrentInput('lotNumber')}
                      onBlur={() => focusChange(currentSample.lotNumber)}
                      onChange={(event) => enterInfo(event.target.value)}
                      required
                    />
                  </FormControl>
                  <Tooltip
                    arrow
                    title={lotText}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    placement="top-end"
                  >
                    <InfoOutlined />
                  </Tooltip>
                </div>

                {/* Ingredient Format */}
                <div>
                  <FormControl variant="standard">
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
                    arrow
                    title={formatText}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    placement="top-end"
                  >
                    <InfoOutlined />
                  </Tooltip>
                </div>
                <div>
                  {/* Sample Amount */}
                  <TextField
                    label="Ingredient Amount"
                    type="text"
                    variant="standard"
                    value={currentSample.ingredientAmount}
                    onFocus={() => setCurrentInput('ingredientAmount')}
                    onBlur={() => focusChange(currentSample.ingredientAmount)}
                    onChange={(event) => enterInfo(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <FormControl variant="standard">
                    <Select
                      inputProps={{ 'aria-label': 'Without label' }}
                      value={currentSample.ingredientUnit}
                      onFocus={() => setCurrentInput('ingredientUnit')}
                      onBlur={() => focusChange(currentSample.ingredientUnit)}
                      onChange={(e) => enterInfo(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Unit
                      </MenuItem>
                      <MenuItem value={'Milligrams'}>Milligrams</MenuItem>
                      <MenuItem value={'Grams'}>Grams</MenuItem>
                      <MenuItem value={'Ounces'}>Ounces</MenuItem>
                    </Select>
                    <FormHelperText>Ingredient Unit</FormHelperText>
                  </FormControl>
                  <Tooltip
                    arrow
                    title={formatText}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    placement="top-end"
                  >
                    <InfoOutlined />
                  </Tooltip>
                </div>
                <div>
                  {/* Purity */}
                  <TextField
                    label="Purity"
                    type="text"
                    variant="standard"
                    value={currentSample.purity}
                    onFocus={() => setCurrentInput('purity')}
                    onBlur={() => focusChange(currentSample.purity)}
                    onChange={(event) => enterInfo(event.target.value)}
                  />
                  <Tooltip
                    arrow
                    title={purityText}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    placement="top-end"
                  >
                    <InfoOutlined />
                  </Tooltip>
                </div>
              </Paper>
            </Grid>

            <Grid item xs>
              <Paper style={{ padding: 17, maxWidth: 'fit-content' }}>
                <div>
                  {/* Manufactured Date */}
                  <TextField
                    label="Date Manufactured"
                    type="date"
                    id="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={newDateManufactured}
                    onFocus={() => setCurrentInput('dateManufactured')}
                    onBlur={() => focusChange(currentSample.dateManufactured)}
                    onChange={(e) => enterInfo(e.target.value)}
                  />
                  <Tooltip
                    arrow
                    title={dateText}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    placement="top-end"
                  >
                    <InfoOutlined />
                  </Tooltip>
                </div>
                <div>
                  {/* Extraction Method */}
                  <TextField
                    onFocus={() => setCurrentInput('extractionMethod')}
                    onBlur={() => focusChange(currentSample.extractionMethod)}
                    label="Extraction Method"
                    variant="standard"
                    value={currentSample.extractionMethod}
                    type="text"
                    onChange={(event) => enterInfo(event.target.value)}
                    required
                  />
                  <Tooltip
                    arrow
                    title={extractionText}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    placement="top-end"
                  >
                    <InfoOutlined />
                  </Tooltip>
                </div>
                <div>
                  {/* Crop Strain */}
                  <TextField
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
                    arrow
                    title={strainText}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    placement="top-end"
                  >
                    <InfoOutlined />
                  </Tooltip>
                </div>
              </Paper>
            </Grid>

            <Grid item xs>
              <Paper style={{ padding: 17, maxWidth: 'fit-content' }}>
                {/* Growth Region */}
                <Typography variant="body1">
                  Growth Region:
                  <Tooltip
                    arrow
                    title={regionText}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    placement="top-end"
                  >
                    <InfoOutlined />
                  </Tooltip>
                </Typography>
                <div>
                  <TextField
                    label="City"
                    type="text"
                    variant="standard"
                    value={currentSample.city}
                    onFocus={() => setCurrentInput('city')}
                    onBlur={() => focusChange(currentSample.city)}
                    onChange={(event) => enterInfo(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <TextField
                    label="State"
                    type="text"
                    variant="standard"
                    value={currentSample.state}
                    onFocus={() => setCurrentInput('state')}
                    onBlur={() => focusChange(currentSample.state)}
                    onChange={(event) => enterInfo(event.target.value)}
                    required
                  />
                </div>

                <div>
                  <TextField
                    label="Country"
                    type="text"
                    variant="standard"
                    value={currentSample.country}
                    onFocus={() => setCurrentInput('country')}
                    onBlur={() => focusChange(currentSample.country)}
                    onChange={(event) => enterInfo(event.target.value)}
                    required
                  />
                </div>

                <div>
                  {/* Harvest Date */}
                  <TextField
                    label="Harvest Date"
                    type="date"
                    id="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={newHarvestDate}
                    onFocus={() => setCurrentInput('harvestDate')}
                    onBlur={() => focusChange(currentSample.harvestDate)}
                    onChange={(e) => enterInfo(e.target.value)}
                  />
                  <Tooltip
                    arrow
                    title={harvestDateText}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    placement="top-end"
                  >
                    <InfoOutlined />
                  </Tooltip>
                </div>

                <div>
                  {/* Sustainability Info */}
                  <TextField
                    label="Sustainability Info"
                    type="text"
                    variant="standard"
                    value={currentSample.sustainabilityInfo}
                    onFocus={() => setCurrentInput('sustainabilityInfo')}
                    onBlur={() => focusChange(currentSample.sustainabilityInfo)}
                    onChange={(event) => enterInfo(event.target.value)}
                  />
                  <Tooltip
                    arrow
                    title={sustainabilityText}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    placement="top-end"
                  >
                    <InfoOutlined />
                  </Tooltip>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </form>
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
