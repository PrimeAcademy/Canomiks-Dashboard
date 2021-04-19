import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
// TO DO - convert Modal to Dialog

function ManageCustomersDetail(props) {
  const [open, setOpen] = useState(false);

  const rand = () => {
    return Math.round(Math.random() * 20) - 10;
  }; // end rand

  const getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }; // end getModalStyle

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })); // end useStyles

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  }; // end handleOpen

  const handleClose = () => {
    setOpen(false);
  }; // end handleClose

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="name">{props.customer.companyName}</h2>
      <p id="details">
        {props.customer.address} {props.customer.city} {props.customer.state}{' '}
        {props.customer.zip}
      </p>

      <p> {props.customer.phoneNumber}</p>
    </div>
  );

  return (
    <div>
      <tr>
        {<td>{props.customer.companyName} </td>}
        <td>
          <button onClick={handleOpen}>View Details</button>
        </td>
      </tr>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="name"
          aria-describedby="details"
        >
          {body}
        </Modal>
      </div>
    </div>
  );
}

export default ManageCustomersDetail;
