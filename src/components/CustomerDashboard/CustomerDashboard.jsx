import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import moment from 'moment';

import CustomerDetail from '../CustomerDetail/CustomerDetail';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Dialog,
  Container,
  Grid,
} from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function CustomerDashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  /* Store Imports */
  const orders = useSelector((store) => store.orders.orderReducer);
  const user = useSelector((store) => store.user);

  /* Local State */
  const [filter, setFilter] = useState('');
  const [openDetail, setOpenDetail] = useState(false);
  const [clickedSample, setClickedSample] = useState({});

  // date set up
  let ourDate = moment().format(); // "2014-09-08T08:02:17-05:00" (ISO 8601, no fractional seconds)

  useEffect(() => {
    dispatch({ type: 'FETCH_CUSTOMER_ORDERS' });
  }, []);

  // local functions
  const handleOpen = (sample) => {
    setClickedSample(sample);
    setOpenDetail(true);
  }; // end handleOpen

  const handleClose = () => {
    setOpenDetail(false);
  }; // end handleClose

  function addSampleButton() {
    // clear the current sample
    dispatch({
      type: 'CLEAR_CURRENT_SAMPLE',
    });
    // move to summary page
    history.push('/summary');
  } // end addSampleButton

  const shippingUpdate = (order) => {
    dispatch({
      type: 'UPDATE_TEST_PHASE',
      payload: order,
    });
  }; // end shippingUpdate

  return (
    <Container maxWidth="md">
      <Grid container justify="center" alignItems="center">
        <Grid item xs={10}>
          <Typography variant="h1" style={{ marginBottom: 5 }} gutterBottom>
            {user.companyName}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            style={{
              margin: 15,
              marginBottom: 10,
            }}
            onClick={addSampleButton}
          >
            + SAMPLE
          </Button>
        </Grid>
      </Grid>

      {/* Search field */}
      <TextField
        label="Search ingredient..."
        variant="standard"
        style={{ margin: 10 }}
        onChange={(event) => {
          setFilter(event.target.value);
        }}
      />

      <center>
        <TableContainer
          style={{ width: '100%', maxHeight: '55vh' }}
          component={Paper}
        >
          <Table
            className={classes.table}
            aria-label="Sample table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 700 }}>Lot Number</TableCell>

                <TableCell align="center" style={{ fontWeight: 700 }}>
                  Ingredient Name
                </TableCell>

                <TableCell align="center" style={{ fontWeight: 700 }}>
                  Date Shipped
                </TableCell>

                <TableCell align="center" style={{ fontWeight: 700 }}>
                  Test Phase
                </TableCell>

                <TableCell align="center" style={{ fontWeight: 700 }}>
                  Details
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order, index) => {
                // change status if date has passed
                if (
                  order.statusName === 'Pre-Shipment' &&
                  order.shippedDate < ourDate
                ) {
                  order.statusName = 'In Transit';
                  order.testingStatus = 2;
                  shippingUpdate(order);
                }

                if (
                  order.cropStrain &&
                  order.cropStrain.toLowerCase().includes(filter.toLowerCase())
                ) {
                  return (
                    <TableRow
                      key={index}
                      style={{
                        backgroundColor:
                          order.statusName === 'Pre-Shipment' && '#F3A653',
                      }}
                    >
                      {/* Lot Number */}
                      <TableCell component="th" scope="row">
                        #{order.lotNumber}
                      </TableCell>

                      {/* Ingredient Name */}
                      <TableCell style={{ width: '30%' }} align="center">
                        {order.ingredientName} - {order.cropStrain}
                      </TableCell>

                      {/* Date Shipped */}
                      {order.shippedDate ? (
                        <TableCell align="center">
                          {moment(order.shippedDate).format('MMMM DD YYYY')}
                        </TableCell>
                      ) : (
                        <TableCell align="center">Not Shipped</TableCell>
                      )}

                      {/* Test Phase */}
                      <TableCell align="center">
                        {order.statusName}
                        {order.delayed && (
                          <ErrorOutlineIcon
                            style={{
                              color: '#F3A653',
                              fontSize: '1.2em',
                              marginLeft: 3,
                            }}
                            onClick={() => handleOpen(order)}
                          />
                        )}
                      </TableCell>

                      {/* Details */}
                      <TableCell align="center">
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpen(order)}
                        >
                          {order.statusName === 'Pre-shipment' ? (
                            <>Add Shipping Info</>
                          ) : (
                            <>View Detail</>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </center>

      {/* Detail Pop up */}
      <Dialog open={openDetail} onClose={handleClose} scroll="paper">
        <CustomerDetail sample={clickedSample} />
      </Dialog>
    </Container>
  );
}

export default CustomerDashboard;
