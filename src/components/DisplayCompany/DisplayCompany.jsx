import { useSelector, useDispatch } from 'react-redux';
function DisplayCompany(props) {
  const viewDetails = () => {
    console.log('view details button');
    
  };
  console.log('companyyy', props.customer)

  return (
    <>
      <tr>
        
        { <td>{props.customer.companyName} </td> }
        <td>
          <button onClick={viewDetails}>View Details</button>
        </td>
      </tr>
    </>
  );
}

export default DisplayCompany;
