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
} from '@material-ui/core';

// materiaul ui style
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

function LabDashboard() {
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

  const orders = useSelector((store) => store.orders.orderReducer);

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
    setOpenDetail(true);
  }; // end handleOpen

  const handleClose = () => {
    setOpenDetail(false);
  }; // end handleClose

  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        style={{ marginLeft: '10%', fontWeight: 900 }}
        gutterBottom
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
                <TableCell label="Lot Number" style={{ fontWeight: 900 }}>
                  Lot Number
                </TableCell>
                <TableCell
                  label="Company Name"
                  align="right"
                  style={{ fontWeight: 900 }}
                >
                  Company Name
                </TableCell>
                <TableCell
                  label="Date Received"
                  align="right"
                  style={{ fontWeight: 900 }}
                >
                  Date Received
                </TableCell>
                <TableCell
                  label="Test Phase"
                  align="right"
                  style={{ fontWeight: 900 }}
                >
                  Test Phase
                </TableCell>
                <TableCell
                  label="Action Button"
                  align="right"
                  style={{ fontWeight: 900 }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => {
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
                        <TableCell align="right">{order.companyID}</TableCell>

                        {/* Date Received */}
                        {order.receivedDate ? (
                          <TableCell align="right">
                            {moment(order.receivedDate).format('MMMM DD YYYY')}
                          </TableCell>
                        ) : (
                          <TableCell align="right">Not Shipped</TableCell>
                        )}

                        {/* Test Phase */}
                        <TableCell align="right">{order.statusName}</TableCell>

                        {/* Action */}
                        <TableCell align="right">
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
        <LabDetail sample={clickedSample} />
      </Dialog>
    </>
  );
}

export default LabDashboard;
