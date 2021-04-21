import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';

import LabDetail from '../LabDetail/LabDetail';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Typography,
  TextField,
  Dialog,
  Container,
} from '@material-ui/core';

// material ui style
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
    maxWidth: '80%',
  },
  table: {
    minWidth: 650,
  },
});
//////Main function start
function LabDashboard() {
  // date set up
let ourDate = moment().format();                                // "2014-09-08T08:02:17-05:00" (ISO 8601, no fractional seconds)
console.log(ourDate, "our Date")

const classes = useStyles();
const dispatch = useDispatch();

  /* Store Imports */
  const orders = useSelector((store) => store.orders.orderReducer);

  /* Local State */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');
  const [openDetail, setOpenDetail] = useState(false);
  const [clickedSample, setClickedSample] = useState({});


  useEffect(() => {
    dispatch({
      type: 'FETCH_ALL_ORDERS',
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }; // end handleChangePage

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }; // end handleChangeRowsPerPage

  const handleOpen = (sample) => {
    setClickedSample(sample);
    dispatch({
      type: 'SET_CURRENT_SAMPLE',
      payload: sample,
    });

    setOpenDetail(true);
  }; // end handleOpen

  const handleClose = () => {
    setOpenDetail(false);
  }; // end handleClose

  return (
    <Container maxWidth='xl'>
      <Typography
        variant="h3"
        component="h1"
        style={{ marginLeft: '10%', fontWeight: 700 }}
      >
        Current Orders
      </Typography>

      {/* Search field */}
      <div>
        <TextField
          label="Search..."
          variant="standard"
          style={{ margin: 25, marginLeft: '10%' }}
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        />
      </div>

      <center>
        <TableContainer className={classes.container}>
          <Table
            aria-label="sticky table"
            className={classes.table}
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell label="Lot Number" style={{ fontWeight: 700 }}>
                  Lot Number
                </TableCell>

                <TableCell
                  label="Company Name"
                  align="center"
                  style={{ fontWeight: 700 }}
                >
                  Company Name
                </TableCell>

                <TableCell
                  label="Date Received"
                  align="center"
                  style={{ fontWeight: 700 }}
                >
                  Date Received
                </TableCell>

                <TableCell
                  label="Test Phase"
                  align="center"
                  style={{ fontWeight: 700 }}
                >
                  Test Phase
                </TableCell>

                <TableCell
                  label="Action Button"
                  align="center"
                  style={{ fontWeight: 700 }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => {
                  if(order.statusName === 'Pre-Shipment'
                      && 
                      order.shippedDate < ourDate)
                      {
                        order.statusName = "In Transit"
                        console.log("test phase changed")
                      }
                  if (
                    order.lotNumber.toLowerCase().includes(filter.toLowerCase())
                  ) {
                    return (
                      <TableRow
                        role="checkbox"
                        key={order.id}
                        tabIndex={-1}
                        hover
                      >
                        {/* Lot Number */}
                        <TableCell component="th" scope="row">
                          {order.lotNumber}
                        </TableCell>

                        {/* Company Name */}
                        <TableCell align="center">
                          {order.companyName}
                        </TableCell>

                        {/* Date Received */}
                        {order.receivedDate ? (
                          <TableCell align="center">
                            {moment(order.receivedDate).format('MMMM DD YYYY')}
                          </TableCell>
                        ) : (
                          <TableCell align="center">Not Received</TableCell>
                        )}

                        {/* Test Phase */}
                        <TableCell align="center">{order.statusName}</TableCell>
                               {/* if statusName === 'Pre-Shipment 
                        && shippedDate < cDate {
                          order.statusName === "In Shipment"

                        } */}

                        {/* Action */}
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            size="small"
                            style={{
                              backgroundColor: '#1e565c',
                              color: 'white',
                            }}
                            onClick={() => handleOpen(order)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          className={classes.container}
          component="div"
          rowsPerPageOptions={[10, 25, 100]}
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </center>

      <Dialog open={openDetail} onClose={handleClose} scroll="paper">
        <LabDetail
          originalSample={clickedSample}
          setOpenDetail={setOpenDetail}
        />
      </Dialog>
    </Container>
  );
}

export default LabDashboard;
