
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AddSample.css';

// material ui imports 
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, MenuItem, FormHelperText, FormControl, 
  Select, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';



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
  // material ui
  const classes = useStyles();

  // set stuff so we can use them
  const dispatch = useDispatch();
  const history = useHistory();

  // get state from redux store
  const user = useSelector(store => store.user);

  // local states for input fields
  const [ingredientName, setName] = useState('');
  const [lotNumber, setLotNumber] = useState('');
  const [format, setFormat] = useState('');
  const [ingredientAmount, setAmount] = useState('');
  const [ingredientUnit, setIngredientUnit] = useState('');
  const [purity, setPurity] = useState('');
  const [dateManufactured, setDate] = useState('');
  const [extractionMethod, setMethod] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [sustainability, setSustainability] = useState('');
  const [cropStrain, setCropStrain] = useState('');

  // functions
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submit")
  };

  // on shipping button click
  const shipping = (event) => {
    event.preventDefault();
    console.log('shipping info');

    if (
      !ingredientName ||
      !lotNumber ||
      !format ||
      !ingredientAmount ||
      !dateManufactured ||
      !extractionMethod
    ) {
      alert("Please complete required inputs");
    } else {
      const companyID = user.companyID;
  
      dispatch({
        type: 'SEND_ORDER_INFO',
        payload: {
          companyID,
          ingredientName,
          ingredientAmount,
          ingredientUnit,
          format,
          purity,
          dateManufacture,
          lotNumber,
          extractionMethod,
          city,
          state,
          country,
          harvestDate,
          cropStrain,
          Sustainability,
          // orderId
        }
      })
    }
  }; // end shipping

  const cancel = (event) => {
    console.log("cancel")
    setName('');
    setLotNumber('');
    setFormat('');
    setPurity('');
    setDate('');
    setMethod('');
    setCity('');
    setState('');
    setCountry('');
    setCropStrain('');
    setHarvestDate('');
    setSustainability('');
  }; // end cancel


// text plugged into tooltips
  const nameText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;

