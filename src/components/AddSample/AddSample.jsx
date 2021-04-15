import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


function AddSample() {
  // set stuff so we can use them
  const dispatch = useDispatch();
  const history = useHistory();
  // get state from redux store
  const user = useSelector(store => store.user);
  console.log(user);


  // local states for input fields
  const [ingredientName, setName] = useState('');
  const [lotNumber, setLotNumber] = useState(0);
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

  return (<>
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Ingredient Name*:
          <input
            value={ingredientName}
            type="text"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          Lot# *:
          <input
            value={lotNumber}
            type="text"
            placeholder="Lot Number"
            onChange={(event) => setLotNumber(event.target.value)}
          />
        </div>
        <div>
          Product Format*:
          <select
            value={format}
            onChange={(event) => setFormat(event.target.value)}
          >
            <option value="Powder">Powder</option>
            <option value="Tincture">Tincture</option>
            <option value="Oil">Oil</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          Ingredient Amount*:
            <input
            value={ingredientAmount}
            onChange={(e) => setAmount(e.target.value)}
            type="number" />

          <select
          value = {ingredientUnit}
          onChange={(event) => setIngredientUnit(e.target.value)}>
            <option value='Milligrams'>Milligrams</option>
            <option value="Grams">Grams</option>
            <option value="Ounces">Ounces</option>
          </select>
        </div>

        <div>
          Purity(If Available)
            <input
            type="text"
            value={purity}
            onChange={(event) => setPurity(event.target.value)} />
        </div>
        <div>
          Date Manufactured*
            <input
            type="date"
            value={dateManufactured}
            onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          Extraction Method*:
            <input
            type="text"
            value={extractionMethod}
            onChange={(event) => setMethod(event.target.value)} />
        </div>

        <div>
          Growth Region
          <div>
            City:
            <input
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)} />
              State:
              <input
              type="text"
              value={state}
              onChange={(event) => setState(event.target.value)} />
              Country:
              <input
              type="text"
              value={country}
              onChange={(event) => setCountry(event.target.value)} />
          </div>
        </div>
        <div>
          Strain Of Crop:
          <input
            type="text"
            value={cropStrain}
            onChange={(event) => setCropStrain(event.target.value)} />
        </div>
        <div
          value={harvestDate}
          onChange={(event) => setHarvestDate(event.target.value)}>
          Harvest Date
        <input
            type="month" />
        </div>
        <div>
          Sustainability Info:
        <input
            value={sustainability}
            type="text"
            onChange={(event) => setSustainability(event.target.value)} />
        </div>
        <button onClick={shipping}>Shipping Info</button>
      </form>
      <button onClick={cancel}>Cancel Request</button>
    </div>
  </>)
}

export default AddSample;