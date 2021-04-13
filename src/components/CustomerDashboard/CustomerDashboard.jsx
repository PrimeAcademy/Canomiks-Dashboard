import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Divider, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

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

  console.log('orders', orders);

  useEffect(() => {
    dispatch({
      type: 'FETCH_CUSTOMER_ORDERS'
    })
  }, []);

  return (
    <>
      <Typography variant="h4">Customer Dashboard</Typography>
      <Button variant="contained" color="primary" onClick={() => history.push('/addSample')}>+ SAMPLE</Button>
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
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell component="th" scope="row">
                  Lot #{order.lotNumber}
                </TableCell>
                <TableCell align="right">{order.ingredientName}</TableCell>
                <TableCell align="right">{order.dateReceived}</TableCell>
                <TableCell align="right">{order.testPhase}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" color="primary">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
