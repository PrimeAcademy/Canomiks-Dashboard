import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { lighten, makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Paper, TextField, Container, Typography, Checkbox, FormControlLabel, createMuiTheme, ThemeProvider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import LabDetail from '../LabDetail/LabDetail';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "id", numeric: false, disablePadding: true, label: "Order ID" },
  { id: "lotNumber", numeric: true, disablePadding: true, label: "Lot Number" },
  { id: "companyName", numeric: true, disablePadding: true, label: 'Company Name' },
  { id: "receivedDate", numeric: true, disablePadding: true, label: "Date Received" },
  { id: "statusName", numeric: true, disablePadding: true, label: "Test Phase" },
  { id: "action", numeric: true, disablePadding: true, label: "" }
];

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    rowCount,
    onRequestSort
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            style={{ fontWeight: 700 }}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  table: {
    minWidth: 650
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  container: {
    maxHeight: 600,
    maxWidth: '80%',
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e565c',
      light: '#26AB6E',
      dark: '#1e565c'
    },
    secondary: {
      main: '#0044ff',
      light: '#01689b',
      contrastText: '#ffcc00',
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: 'black',
      },
    },
  }
});

export default function LabDashTest() {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState('');
  const [isDelayed, setIsDelayed] = useState(false)
  const [openDetail, setOpenDetail] = useState(false);
  const [clickedSample, setClickedSample] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const allOrders = useSelector((store) => store.orders.orderReducer);

  useEffect(() => {
    dispatch({
      type: 'FETCH_ALL_ORDERS',
    });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, allOrders.length - page * rowsPerPage);

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

  const shippingUpdate = (order) => {
    dispatch({
      type: 'UPDATE_TEST_PHASE',
      payload: order,
    });
  }; // end shippingUpdate

  const handleSearchByDelayed = (event, value) => {
    if (value === true) {
      dispatch({
        type: 'SEARCH_DELAYED_ORDERS',
        payload: { value }
      });
    } else {
      dispatch({
        type: 'FETCH_ALL_ORDERS'
      })
    }

    setIsDelayed(value);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          component="h1"
          style={{ marginLeft: '10%', fontWeight: 700 }}
          gutterBottom
        >
          Current Orders
      </Typography>
        <div style={{ width: 'fit-content', marginLeft: '10%', marginBottom: 10 }}>
          <TextField
            label="Search company name..."
            variant="standard"
            onChange={(event) => {
              setFilter(event.target.value);
            }}
          />
          <FormControlLabel
            style={{ marginLeft: 20, marginTop: 10 }}
            control={
              <Checkbox
                checked={isDelayed}
                onChange={(event, val) => handleSearchByDelayed(event, val)}
                name="delayed"
                style={{ color: '#1e565c' }}
              />
            }
            label={<Typography>Delayed Tests</Typography>}
          />
        </div>
        <center>
          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              className={classes.table}
              aria-labelledby="currentOrdersTable"
              size={rowsPerPage > 10 ? "small" : "medium"}
              aria-label="currentOrders"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={allOrders.length}
              />
              <TableBody>
                {stableSort(allOrders, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((thisOrder, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    if (thisOrder.statusName === 'Pre-Shipment' && thisOrder.shippedDate < ourDate) {
                      thisOrder.statusName = 'In Transit';
                      thisOrder.testingStatus = 2;
                      shippingUpdate(thisOrder);
                    }

                    if (thisOrder.companyName.toLowerCase().includes(filter.toLowerCase())) {

                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={thisOrder.id}
                        >
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {thisOrder.id}
                          </TableCell>

                          {/* Lot Number */}
                          <TableCell align="right">{thisOrder.lotNumber}</TableCell>

                          {/* Company Name */}
                          <TableCell align="right">{thisOrder.companyName}</TableCell>

                          {/* Date Received */}
                          {thisOrder.receivedDate ? (
                            <TableCell align="right">
                              {moment(thisOrder.receivedDate).format('MMMM DD YYYY')}
                            </TableCell>
                          ) : (
                            <TableCell align="right">Not Received</TableCell>
                          )}

                          {/* Test Phase */}
                          <TableCell align="right">
                            {thisOrder.delayed && <IconButton style={{ padding: 0, margin: 0, marginRight: 5 }} onClick={() => handleOpen(thisOrder)}><ErrorOutlineIcon style={{ color: '#F3A653', padding: 0, margin: 0 }} /></IconButton>}{thisOrder.statusName}
                          </TableCell>

                          {/* Action */}
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              size="small"
                              style={{
                                backgroundColor: '#1e565c',
                                color: 'white',
                              }}
                              onClick={() => handleOpen(thisOrder)}
                            >
                              View Details
                          </Button>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (rowsPerPage > 10 ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </TableContainer>
          <TablePagination
            style={{ marginRight: '10%' }}
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={allOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <Dialog open={openDetail} onClose={handleClose} scroll="paper">
            <LabDetail
              originalSample={clickedSample}
              setOpenDetail={setOpenDetail}
            />
          </Dialog>
        </center>
      </Container>
    </ThemeProvider>
  );
}