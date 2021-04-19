import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Stepper, Step, StepLabel } from '@material-ui/core';
import { Check, ErrorOutline } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import './SampleProgress.css';

function SampleProgress({ sequence, state, delay }) {
  const [activeStep, setActiveStep] = useState(sequence - 1);

  const user = useSelector((store) => store.user);

  const stepColor = delay ? '#fdcb43' : '#1e565c';
  const shipSteps = ['Pre-Shipment', 'In Transit', 'Received'];
  const testSteps = [
    'Queued',
    'In Vitro',
    'Library Prep',
    'Sequencing',
    'Analyzing',
    'Complete',
  ];

  // Sets up the icons for the stepper
  function StepIcon(props) {
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
  }

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

  const handleClick = (step) => {
    // Click only functions for lab or admin
    if (user.authLevel === 'lab' || user.authLevel === 'admin') {
      console.log('in click', step);
    }
  }; //end handleClick

  return (
    <>
      {/* Render different steps depending on the test state */}
      {state === 'SHIP' ? (
        <Stepper activeStep={activeStep} alternativeLabel>
<<<<<<< HEAD
          {shipSteps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
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
=======
          <Step>
            <StepLabel StepIconComponent={StepIcon}>Pre-Shipment</StepLabel>
          </Step>

          <Step>
            <StepLabel StepIconComponent={StepIcon}>In Transit</StepLabel>
          </Step>

          <Step>
            <StepLabel StepIconComponent={StepIcon}>Received</StepLabel>
          </Step>
        </Stepper>
      ) : (
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel StepIconComponent={StepIcon}>Queued</StepLabel>
          </Step>

          <Step>
            <StepLabel StepIconComponent={StepIcon}>In Vitro</StepLabel>
          </Step>

          <Step>
            <StepLabel StepIconComponent={StepIcon}>RNA</StepLabel>
          </Step>

          <Step>
            <StepLabel StepIconComponent={StepIcon}>Library Prep</StepLabel>
          </Step>

          <Step>
            <StepLabel StepIconComponent={StepIcon}>Sequencing</StepLabel>
          </Step>

          <Step>
            <StepLabel StepIconComponent={StepIcon}>Analyzing</StepLabel>
          </Step>

          <Step>
            <StepLabel StepIconComponent={StepIcon}>Complete</StepLabel>
          </Step>
>>>>>>> 356e35d2d96fe3e65fb8ecddc629f2ded9701877
        </Stepper>
      )}
    </>
  );
}

export default SampleProgress;
