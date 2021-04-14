
import { useState } from 'react';

function AddSample() {
  const [ingredientName, setName] = useState('');
  const [lotNumber, setLotNumber] = useState(0);



  const submit = (event) => {
    event.preventDefault();
    console.log("form submit")
  }

  return(<>
  
  
  </>)
}

export default AddSample;