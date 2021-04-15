import { useState, useEffect } from 'react';

import { Stepper, Step, StepLabel } from '@material-ui/core';
import { Check, ErrorOutline } from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import './SampleProgress.css';

function SampleProgress({ step, delay }) {
  const [activeStep, setActiveStep] = useState('');

  useEffect(() => {
    switch (step) {
      case 'Queued':
        setActiveStep(0);
        break;
      case 'In Vitro':
        setActiveStep(1);
        break;
      case 'RNA':
        setActiveStep(2);
        break;
      case 'Library Prep':
        setActiveStep(3);
        break;
      case 'Sequencing':
        setActiveStep(4);
        break;
      case 'Analyzing':
        setActiveStep(5);
        break;
      case 'Complete':
        setActiveStep(6);
        break;
    }
  }, []);

  function StepIcon(props) {
    const classes = StepIconStyles();
    const { active, completed } = props;

    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? (
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
      color: '#1e565c',
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: '#1e565c',
      zIndex: 1,
      fontSize: 18,
    },
  });

  return (
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
    </Stepper>
  );
}

export default SampleProgress;
