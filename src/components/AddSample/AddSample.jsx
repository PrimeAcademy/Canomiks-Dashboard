
import { useState } from 'react';

function AddSample() {
  const [ingredientName, setName] = useState('');
  const [lotNumber, setLotNumber] = useState(0);
  const [productFormat, setFormat] = useState('');
  const [ingredientAmount, setAmount] = useState('');
  const [purity, setPurity] = useState('');
  const [dateManufactured, setDate] = useState('');
  const [extractionMethod, setMethod] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [sustainability, setSustainability] = useState('');
  const [strain, setStrain] = useState('');



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submit")
  }


  const shipping = (event) => {
    event.preventDefault();
    console.log('shipping info')
  }


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
    setStrain('');
    setHarvestDate('');
    setSustainability('');
  }

  return(<>
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
            value={productFormat}
            onChange={(event) => setFormat(event.target.value)}
            >
              <option value="Powder">Powder</option>
              <option value="Tincture">Tincture</option>
              <option value="Oil">Oil</option>
              <option value="Other">Other</option>
          </select>
          </div>

          <div
            value={ingredientAmount}
            onChange={(event) => setAmount(event.target.value)}>
            Ingredient Amount*:
            <input  
              type="number"/>
            <select>
              <option>Milligrams</option>
              <option>Grams</option>
              <option>Ounces</option>
            </select>
          </div>

          <div>
            Purity(If Available)
            <input
              type="text"
              value={purity}
              onChange={(event) => setPurity(event.target.value)}/>
          </div>
          <div>
            Date Manufactured*
            <input 
              type="date"
              value={dateManufactured}
              onChange={(event) => setDate(event.target.value)}/>
        </div>
        <div>
        Extraction Method*:
            <input 
              type="text"
              value={extractionMethod}
              onChange={(event) => setMethod(event.target.value)}/>
        </div>
     
      <div>
        Growth Region
        <div>
              City:
            <input 
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}/>
              State:
              <input 
              type="text"
              value={state}
              onChange={(event) => setState(event.target.value)}/>
              Country:
              <input 
              type="text"
              value={country}
              onChange={(event) => setCountry(event.target.value)}/>
          </div>
      </div>


      <div>
          Strain Of Crop:
          <input
            type="text"
            value={strain}
            onChange={(event) => setStrain(event.target.value)}/>
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
          onChange={(event) => setSustainability(event.target.value)}/>   
      </div>

        <button onClick={shipping}>Shipping Info</button>
    </form>
        <button onClick={cancel}>Cancel Request</button>
        
    
  </div>  
  
  </>)
}

export default AddSample;