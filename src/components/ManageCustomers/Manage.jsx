import Nav from '../Nav/Nav';
import DisplayCompany from '../DisplayCompany/DisplayCompany';

function Manage() {
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
              return <DisplayCompanies key={company.id} company={company} />;
            })} */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Manage;
