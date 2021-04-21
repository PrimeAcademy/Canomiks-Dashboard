import React from 'react';
import { useDispatch } from 'react-redux';
// imports for dialog pop up
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';

function LogOutButton(props) {
  const dispatch = useDispatch();


  
  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      style={{
        fontFamily: 'proxima-nova',
        fontStyle: 'normal',
        fontSize: '12px',
        letterSpacing: '.11em',
        textTransform: 'uppercase'
      }}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </button>

    
  );
}

export default LogOutButton;
