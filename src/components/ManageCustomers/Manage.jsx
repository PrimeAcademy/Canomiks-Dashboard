import Nav from '../Nav/Nav';
import DisplayCompany from '../DisplayCompany/DisplayCompany';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
function Manage() {
  // const companyList = useSelector((store) => store.);
  const dispatch = useDispatch();
  const customerList = useSelector(state => state.customer);
  console.log(customerList, 'customerList')
  useEffect(() => {
    dispatch({
      type: 'FETCH_CUSTOMERS'
    })
  }, []);
  
  //console.log('customer name', customerList[0].companyName)
  
//console.log('cutsomer', customerList.companyName[0])
  return (
    <>
      <header className="header">
        <h2>Manage Customers</h2>
      </header>
      <div>
        <table>
          <thead>
            <tr>
              <th>Company Name  </th>
            </tr>
          </thead>
          <tbody>
         
            
          
        {customerList.map(customer => {
          return <DisplayCompany key={customer.id} customer={customer} />
         })}
   
            
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Manage;
