import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './Summary.css';

import { Button, Typography, Grid, Paper, List, ListItem, makeStyles, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    minWidth: 650,
  },
}));

function Summary() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

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

  return (
    <center>
      <Typography variant="h3" align="center" gutterBottom>
        {/* TO DO - Should show company name instead of user name*/}
        {user.companyName}
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Current Contract Summary
        </Typography>
      <Paper style={{ width: 'fit-content' }}>
        <List className={classes.root}>
          {/* pull from store/reducers for values below */}
          <ListItem>Company Name:<ListItemText style={{ marginLeft: 10 }} primary={user.companyName} /></ListItem>
          <ListItem>MSA ID:<ListItemText style={{ marginLeft: 10 }} primary={user.companyID} /></ListItem>
          <ListItem>Ingredient:<ListItemText style={{ marginLeft: 10 }} primary='CBD' /></ListItem>
          <ListItem>SOW:<ListItemText style={{ marginLeft: 10 }} primary='###' /></ListItem>
          <ListItem>SOW Start Date:<ListItemText style={{ marginLeft: 10 }} primary='01-01-2021' /></ListItem>
          <ListItem>Today's Date:<ListItemText style={{ marginLeft: 10 }} primary={`${cMonth}-${cDay}-${cYear}`} /></ListItem>
        </List>

        <TableContainer style={{ border: 1, marginBottom: 40, padding: 50, paddingTop: 0 }}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell># of Orders </TableCell>
                <TableCell> # of Samples </TableCell>
                <TableCell> # of Orders Remaining </TableCell>
                <TableCell> # of Samples Remaining </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>10 Sample Orders</TableCell>
                <TableCell>5</TableCell>
                <TableCell>50</TableCell>
                <TableCell>2</TableCell>
                <TableCell>20</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>5 Sample Orders</TableCell>
                <TableCell>8</TableCell>
                <TableCell>40</TableCell>
                <TableCell>3</TableCell>
                <TableCell>15</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2 Sample Orders</TableCell>
                <TableCell>5</TableCell>
                <TableCell>10</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button
        style={{ backgroundColor: '#1e565c', color: 'white', marginTop: 10, width: '30%' }}
        variant="contained"
        color="primary"
        onClick={goToAddSample}
      >
        Start Sample
      </Button>
    </center>
  );
}

export default Summary;
