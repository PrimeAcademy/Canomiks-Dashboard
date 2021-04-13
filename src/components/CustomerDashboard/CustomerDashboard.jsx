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
        <Button variant="contained" style={{ backgroundColor: "#1e565c", color: "white" }} onClick={() => history.push('/addSample')}>+ SAMPLE</Button>
        <div>
          <TextField style={{ margin: 25 }} onChange={(event) => { setFilter(event.target.value) }} label="Search..." variant="standard" />
        </div>
        <TableContainer style={{ maxWidth: '80%', maxHeight: 450 }} component={Paper}>
          <Table stickyHeader className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 900 }}>Lot ID</TableCell>
                <TableCell align="right" style={{ fontWeight: 900 }}>Ingredient Name</TableCell>
                <TableCell align="right" style={{ fontWeight: 900 }}>Date Received</TableCell>
                <TableCell align="right" style={{ fontWeight: 900 }}>Test Phase</TableCell>
                <TableCell align="right" style={{ fontWeight: 900 }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                if (order.lotNumber.toLowerCase().includes(filter.toLowerCase())) {
                  return (
                    <TableRow style={{ backgroundColor: order.testingStatus === 'Pre-shipment' && '#F3A653' }} key={order.id}>
                      <TableCell component="th" scope="row">
                        {order.lotNumber}
                      </TableCell>
                      <TableCell align="right">{order.ingredientName} - {order.cropStrain}</TableCell>
                      {order.receivedDate ?
                        <TableCell align="right">{moment(order.receivedDate).format('MMMM DD YYYY')}</TableCell> :
                        <TableCell align="right">Not Shipped</TableCell>
                      }
                      <TableCell align="right">{order.testingStatus}</TableCell>
                      <TableCell align="right">
                        {order.testingStatus === 'Pre-shipment' ? <Button variant="contained" style={{ backgroundColor: 'white', color: '#1e565c' }}>Add Shipping Info</Button> : <Button variant="contained" style={{ backgroundColor: '#1e565c', color: 'white' }}>View Details</Button>}
                      </TableCell>
                    </TableRow>
                  )
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </center>
    </>
  );
}
