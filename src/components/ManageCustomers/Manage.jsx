import Nav from '../Nav/Nav';
import DisplayCompany from '../DisplayCompany/DisplayCompany';
import { useSelector } from 'react-redux';

function Manage() {
  // const companyList = useSelector((store) => store.);

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
            <DisplayCompany />
            {/* grabbing from store */}

            {/* {companyList.map((company) => {
              return <DisplayCompany key={company.id} company={company} />;
            })} */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Manage;
