import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import ManageCustomersDetail from '../ManageCustomersDetail/ManageCustomersDetail';
import { Button, Container, Dialog, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';

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

function Manage() {
  const dispatch = useDispatch();
  const classes = useStyles();

  /* Store Import */
  const customerList = useSelector((state) => state.customer);

  const [open, setOpen] = useState(false);
  const [clickedCustomer, setClickedCustomer] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch({
      type: 'FETCH_CUSTOMERS',
    });
  }, []);

  const handleClickOpen = (customer) => {
    setClickedCustomer(customer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth='xl'>
      <Typography
        variant="h3"
        component="h1"
        style={{ marginLeft: '10%', fontWeight: 700 }}
      >
        Manage Customers
      </Typography>
      {/* Search field */}
      <div>
        <TextField
          style={{ margin: 25, marginLeft: '10%' }}
          label="Search..."
          variant="standard"
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        />
      </div>
      <center>
        <TableContainer className={classes.container} component={Paper}>
          <Table
            className={classes.table}
            stickyHeader
            aria-label="manage-customers-table"
          >
            <TableHead>
              <TableRow >
                <TableCell label="Company Name" style={{ fontWeight: 700 }}>Company Name</TableCell>
                <TableCell label="Status" align="right" style={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell label="Details" align="right" style={{ fontWeight: 700 }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerList.map((customer) => {
                if (customer.companyName !== 'Canomiks' && customer.companyName.toLowerCase().includes(filter.toLowerCase())) {
                  return (
                    <TableRow key={customer.id}>
                      <TableCell component="th" scope="row">
                        <Typography onClick={() => handleClickOpen(customer)}>{customer.companyName}</Typography>
                      </TableCell>

                      <TableCell align="right">
                        {customer.active ? <IconButton style={{ color: '#1e565c' }} onClick={() => handleClickOpen(customer)}><CheckIcon /></IconButton> : <IconButton style={{ color: '#fdcb43' }} onClick={() => handleClickOpen(customer)}><BlockIcon /></IconButton>}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => handleClickOpen(customer)}
                          size="small"
                          variant="contained"
                          style={{
                            backgroundColor: '#1e565c',
                            color: 'white',
                            marginTop: 10
                          }}
                        >
                          Details
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="view-details-slide-title"
        aria-describedby="view-details-slide-description"
      >
        <ManageCustomersDetail clickedCustomer={clickedCustomer} handleClose={handleClose} />
      </Dialog>
    </Container>
  );
}

export default Manage;
