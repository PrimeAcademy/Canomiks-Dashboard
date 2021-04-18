import Nav from '../Nav/Nav';
import ManageCustomersDetail from '../ManageCustomersDetail/ManageCustomersDetail';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
function Manage() {
  const dispatch = useDispatch();
  const customerList = useSelector((state) => state.customer);
  console.log(customerList, 'customerList');
  useEffect(() => {
    dispatch({
      type: 'FETCH_CUSTOMERS',
    });
  }, []);

  return (
    <>
      <header className="header">
        <h2>Manage Customers</h2>
      </header>

      <div>
        <table>
          <thead>
            <tr>
              <th>Company Name </th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((customer) => {
              return (
                <ManageCustomersDetail key={customer.id} customer={customer} />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Manage;
