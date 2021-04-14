import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';


function ShippingInfo(){
  const history = useHistory();
  const dispatch = useDispatch();
  const [carrierName, setCarrierName] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('')
  const [shippedDate, setDate] = useState('');

  function handleSubmit(event) {
    event.preventDefault()
    if (!shippedDate || !carrierName || !trackingNumber) {
      console.log("no inputs")
      alert("All inputs are required")
    }
    else {
      dispatch({
        type: 'SET_SHIPPING',
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

  const backBtn = () => {
    console.log("back button")
    history.push("/addSamples")
  }

  function handleContinue(event) {
    event.preventDefault();
    alert("Sample cannot be processed until shipping information is entered")
    history.push("/")
  }


  return (
    <>
      <center>
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
              onChange={(event) => setCarrierName(event.target.value)}
            />
          </div>

          <div>
            Tracking Number:
             <input
              value={trackingNumber}
              type="text"
              onChange={(event) => setTrackingNumber(event.target.value)}
            />
          </div>
        </form>
        <span>
          <button onClick={backBtn}> Back </button>
          <button onClick={handleContinue}> Continue Later </button>
          <button onClick={handleSubmit}> Finalize</button>
        </span>
      </center>
    </>
  )
}

export default ShippingInfo