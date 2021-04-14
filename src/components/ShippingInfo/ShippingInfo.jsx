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

  const backBtn = () => {
    console.log("back button")
    history.push("/addSamples")
  }

  function handleContinue(event) {
    event.preventDefault();
    alert("Sample cannot be processed until shipping information is entered")
    history.push("/")
  }


    return(
        <>
            <form>

                <p> These are the available shipping dates. Samples cannot be processed until shipping info is filled out</p>
              <div> Date to be shipped: <input type="text" placeholder="MM/DD/YY" onChange={(evt)=>{setDate(evt.target.value)}}/> </div>
              <div> Carrier: <input type="text" placeholder="Not Specified" onChange={(evt)=>{setCarrier(evt.target.value)}}/></div>
              <div> Tracking Number: <input type="text" onChange={(evt)=>{setTracking(evt.target.value)}}/> </div>
            <span> <button onClick={handleBack}> Back to add sample </button><button onClick={handleContinue}> Continue Later </button><button onClick={handleSubmit}> Finalize</button></span>

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