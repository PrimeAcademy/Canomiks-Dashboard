import { useState, useEffect } from 'react';

import { Stepper, Step, StepLabel } from '@material-ui/core';

import './SampleProgress.css';

function SampleProgress({ step }) {
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

  return (
    <Stepper activeStep={activeStep}>
      <Step>
        <StepLabel>Queued</StepLabel>
      </Step>
      <Step>
        <StepLabel>In Vitro</StepLabel>
      </Step>
      <Step>
        <StepLabel>RNA</StepLabel>
      </Step>
      <Step>
        <StepLabel>Library Prep</StepLabel>
      </Step>
      <Step>
        <StepLabel>Sequencing</StepLabel>
      </Step>
      <Step>
        <StepLabel>Analyzing</StepLabel>
      </Step>
      <Step>
        <StepLabel>Complete</StepLabel>
      </Step>
    </Stepper>
  );
}

export default SampleProgress;
