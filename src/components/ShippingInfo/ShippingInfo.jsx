import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
function ShippingInfo(){
    const history = useHistory();
    const dispatch = useDispatch();
    const [date, setDate] = useState('');
    const [carrier, setCarrier] = useState('');
    const [tracking, setTracking] = useState(1)
    function handleSubmit(event){
        event.preventDefault()
        history.push("/dashboard")
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
        </>

    )
}

export default ShippingInfo