const lotText =`Lot number`;
const formatText =`Format Text`;
const purityText = `Purity Text`;
const dateText = `Date Text`;
const extractionText = `Extraction Text`;
const regionText = `Region Text`;
const strainText =`Strain Text`;
const harvestDateText = `Harvest Text`;
const sustainabilityText = `Sustainability Text`;



  return (<>
    <div>
      <form onSubmit={handleSubmit}>
        <div>
            <TextField
                className={classes.inputs}
                required
                label='Ingredient Name'
                variant='filled'
                value={ingredientName} 
                type="text" 
                onChange={(event) => setName(event.target.value)}/> 
                {/* https://material-ui.com/components/tooltips/
                link to tooltips */}
            <Tooltip title={nameText}
              TransitionComponent={Zoom} 
              TransitionProps={{ timeout: 600 }}
              placement="right-start">
                {/* placement= popup display */}
              <Button className={classes.button}>
                <InfoIcon />
              </Button>
            </Tooltip>
        </div>
          
          {/* <input
            value={ingredientName}
            type="text"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}/> */}
        <div>
          

          <TextField
            className={classes.inputs}
            required
            label='Lot Number'
            variant='filled'
            value={lotNumber} 
            type="text" 
            onChange={(event) => setLotNumber(event.target.value)}/>
          <Tooltip title={lotText}
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 600 }}
            placement="right-start">
            <Button className={classes.button}>
              <InfoIcon />
            </Button>
        </Tooltip>
          {/* <input
            value={lotNumber}
            type="text"
            placeholder="Lot Number"
            onChange={(event) => setLotNumber(event.target.value)}
          /> */}
          
        </div>
        <div>
          <FormControl variant="filled" className={classes.formControl}>
            <Select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}>

              <MenuItem value="" disabled>
                Pick a Genre
              </MenuItem>
              <MenuItem value={'Powder'}>Powder</MenuItem>
              <MenuItem value={'Tincture'}>Tincture</MenuItem>
              <MenuItem value={'Oil'}>Oil</MenuItem>
              <MenuItem value={'Other'}>Other</MenuItem>
            </Select>
            <FormHelperText>Product Format</FormHelperText>
            </FormControl>
            <Tooltip title={formatText}
              TransitionComponent={Zoom} 
              TransitionProps={{ timeout: 600 }}
              placement="right-start">
              <Button className={classes.button}>
                <InfoIcon />
              </Button>
            </Tooltip>
          {/* <select
            value={format}
            onChange={(event) => setFormat(event.target.value)}
          >
            <option value="Powder">Powder</option>
            <option value="Tincture">Tincture</option>
            <option value="Oil">Oil</option>
            <option value="Other">Other</option>
          </select> */}
        </div>
        <div>
         <TextField
            className={classes.inputs}
            required
            label='Ingredient Amount'
            variant='filled'
            value={ingredientAmount} 
            type="text" 
            onChange={(event) => setAmount(event.target.value)}/>

            {/* <input
            value={ingredientAmount}
            onChange={(e) => setAmount(e.target.value)}
            type="number" /> */}

          <FormControl variant="filled" className={classes.formControl}>
            <Select
              value={ingredientUnit}
              onChange={(e) => setIngredientUnit(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}>

              <MenuItem value="" disabled>
                Pick a Genre
              </MenuItem>
              <MenuItem value={'Milligrams'}>Milligrams</MenuItem>
              <MenuItem value={'Grams'}>Grams</MenuItem>
              <MenuItem value={'Ounces'}>Ounces</MenuItem>
            </Select>
            <FormHelperText>Ingredient Unit</FormHelperText>
            </FormControl>
          <Tooltip title={formatText}
              TransitionComponent={Zoom} 
              TransitionProps={{ timeout: 600 }}
              placement="right-start">
              <Button className={classes.button}>
                <InfoIcon />
              </Button>
            </Tooltip>
          {/* <select
          value = {ingredientUnit}
          onChange={(event) => setIngredientUnit(e.target.value)}>
            <option value='Milligrams'>Milligrams</option>
            <option value="Grams">Grams</option>
            <option value="Ounces">Ounces</option>
          </select> */}
        </div>
        <div>
          <TextField
            className={classes.inputs}
            label='Purity (if available)'
            variant='filled'
            value={purity} 
            type="text" 
            onChange={(event) => setPurity(event.target.value)}/>
            <Tooltip title={purityText}
              TransitionComponent={Zoom} 
              TransitionProps={{ timeout: 600 }}
              placement="right-start">
              <Button className={classes.button}>
                <InfoIcon />
              </Button>
            </Tooltip>

            {/* <input
            type="text"
            value={purity}
            onChange={(event) => setPurity(event.target.value)} /> */}
        </div>

        <div>
          <TextField
            id="date"
            label="Date Manufactured"
            type="date"
            defaultValue="2021-01-01"
            className={classes.inputs}
            InputLabelProps={{
              shrink: true,
            }}/>
            <Tooltip title={dateText}
              TransitionComponent={Zoom} 
              TransitionProps={{ timeout: 600 }}
              placement="right-start">
              <Button className={classes.button}>
                <InfoIcon />
              </Button>
            </Tooltip>
          
            {/* <input
            type="date"
            value={dateManufactured}
            onChange={(event) => setDate(event.target.value)} /> */}
        </div>

        <div>
          <TextField
            className={classes.inputs}
            required
            label='Extraction Method'
            variant='filled'
            value={extractionMethod} 
            type="text" 
            onChange={(event) => setMethod(event.target.value)}/>
            <Tooltip title={extractionText}
              TransitionComponent={Zoom} 
              TransitionProps={{ timeout: 600 }}
              placement="right-start">
              <Button className={classes.button}>
                <InfoIcon />
              </Button>
            </Tooltip>

            {/* <input
            type="text"
            value={extractionMethod}
            onChange={(event) => setMethod(event.target.value)} /> */}
        </div>
        <div>
          <Typography variant='body1'> 
            Growth Region: 
            <Tooltip title={regionText}
              TransitionComponent={Zoom} 
              TransitionProps={{ timeout: 600 }}
              placement="right-start">
              <Button className={classes.button}>
                <InfoIcon />
              </Button>
            </Tooltip>
          </Typography>

          <TextField
            className={classes.inputs}
            required
            label='City'
            variant='filled'
            value={city} 
            type="text" 
            onChange={(event) => setCity(event.target.value)}/>
          
            {/* <input
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)} /> */}
          <TextField
            className={classes.inputs}
            required
            label='State'
            variant='filled'
            value={state} 
            type="text" 
            onChange={(event) => setState(event.target.value)}/>
              
              {/* <input
              type="text"
              value={state}
              onChange={(event) => setState(event.target.value)} /> */}

          <TextField
            className={classes.inputs}
            required
            label='Country'
            variant='filled'
            value={country} 
            type="text" 
            onChange={(event) => setCountry(event.target.value)}/>
              
              {/* <input
              type="text"
              value={country}
              onChange={(event) => setCountry(event.target.value)} /> */}
        </div>
        <div>

          <TextField
            className={classes.inputs}
            required
            label='Strain Of Crop'
            variant='filled'
            value={cropStrain} 
            type="text" 
            onChange={(event) => setCropStrain(event.target.value)}/>
            <Tooltip title={strainText}
              TransitionComponent={Zoom} 
              TransitionProps={{ timeout: 600 }}
              placement="right-start">
              <Button className={classes.button}>
                <InfoIcon />
              </Button>
            </Tooltip>
          
          {/* <input
            type="text"
            value={cropStrain}
            onChange={(event) => setCropStrain(event.target.value)} /> */}
        </div>

        <div>
          <TextField
            id="date"
            label="Harvest Date"
            type="date"
            defaultValue="2021-01-01"
            className={classes.inputs}
            InputLabelProps={{
              shrink: true,
            }}/>
            <Tooltip title={harvestDateText}
              TransitionComponent={Zoom} 
              TransitionProps={{ timeout: 600 }}
              placement="right-start">
              <Button className={classes.button}>
                <InfoIcon />
              </Button>
            </Tooltip>
        </div>
        {/* <div
          value={harvestDate}
          onChange={(event) => setHarvestDate(event.target.value)}>
          Harvest Date
          <input
            type="month" />
        </div> */}

        <div>
          <TextField
            className={classes.inputs}
            label='Sustainability Info:'
            variant='filled'
            value={sustainability} 
            type="text" 
            onChange={(event) => setSustainability(event.target.value)}/>
            <Tooltip title={sustainabilityText}
              TransitionComponent={Zoom} 
              TransitionProps={{ timeout: 600 }}
              placement="right-start">
              <Button className={classes.button}>
                <InfoIcon />
              </Button>
            </Tooltip>
          
        {/* <input
            value={sustainability}
            type="text"
            onChange={(event) => setSustainability(event.target.value)} /> */}

        </div>

        <Button 
        className={classes.inputs}
        style={{ backgroundColor: "#1e565c", color: "white" }}
        variant='contained'
        onClick={shipping}>
          Shipping Info
        </Button>

      </form>

      <Button 
      className={classes.inputs}
      style={{ backgroundColor: "#1e565c", color: "white" }}
      variant='contained'
      onClick={cancel}>
        Cancel Request
      </Button>

    </div>
  </>)
}

export default AddSample;