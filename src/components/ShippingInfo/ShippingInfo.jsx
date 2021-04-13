import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';




function ShippingInfo(){
  const history = useHistory();
  const dispatch = useDispatch();

  const [shipDate, setDate] = useState('');
  const [carrier, setCarrier] = useState('');
  const [tracking, setTracking] = useState('');

    function handleSubmit(event){
      event.preventDefault()
      if(!shipDate || !carrier || !tracking){
        console.log("no inputs")
        alert("All inputs are required")
      }
      else{
        dispatch({
          type: 'ADD_ORDER',
          payload: {
            shipDate,
            carrier,
            tracking
          },
        });
        alert("Shipping Successful!")
        history.push("/dashboard")
      }

    }


    const continueLater = () => {
      console.log("continue later")
      alert("Order cannot be processed until shipping info entered")
    }

    const backBtn = () => {
      console.log("back button")
      history.push("/dashboard")
    }
    


    return(
        <>
        <form>
            <p> 
              These are the available shipping dates. 
              Samples cannot be processed until shipping info is filled out
            </p>
           <div>
              Date to be shipped: 
              <input 
                value={shipDate} 
                type="text" 
                placeholder="MM/DD/YY"
                onChange={(event) => setDate(event.target.value)}
              /> 
           </div>

           <div>
              Carrier: 
              <input 
                value={carrier} 
                type="text" 
                placeholder="Not Specified" 
                onChange={(event) => setCarrier(event.target.value)}
              />
            </div>

           <div> 
             Tracking Number: 
             <input 
              value={tracking} 
              type="text"
              onChange={(event) => setTracking(event.target.value)}
              /> 
           </div>

        </form>
        <span> 
          <button onClick={backBtn}> Back </button>
          <button onClick={continueLater}> Continue Later </button>
          <button onClick={handleSubmit}> Finalize</button>
        </span>
        </>

    )
}

export default ShippingInfo