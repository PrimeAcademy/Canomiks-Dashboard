import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// custom components
import SampleProgress from '../SampleProgress/SampleProgress';

// material ui
import { DialogContent, DialogContentText, Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ErrorOutline } from '@material-ui/icons';

function LabDetail({ setOpenDetail, originalSample }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [sample, setSample] = useState(originalSample);

  const markDelay = () => {
    // Dispatch toggles currentSample delayed status
    dispatch({
      type: 'EDIT_SAMPLE_DELAY', // goes to reducer
      payload: !sample.delayed,
    });

    setSample({ ...sample, delayed: !sample.delayed });
  }; // end markDelay

  const changeStep = (step) => {
    if (step === 3 && sample.testState === 'SHIP') {
      setSample({ ...sample, receivedDate: new Date(), sequence: step });
    } else {
      setSample({ ...sample, sequence: step });
    }
  }; // end changeStep

  const moveToQueue = () => {
    setSample({ ...sample, testState: 'CBDTEST', sequence: 1 });
  };

  const handleSave = () => {
    // TO DO - Add confirmation reminding them the customer will be alerted

    dispatch({
      type: 'UPDATE_SAMPLE_LAB',
      payload: {
        sample,
        sequence: originalSample.sequence,
        testState: originalSample.testState,
      },
    });
    // the email and check is triggered inside the saga

    setOpenDetail(false);
  }; // end handleSave

  return (
    <DialogContent>
      <DialogContentText>
        <SampleProgress
          sequence={sample.sequence}
          state={sample.testState}
          delay={sample.delayed}
          sample={sample}
          changeStep={changeStep}
        />

        {/* Render warning if sample is delayed*/}
        {sample.delayed ? (
          <Alert icon={<ErrorOutline />} severity="warning">
            <AlertTitle>
              Testing Currently Delayed for Lot #{sample.lotNumber}
            </AlertTitle>
          </Alert>
        ) : (
          <h2>Lot # {sample.lotNumber}</h2>
        )}
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

        {/* Render button when sample is received to move it into the queue */}
        {sample.sequence === 3 && sample.testState === 'SHIP' && (
          <Button variant="contained" onClick={moveToQueue}>
            Move to Queue
          </Button>
        )}

        {/* Render Upload button if the sample is complete with no results */}
        {sample.sequence === 7 && !sample.pdfUrl && (
          <Button variant="contained" onClick={() => history.push(`/upload`)}>
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

        <Button
          style={{ margin: 5, backgroundColor: '#1e565c', color: 'white' }}
          size="small"
          color="primary"
          variant="contained"
          onClick={markDelay}
        >
          {sample.delayed ? <>Un-mark Delay</> : <>Mark Delay</>}
        </Button>

        <Button
          style={{ margin: 5, backgroundColor: '#1e565c', color: 'white' }}
          size="small"
          color="primary"
          variant="contained"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </DialogContentText>
    </DialogContent>
  );
}

export default LabDetail;
