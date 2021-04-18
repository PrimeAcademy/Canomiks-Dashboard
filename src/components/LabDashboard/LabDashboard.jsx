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
}); // end style

// main component function
function LabDashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // local states
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

  // functions
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
        gutterBottom
        style={{ marginLeft: '10%', fontWeight: 900 }}
      >
        Current Orders
      </Typography>
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
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            stickyHeader
            aria-label="sticky table"
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
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={order.id}
                      >
                        <TableCell component="th" scope="row">
                          #{order.lotNumber}
                        </TableCell>

                        <TableCell align="right">{order.companyName}</TableCell>
                        {order.receivedDate ? (
                          <TableCell align="right">
                            {moment(order.receivedDate).format('MMMM DD YYYY')}
                          </TableCell>
                        ) : (
                          <TableCell align="right">Not Shipped</TableCell>
                        )}

                        <TableCell align="right">{order.statusName}</TableCell>

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
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
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
