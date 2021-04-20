import React from 'react';
import { useDispatch } from 'react-redux';
// imports for dialog pop up
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

function LogOutButton(props) {
  const dispatch = useDispatch();


  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  return (<>
          <button     
              className={props.className}
              style={{ backgroundColor: '#1e565c', color: 'white' }}
              variant="contained" 
              color="primary" 
              onClick={handleCancel}>
            Log Out
          </button>
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                Are you sure?
              </DialogTitle>
              <DialogContent>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  No
                </Button>
                <Button 
                  onClick={() => dispatch({ type: 'LOGOUT' })}                      color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
          </Dialog>
{/*     
     This button shows up in multiple locations and is styled differently
       because it's styled differently depending on where it is used, the className
     is passed to it from it's parents through React props
     className={props.className}
    onClick={handleClickOpen}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    */}
 </> );
}

export default LogOutButton;
