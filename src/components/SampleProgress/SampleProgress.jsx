import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Stepper, Step, StepLabel } from '@material-ui/core';
import { Check, ErrorOutline } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import './SampleProgress.css';

function SampleProgress({ sequence, state, delay, changeStep }) {
  const dispatch = useDispatch();

  /* Local State */
  const [activeStep, setActiveStep] = useState(sequence - 1);

  /* Store Imports */
  const user = useSelector((store) => store.user);

  const stepColor = delay ? '#fdcb43' : '#1e565c';
  const shipSteps = ['Pre-Shipment', 'In Transit', 'Received'];
  const testSteps = [
    'Queued',
    'In Vitro',
    'RNA',
    'Library Prep',
    'Sequencing',
    'Analyzing',
    'Complete',
  ];

  const StepIconStyles = makeStyles({
    root: {
      color: '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    active: {
      color: stepColor,
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: stepColor,
      zIndex: 1,
      fontSize: 18,
    },
  });

  // Sets up the icons for the stepper
  const StepIcon = (props) => {
    const classes = StepIconStyles();
    const { active, completed } = props;

    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {active && delay ? (
          <ErrorOutline className={classes.completed} />
        ) : completed ? (
          <Check className={classes.completed} />
        ) : (
          <div className={classes.circle} />
        )}
      </div>
    );
  }; // end StepIcon

  const handleClick = (step) => {
    // Click only functions for lab or admin
    if (user.authLevel === 'lab' || user.authLevel === 'admin') {
      changeStep(step);

      // Changes the visual on the stepper to match
      setActiveStep(step - 1);
    }
  }; //end handleClick

  return (
    <>
      {/* Render different steps depending on the test state */}
      {state === 'SHIP' ? (
        <Stepper activeStep={activeStep} alternativeLabel>
          {shipSteps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel
                  StepIconComponent={StepIcon}
                  onClick={() => handleClick(index + 1)}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      ) : (
        <Stepper activeStep={activeStep} alternativeLabel>
          {testSteps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel
                  StepIconComponent={StepIcon}
                  onClick={() => handleClick(index + 1)}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}
    </>
  );
}

export default SampleProgress;
