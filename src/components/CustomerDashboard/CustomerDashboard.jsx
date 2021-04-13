import { makeStyles } from '@material-ui/core/styles';
import { Divider, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import moment from 'moment';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CustomerDashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const orders = useSelector(state => state.orders);
  const user = useSelector(state => state.user);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch({
      type: 'FETCH_CUSTOMER_ORDERS'
    })
  }, []);

  return (
    <>
      <center>
        <Typography variant="h4" gutterBottom>COMPANY ID: {user.companyID}</Typography>
        <Button variant="contained" color="primary" onClick={() => history.push('/addSample')}>+ SAMPLE</Button>
        <div>
          <TextField style={{ margin: 75 }} onChange={(event) => { setFilter(event.target.value) }} label="Search..." variant="standard" />
        </div>
      </center>
      <Divider />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Lot #</TableCell>
              <TableCell align="right">Ingredient Name</TableCell>
              <TableCell align="right">Date Received</TableCell>
              <TableCell align="right">Test Phase</TableCell>
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              if (order.lotNumber.toLowerCase().includes(filter.toLowerCase())) {
                return (
                  <TableRow style={{ backgroundColor: order.testingStatus === 'Pre-shipment' && 'orange' }} key={order.id}>
                    <TableCell component="th" scope="row">
                      Lot #{order.lotNumber}
                    </TableCell>
                    <TableCell align="right">{order.ingredientName} - {order.cropStrain}</TableCell>
                    {order.receivedDate ?
                      <TableCell align="right">{moment(order.receivedDate).format('MMMM DD YYYY')}</TableCell> :
                      <TableCell align="right">Not Shipped</TableCell>
                    }
                    <TableCell align="right">{order.testingStatus}</TableCell>
                    <TableCell align="right">
                      {order.testingStatus === 'Pre-shipment' ? <Button variant="outlined" color="secondary">Add Shipping Info</Button> : <Button variant="outlined" color="primary">View Details</Button>}
                    </TableCell>
                  </TableRow>
                )
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
