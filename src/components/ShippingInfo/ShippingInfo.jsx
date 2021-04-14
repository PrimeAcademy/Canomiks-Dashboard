import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
function ShippingInfo(){
    const history = useHistory();
    const dispatch = useDispatch();
    const [date, setDate] = useState('');
    const [carrier, setCarrier] = useState('');
    const [tracking, setTracking] = useState(1)
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
    function handleBack(event){
        event.preventDefault()
        history.push("/")
    }
function handleContinue(event){
    event.preventDefault();
    alert("Sample cannot be processed until shipping information is entered")
    history.push("/")
}
function handleSubmit(event){
    event.preventDefault()
    dispatch({
        type: 'ADD_SHIPPING', 
        payload: {
            shippedDate: date, 
            carrierName: carrier, 
            trackingNumber: tracking
        }
    })
    history.push('/')
}
    


    return(
        <>
        <form>

            <p> These are the available shipping dates. Samples cannot be processed until shipping info is filled out</p>
           <div> Date to be shipped: <input type="text" placeholder="MM/DD/YY" onChange={(evt)=>{setDate(evt.target.value)}}/> </div>
           <div> Carrier: <input type="text" placeholder="Not Specified" onChange={(evt)=>{setCarrier(evt.target.value)}}/></div>
           <div> Tracking Number: <input type="text" onChange={(evt)=>{setTracking(evt.target.value)}}/> </div>
        </form>
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
}

export default ShippingInfo