import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useSelector, useDispatch } from 'react-redux';
function DisplayCompany(props) {
  
  console.log('companyyy', props.customer)
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


  const classes = useStyles();
 
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="name">{props.customer.companyName}</h2>
      <p id="details">
        {props.customer.address} {props.customer.city} {props.customer.state} {props.customer.zip}
      </p>
   
      <p> {props.customer.phoneNumber}</p>
     
    </div>
  );

  return (
    <div>
      <tr>
        
        { <td>{props.customer.companyName} </td> }
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





export default DisplayCompany;
