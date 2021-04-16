import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// material ui imports 
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, MenuItem, FormHelperText, FormControl, 
  Select, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

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
  // material ui
  const classes = useStyles();

  // set stuff so we can use them
  const dispatch = useDispatch();
  const history = useHistory();

  // get state from redux store
  const user = useSelector(store => store.user);
  const companyID = user.companyID;
  const currentSample = useSelector(store => store.orders.currentSample);
  const orderId = currentSample.id;

  // local states for input fields
  const [ingredientName, setName] = useState('');
  const [lotNumber, setLotNumber] = useState('');
  const [format, setFormat] = useState('');
  const [ingredientAmount, setAmount] = useState('');
  const [ingredientUnit, setIngredientUnit] = useState('');
  const [purity, setPurity] = useState('');
  const [dateManufactured, setDateManufactured] = useState('');
  const [extractionMethod, setMethod] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [sustainabilityInfo, setSustainability] = useState('');
  const [cropStrain, setCropStrain] = useState('');
  const [currentInput, setCurrentInput] = useState('');

  // functions
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submit")
  };

  // on shipping button click
  const shipping = (event) => {
    event.preventDefault();
    // if no value alert user
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
      dispatch({
        type: 'ADD_SAMPLE_INFO',
        payload: {
          companyID,
          ingredientName,
          ingredientAmount,
          ingredientUnit,
          format,
          purity,
          dateManufactured,
          lotNumber,
          extractionMethod,
          city,
          state,
          country,
          harvestDate,
          cropStrain,
          sustainabilityInfo,
          orderId
        }
      }); // end dispatch
      history.push('/shipping');
    }; 
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

  function focusChange (val) {
    console.log('focus change', currentInput, val);
    dispatch({
      type: 'ADD_SAMPLE_INFO',
      payload: {
        name: currentInput,
        value: val,
        companyID,
        orderId
      }
    }); // end dispatch
  }; // end focusChange

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
              onFocus={() => setCurrentInput('ingredientName')}
              onBlur={() => focusChange(ingredientName)}
              className={classes.inputs}
              required
              label='Ingredient Name'
              variant='filled'
              value={ingredientName} 
              type="text" 
              onChange={(event) => setName(event.target.value)}/> 
              {/* https://material-ui.com/components/tooltips/
              reference to tooltips */}
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
          
          
        <div>
          <TextField
          onFocus={() => setCurrentInput('lotNumber')}
          onBlur={() => focusChange(lotNumber)}
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
          
        </div>
        <div>
          <FormControl variant="filled" className={classes.formControl}>
            <Select
              onFocus={() => setCurrentInput('format')}
              onBlur={() => focusChange(format)}
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
          
        </div>
        <div>
         <TextField
          onFocus={() => setCurrentInput('ingredientAmount')}
          onBlur={() => focusChange(ingredientAmount)}
          className={classes.inputs}
          required
          label='Ingredient Amount'
          variant='filled'
          value={ingredientAmount} 
          type="text" 
          onChange={(event) => setAmount(event.target.value)}/>

          <FormControl variant="filled" className={classes.formControl}>
            <Select
              onFocus={() => setCurrentInput('ingredientUnit')}
              onBlur={() => focusChange(ingredientUnit)}
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
          
        </div>
        <div>
          <TextField
            onFocus={() => setCurrentInput('purity')}
            onBlur={() => focusChange(purity)}
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
            
        </div>
        <div>
          <TextField
            onFocus={() => setCurrentInput('dateManufactured')}
            onBlur={() => focusChange(dateManufactured)}
            id="date"
            label="Date Manufactured"
            type="date"
            value={dateManufactured}
            defaultValue="2021-01-01"
            onChange={(e) => setDateManufactured(e.target.value)}
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
            
        </div>

        <div>
          <TextField
            onFocus={() => setCurrentInput('extractionMethod')}
            onBlur={() => focusChange(extractionMethod)}
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
            onFocus={() => setCurrentInput('city')}
            onBlur={() => focusChange(city)}
            className={classes.inputs}
            required
            label='City'
            variant='filled'
            value={city} 
            type="text" 
            onChange={(event) => setCity(event.target.value)}/>
            
          <TextField
            onFocus={() => setCurrentInput('state')}
            onBlur={() => focusChange(state)}
            className={classes.inputs}
            required
            label='State'
            variant='filled'
            value={state} 
            type="text" 
            onChange={(event) => setState(event.target.value)}/>
              
          <TextField
            onFocus={() => setCurrentInput('country')}
            onBlur={() => focusChange(country)}
            className={classes.inputs}
            required
            label='Country'
            variant='filled'
            value={country} 
            type="text" 
            onChange={(event) => setCountry(event.target.value)}/>      
              
        </div>
        <div>
          <TextField
            onFocus={() => setCurrentInput('cropStrain')}
            onBlur={() => focusChange(cropStrain)}
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
          
        </div>
        <div>
          <TextField
            onFocus={() => setCurrentInput('harvestDate')}
            onBlur={() => focusChange(harvestDate)}
            id="date"
            label="Harvest Date"
            value={harvestDate}
            type="date"
            defaultValue="2021-01-01"
            onChange={(e)=> setHarvestDate(e.target.value)}
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
        
        <div>
          <TextField
            onFocus={() => setCurrentInput('sustainabilityInfo')}
            onBlur={() => focusChange(sustainabilityInfo)}
            className={classes.inputs}
            label='Sustainability Info:'
            variant='filled'
            value={sustainabilityInfo} 
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