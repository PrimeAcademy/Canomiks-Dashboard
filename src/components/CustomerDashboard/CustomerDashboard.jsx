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
  IconButton,
  Grid,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
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

  useEffect(() => {
    dispatch({ type: 'FETCH_CUSTOMER_ORDERS' });
  }, []);

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

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" style={{ marginLeft: '10%' }} gutterBottom>
        {user.companyName}
      </Typography>
      {!user.active ? (
        <div style={{ marginLeft: '10%', marginBottom: 10, maxWidth: '80%' }}>
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            <strong>
              Your account is still waiting on approval. Please check your email
              for additional information.
            </strong>
          </Alert>
        </div>
      ) : (
        <Button
          variant="contained"
          style={{
            backgroundColor: '#1e565c',
            color: 'white',
            marginLeft: '10%',
          }}
          onClick={addSampleButton}
        >
          + SAMPLE
        </Button>
      )}

      {/* Search field */}
      <div>
        <TextField
          label="Search ingredient..."
          variant="standard"
          style={{ margin: 25, marginLeft: '10%' }}
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        />
      </div>

      <center>
        <TableContainer
          style={{ maxWidth: '80%', maxHeight: 450 }}
          component={Paper}
        >
          <Table
            className={classes.table}
            aria-label="sample table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 700 }}>Lot Number</TableCell>

                <TableCell align="right" style={{ fontWeight: 700 }}>
                  Ingredient Name
                </TableCell>

                <TableCell align="right" style={{ fontWeight: 700 }}>
                  Date Shipped
                </TableCell>

                <TableCell align="right" style={{ fontWeight: 700 }}>
                  Test Phase
                </TableCell>

                <TableCell align="right" style={{ fontWeight: 700 }}>
                  Details
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order, index) => {
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
                      <TableCell align="right">
                        {order.ingredientName} - {order.cropStrain}
                      </TableCell>

                      {/* Date Shipped */}
                      {order.shippedDate ? (
                        <TableCell align="right">
                          {moment(order.shippedDate).format('MMMM DD YYYY')}
                        </TableCell>
                      ) : (
                        <TableCell align="right">Not Shipped</TableCell>
                      )}

                      {/* Test Phase */}
                      <TableCell align="right">
                        {order.delayed && (
                          <IconButton onClick={() => handleOpen(order)}>
                            <ErrorOutlineIcon style={{ color: '#F3A653' }} />
                          </IconButton>
                        )}
                        {order.statusName}
                      </TableCell>

                      {/* Details */}
                      <TableCell align="right">
                        {order.statusName === 'Pre-shipment' ? (
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpen(order)}
                          >
                            Add Shipping Info
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              // make clicked order the current sample
                              dispatch({
                                type: '',
                                payload: '',
                              });
                              // open the popup
                              handleOpen(order);
                            }}
                          >
                            View Details
                          </Button>
                        )}
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
