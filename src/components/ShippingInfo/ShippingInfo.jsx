import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';




function ShippingInfo(){
  const history = useHistory();
  const dispatch = useDispatch();

  const [shippedDate, setDate] = useState('');
  const [carrierName, setCarrier] = useState('');
  const [trackingNumber, setTracking] = useState('');

    function handleSubmit(event){
      event.preventDefault()
      if(!shippedDate || !carrierName || !trackingNumber){
        console.log("no inputs")
        alert("All inputs are required")
      }
      else{
        dispatch({
          type: 'ADD_ORDER',
          payload: {
            shippedDate,
            carrierName,
            trackingNumber
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
      history.push("/samples")
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
                value={shippedDate} 
                type="text" 
                placeholder="MM/DD/YY"
                onChange={(event) => setDate(event.target.value)}
              /> 
           </div>

           <div>
              Carrier: 
              <input 
                value={carrierName} 
                type="text" 
                placeholder="Not Specified" 
                onChange={(event) => setCarrier(event.target.value)}
              />
            </div>

           <div> 
             Tracking Number: 
             <input 
              value={trackingNumber} 
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