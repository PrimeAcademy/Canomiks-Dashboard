
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

  return(<>
  <div>
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={ingredientName}>
        Ingredient Name*:
      </input>
      <input 
        type="text"
        value={lotNumber}>
        Lot# *:
      </input>

      <select 
        value={productFormat}
        onChange={(event) => setFormat(event.target.value)}
        >Product Format*:
          <option>Tincture</option>
          <option>Oil</option>
          <option>Other</option>
      </select>

      <select
        value={ingredientAmount}
        onChange={(event) => setAmount(event.target.value)}>
        Ingredient Amount*:
          <option></option>
          <select>
            <option>Grams</option>
            <option>Ounces</option>
          </select>
      </select>

      <input
        type="text"
        value={purity}
        onChange={(event) => setPurity(event.target.value)}>
          Purity(If Available)
      </input>

      <input 
        type="date"
        value={dateManufactured}
        onChange={(event) => setDate(event.target.value)}>
          Date Manufactured*
      </input>
      <input 
        type="text"
        value={extractionMethod}
        onChange={(event) => setMethod(event.target.value)}>
          Extraction Method:
      </input>
      <div>
        Growth Region
        <input 
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}>
          City:
        </input>

      </div>

      <input
        type="text"
        value={strain}
        onChange={(event) => setStrain(event.target.value)}>
        Strain Of Crop:
      </input>

        <select>Harvest Date</select>
      

      <input
        type="text"
        value={sustainability}
        onChange={(event) => setSustainability(event.target.value)}>
          Sustainability Info:
        </input>

        <button>Cancel Request</button>
        <button onClick={shipping}>Shipping Info</button>
        
    </form>
  </div>  
  
  </>)
}

export default AddSample;