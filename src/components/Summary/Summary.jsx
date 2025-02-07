// imports for functionality
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

// import material ui components
import { Button, Typography, Grid } from '@material-ui/core';


const Summary = function () {
  // make functions we can use
  const history = useHistory();

  // get state from the redux store
  const user = useSelector(store => store.user);
  // const company = useSelector(store => store.company);
  console.log(user);

  /*
  // on page load get the company info if its not is the store
  useEffect(() => {
    dispatchEvent({
      type: 'FETCH_COMPANY_INFO'
    })
  }, []);
  */

  const goToAddSample = function () {
    console.log('button clicked');
    history.push('/addSample')
  }; // end goToAddSample

  return (
    <Grid container justify='center'>

      <Grid item xs={12}>
        <Typography variant='h1' align='center'>
          {/* right now its username, but should be company name */}
          {user.name}
        </Typography>
      </Grid>

      <Grid  item xs={12}>
        <Typography variant='h6' align='center'>
          Reminder:
        </Typography>

        <Typography variant='body1' align='center'>
          {/* maybe add how many samples the company has already sent */}
          You only have 2 samples left on your contract
        </Typography>
      </Grid>

        <Button 
        style={{ backgroundColor: "#1e565c", color: "white" }}
        onClick={goToAddSample}
        variant='contained' 
        color='primary'>
          Add Sample Info
        </Button>

      
    </Grid>
  )
};

export default Summary;