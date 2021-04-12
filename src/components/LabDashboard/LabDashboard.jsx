import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'lotNumber', label: 'Lot Number', minWidth: 170 },
  { id: 'companyName', label: 'Company Name', minWidth: 100 },
  {
    id: 'dateReceived',
    label: 'Date Received',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(lotNumber, companyName, dateReceived, size) {
  return { lotNumber, companyName, dateReceived, size };
}

const rows = [
  createData('123', 'Company 1', '4/12/2021', 3287263),
  createData('321', 'Company 2', '4/12/2021', 9596961),
  createData('4123', 'Company 3', '4/12/2021', 301340),
  createData('15 5125', 'Company 4', '4/12/2021', 9833520),
  createData('125', 'Company 1', '4/12/2021', 9984670),
  createData('16136', 'Company 2', '4/12/2021', 7692024),
  createData('123', 'Company 3', '4/12/2021', 357578),
  createData('125165', 'Company 2', '4/12/2021', 70273),
  createData('6326236', 'Company 2', '4/12/2021', 1972550),
  createData('214124', 'Company 1', '4/12/2021', 377973),
  createData('16516', 'Company 1', '4/12/2021', 640679),
  createData('6437 8658', 'Company 4', '4/12/2021', 242495),
  createData('1212', 'Company 4', '4/12/2021', 17098246),
  createData('125215', 'Company 3', '4/12/2021', 923768),
  createData('1225', 'Company 2', '4/12/2021', 8515767),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
