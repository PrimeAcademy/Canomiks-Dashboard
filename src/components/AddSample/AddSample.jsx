
import { useState } from 'react';

function AddSample() {
  const [ingredientName, setName] = useState('');
  const [lotNumber, setLotNumber] = useState(0);



  const submit = (event) => {
    event.preventDefault();
    console.log("form submit")
  }

  return(<>
  <div>
    <form>
      <input 
        value={ingredientName}
        type="text">
        Ingredient Name*
      </input>
      <input 
        value={lotNumber}
        type="text">
          Lot# *
      </input>
    </form>
  </div>  
  
  </>)
}

export default AddSample;