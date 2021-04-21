import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import SampleProgress from '../SampleProgress/SampleProgress';

import { DialogContent, DialogContentText, Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ErrorOutline } from '@material-ui/icons';

function LabDetail({ setOpenDetail, originalSample }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [sample, setSample] = useState(originalSample);

  const markDelay = () => {
    setSample({ ...sample, delayed: !sample.delayed });
  }; // end markDelay

  const changeStep = (step) => {
    setSample({ ...sample, sequence: step });
  }; // end changeStep

  const handleSave = () => {
    // TO DO - Add confirmation reminding them the customer will be alerted
    // TO DO - trigger email alerts

    // Checks if delayed status has been changed
    if (originalSample.delayed !== sample.delayed) {
      console.log('Trigger Delayed email');
    }

    // Checks if test state has been changed
    if (
      originalSample.sequence !== sample.sequence ||
      originalSample.testState !== sample.testState
    ) {
      console.log('Trigger status update email');
    }

    dispatch({
      type: 'UPDATE_SAMPLE_LAB',
      payload: sample,
    });

    setOpenDetail(false);
  }; // end handleSave

  return (
    <DialogContent>
      <DialogContentText>
        <SampleProgress
          sequence={sample.sequence}
          state={sample.testState}
          delay={sample.delayed}
          changeStep={changeStep}
        />

        {/* Render warning if sample is delayed*/}
        {sample.delayed && (
          <Alert icon={<ErrorOutline />} severity="warning">
            <AlertTitle>Test Currently Delayed</AlertTitle>
          </Alert>
        )}

        <h2>Lot # {sample.lotNumber}</h2>
        <h3>{sample.companyName}</h3>

        <div>
          <p>Product: {sample.ingredientName}</p>
          <p>
            Amount: {sample.ingredientAmount} {sample.ingredientUnit}
          </p>
          <p>Format: {sample.format}</p>
          {sample.purity && <p>Purity: {sample.purity}</p>}
          {sample.cropStrain && <p>Strain: {sample.cropStrain}</p>}
        </div>

        <div>
          <p>
            Manufacture Date:
            {moment(sample.dateManufactured).format('M/YYYY')}
          </p>
          <p>Extraction Method: {sample.extractionMethod}</p>
          {(sample.city || sample.state || sample.country) && (
            <p>
              Growth Region: {sample.city}, {sample.state}, {sample.country}
            </p>
          )}
          {sample.harvestDate && (
            <p>Harvest Date: {moment(sample.harvestDate).format('M/YYYY')}</p>
          )}
          {sample.sustainabilityInfo && (
            <p>Sustainability: {sample.sustainabilityInfo}</p>
          )}
        </div>

        {/* Render Upload button if the sample is complete with no results */}
        {sample.sequence === 7 && !sample.pdfUrl && (
          <Button
            variant="contained"
            onClick={() => history.push(`/sample/${sample.id}`)}
          >
            Upload Results
          </Button>
        )}

        {/* Render download button if sample is complete and results are uploaded */}
        {sample.pdfUrl && (
          <div>
            <Button
              size="small"
              variant="contained"
              onClick={() => window.open(sample.pdfUrl)}
            >
              Download Results
            </Button>
          </div>
        )}

        <Button
          variant="outline"
          size="small"
          style={{
            margin: 5,
            marginRight: 120,
          }}
          variant="outlined"
          onClick={() => setOpenDetail(false)}
        >
          Cancel Changes
        </Button>
        {currentSample.delayed ? (
          <Button
            style={{ margin: 5, backgroundColor: '#1e565c', color: 'white' }}
            size="small"
            color="primary"
            variant="contained"
            onClick={markDelay}
          >
            Clear Delay
          </Button>
        ) : (
          <Button
            style={{ margin: 5, backgroundColor: '#1e565c', color: 'white' }}
            size="small"
            color="primary"
            variant="contained"
            onClick={markDelay}
          >
            Mark Delayed
          </Button>
        )}
        <Button
          style={{ margin: 5, backgroundColor: '#1e565c', color: 'white' }}
          size="small"
          color="primary"
          variant="contained"
          onClick={handleSave}
        >
          Save Changes
        </Button>
        <Button variant="contained" onClick={markDelay}>
          {sample.delayed ? <>Un-mark Delay</> : <>Mark Delay</>}
        </Button>
      </DialogContentText>
    </DialogContent>
  );
}

export default LabDetail;
