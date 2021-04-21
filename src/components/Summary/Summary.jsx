import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import './Summary.css';

import { Button, Typography, Grid } from '@material-ui/core';

function Summary() {
  const history = useHistory();
  const dispatch = useDispatch();

  /* Store Imports */
  const user = useSelector((store) => store.user);
  const sample = useSelector((store) => store.orders);
  const customer = useSelector((store) => store.customer);

// date set up
let currentDate = new Date();
let cDay = currentDate.getDate()
let cMonth = currentDate.getMonth() + 1
let cYear = currentDate.getFullYear()


  /*
  // TO DO - on page load get the company info if its not is the store
  useEffect(() => {
    dispatch({
      type: 'FETCH_COMPANY_INFO'
    })
  }, []);
  */

  const goToAddSample = function () {
    // Initializes sample
    dispatch({
      type: 'ADD_SAMPLE',
      payload: {
        companyID: user.companyID,
        lotNumber: '0000',
      },
    });

    history.push('/sample/add');
  }; // end goToAddSample

  return (<>
    <Grid container justify="center">
      <Grid item xs={12}>
        <Typography variant="h1" align="center">
          {/* TO DO - Should show company name instead of user name*/}
          {user.companyName}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" align="center">
          Reminder:
        </Typography>

        <Typography variant="body1" align="center" gutterBottom>
          {/* Displays information pulled from contract on number of samples remaining */}
          You only have 2 samples left on your contract
        </Typography>
      </Grid>

      <Button
        style={{ backgroundColor: '#1e565c', color: 'white', marginTop: 15 }}
        variant="contained"
        color="primary"
        onClick={goToAddSample}
      >
        Start Sample
      </Button>
    </Grid>
    <ul>
      {/* pull from store/reducers for values below */}
      <li>Company Name: {user.companyName}</li>
      <li>MSA ID: {user.companyID}</li>
      <li>Ingredient: {sample.ingredientName}</li>
      <li>SOW: </li>
      <li>SOW Start Date: </li>
      <li>Today's Date: {cMonth}-{cDay}-{cYear}</li>
    </ul>
    <table border="3">
      <tr>
        <th></th>
        <th>SOW: 2021-1-CBD </th>
        <th></th>
        <th>SOW: 2021-1-CBD </th>
        <th> </th>

      </tr>
      <tr>
        <td></td>
        <td># of Orders </td>
        <td> # of Samples </td>
        <td> # of Orders Remaining </td>
        <td> # of Samples Remaining </td>

      </tr>
      <tr>
        <td>10 Sample Orders</td>
        <td>5</td>
        <td>50</td>
        <td>2</td>
        <td>20</td>
      </tr>
      <tr>
        <td>5 Sample Orders</td>
        <td>8</td>
        <td>40</td>
        <td>3</td>
        <td>15</td>
      </tr>
      <tr>
        <td>2 Sample Orders</td>
        <td>5</td>
        <td>10</td>
        <td>1</td>
        <td>2</td>

      </tr>
      <tr>
        <td>Total Samples</td>
        <td></td>
        <td>100</td>
        <td></td>
        <td 
          style={{color: "red"}}>37
        </td>

      </tr>
    </table>

  </>);
}

export default Summary;
