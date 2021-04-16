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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CustomerDashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const orders = useSelector((state) => state.orders);
  const user = useSelector((state) => state.user);

  const [filter, setFilter] = useState('');
  const [openDetail, setOpenDetail] = useState(false);
  const [clickedSample, setClickedSample] = useState({});

  useEffect(() => {
    dispatch({
      type: 'FETCH_CUSTOMER_ORDERS',
    });
  }, []);

  const handleOpen = (sample) => {
    setClickedSample(sample);
    setOpenDetail(true);
  }; // end handleOpen

  const handleClose = () => {
    setOpenDetail(false);
  }; // end handleClose

  return (
    <>
      <Typography
        variant="h3"
        gutterBottom
        component="h1"
        style={{ marginLeft: '10%', fontWeight: 900 }}
      >
        COMPANY ID: {user.companyID}
      </Typography>
      <Button
        variant="contained"
        style={{
          backgroundColor: '#1e565c',
          color: 'white',
          marginLeft: '10%',
        }}
        onClick={() => history.push('/addSample')}
      >
        + SAMPLE
      </Button>
      <div>
        <TextField
          style={{ margin: 25, marginLeft: '10%' }}
          onChange={(event) => {
            setFilter(event.target.value);
          }}
          label="Search..."
          variant="standard"
        />
      </div>
      <center>
        <TableContainer
          style={{ maxWidth: '80%', maxHeight: 450 }}
          component={Paper}
        >
          <Table
            stickyHeader
            className={classes.table}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 900 }}>Lot ID</TableCell>
                <TableCell align="right" style={{ fontWeight: 900 }}>
                  Ingredient Name
                </TableCell>
                <TableCell align="right" style={{ fontWeight: 900 }}>
                  Date Shipped
                </TableCell>
                <TableCell align="right" style={{ fontWeight: 900 }}>
                  Test Phase
                </TableCell>
                <TableCell align="right" style={{ fontWeight: 900 }}>
                  Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                if (
                  order.lotNumber.toLowerCase().includes(filter.toLowerCase())
                ) {
                  return (
                    <TableRow
                      style={{
                        backgroundColor:
                          order.statusName === 'Pre-Shipment' && '#F3A653',
                      }}
                      key={order.id}
                    >
                      <TableCell component="th" scope="row">
                        #{order.lotNumber}
                      </TableCell>
                      <TableCell align="right">
                        {order.ingredientName} - {order.cropStrain}
                      </TableCell>
                      {order.shippedDate ? (
                        <TableCell align="right">
                          {moment(order.shippedDate).format('MMMM DD YYYY')}
                        </TableCell>
                      ) : (
                        <TableCell align="right">Not Shipped</TableCell>
                      )}
                      <TableCell align="right">{order.statusName}</TableCell>
                      <TableCell align="right">
                        {order.statusName === 'Pre-shipment' ? (
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: 'white',
                              color: '#1e565c',
                            }}
                            onClick={() => handleOpen(order)}
                          >
                            Add Shipping Info
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: '#1e565c',
                              color: 'white',
                            }}
                            onClick={() => handleOpen(order)}
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

      <Dialog
        open={openDetail}
        onClose={handleClose}
        scroll="paper"
        id="detail-container"
      >
        <CustomerDetail sample={clickedSample} />
      </Dialog>
    </>
  );
}
