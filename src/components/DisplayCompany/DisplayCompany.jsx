function DisplayCompany({ company }) {
  const viewDetails = () => {
    console.log('view details button');
    // shows pop up, component?
  };

  return (
    <>
      <tr>
        <td>Company Name</td>
        {/* <td>{company.name} </td> */}
        <td>
          <button onClick={viewDetails}>View Details</button>
        </td>
      </tr>
    </>
  );
}

export default DisplayCompany;
