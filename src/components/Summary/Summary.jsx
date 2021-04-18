import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { Button, Typography, Grid } from '@material-ui/core';

function Summary() {
  const history = useHistory();

  /* Store Imports */
  const user = useSelector((store) => store.user);
  // const company = useSelector(store => store.company);

  /*
  // TO DO - on page load get the company info if its not is the store
  useEffect(() => {
    dispatchEvent({
      type: 'FETCH_COMPANY_INFO'
    })
  }, []);
  */

  const goToAddSample = function () {
    // Initializes sample
    dispatch({
      type: 'INITIAL_SAMPLE_ORDER',
      payload: {
        companyID: user.companyID,
        lotNumber: '0000',
      },
    });

    history.push('/sample/add');
  }; // end goToAddSample

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Typography variant="h1" align="center">
          {/* TO DO - Should show company name instead of user name*/}
          {user.name}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" align="center">
          Reminder:
        </Typography>

        <Typography variant="body1" align="center">
          {/* Displays information pulled from contract on number of samples remaining */}
          You only have 2 samples left on your contract
        </Typography>
      </Grid>

      <Button
        style={{ backgroundColor: '#1e565c', color: 'white' }}
        variant="contained"
        color="primary"
        onClick={goToAddSample}
      >
        Add Sample Info
      </Button>
    </Grid>
  );
}

export default Summary;
