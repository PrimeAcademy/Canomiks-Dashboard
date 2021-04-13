import { useHistory } from 'react-router-dom';


function ShippingInfo(){

    function handleSubmit(event){
        event.preventDefault()
        history.push("/dashboard")
    }
    
    return(
        <>
        <form>
            <p> These are the available shipping dates. Samples cannot be processed until shipping info is filled out</p>
           <div> Date to be shipped: <input type="text" placeholder="MM/DD/YY"/> </div>
           <div> Carrier: <input type="text" placeholder="Not Specified" /></div>
           <div> Tracking Number: <input type="text" /> </div>
        </form>
        <span> <button > Back </button><button > Continue Later </button><button onClick={handleSubmit}> Finalize</button></span>
        </>

    )
}

export default ShippingInfo