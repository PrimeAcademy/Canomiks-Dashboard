import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// custom components
import SampleProgress from '../SampleProgress/SampleProgress';

// material ui
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Divider,
  Paper,
  Typography,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ErrorOutline } from '@material-ui/icons';

// S3 upload
require('dotenv').config();
const AWS = require('aws-sdk');
import S3FileUpload from 'react-s3';
import ReactDom from 'react-dom';
import uploadFile from 'react-s3';

const config = {
  bucketName: process.env.REACT_APP_AWS_BUCKET,
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  headers: { 'Access-Control-Allow-Origin': '*' },
  ACL: 'public-read',
};

function LabDetail({ setOpenDetail, originalSample }) {
  const dispatch = useDispatch();

  // get states from redux store
  const user = useSelector((store) => store.user);
  const orders = useSelector((store) => store.orders.orderReducer);

  // local states
  const [sample, setSample] = useState(originalSample);

  const markDelay = () => {
    setSample({ ...sample, delayed: !sample.delayed });
  }; // end markDelay

  const uploadPDF = (event) => {
    S3FileUpload.uploadFile(event.target.files[0], config)
      .then((data) => {
        setSample({ ...sample, pdfUrl: data.location });
      })
      .catch((err) => console.error(err));
  }; // end uploadPDF

  const changeStep = (step) => {
    if (step === 3 && sample.testState === 'SHIP') {
      setSample({ ...sample, receivedDate: new Date(), sequence: step });
    } else {
      setSample({ ...sample, sequence: step });
    }
  }; // end changeStep

  const moveToQueue = () => {
    setSample({ ...sample, testState: 'CBDTEST', sequence: 1 });
  }; // end moveToQueue

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
              <strong>Lot #{sample.lotNumber}</strong> - Test Delayed
            </AlertTitle>
            {sample.companyName}
          </Alert>
        ) : (
          <>
            <Typography align="center" variant="h2">
              Lot #{sample.lotNumber}
            </Typography>
            <Typography align="center" variant="h3">
              {sample.companyName}
            </Typography>
          </>
        )}

        <div className="info-container">
          <Paper style={{ marginTop: 15, padding: 5 }}>
            <p>Product: {sample.ingredientName}</p>
            <p>
              Amount: {sample.ingredientAmount} {sample.ingredientUnit}
            </p>
            <p>Format: {sample.format}</p>
            {sample.purity && <p>Purity: {sample.purity}</p>}
            {sample.cropStrain && <p>Strain: {sample.cropStrain}</p>}
          </Paper>

          <Paper style={{ marginTop: 15, padding: 5 }}>
            <p>
              Manufactured Date:
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
          </Paper>
        </div>
      </DialogContentText>

      <DialogActions>
        <Button
          variant="outlined"
          size="small"
          style={{
            margin: 5,
            marginRight: 120,
          }}
          onClick={() => setOpenDetail(false)}
        >
          Cancel Changes
        </Button>

        {/* Render button when sample is received to move it into the queue */}
        {sample.sequence === 3 && sample.testState === 'SHIP' && (
          <Button variant="contained" onClick={moveToQueue}>
            Move to Queue
          </Button>
        )}

        {/* Render Upload button if the sample is complete with no results */}
        {sample.sequence === 7 && !sample.pdfUrl && (
          <Button
            component="label"
            variant="contained"
            color="primary"
            size="small"
            style={{ margin: 5 }}
          >
            Upload PDF
            <input
              type="file"
              hidden
              onChange={(event) => uploadPDF(event)}
            ></input>
          </Button>
        )}

        {/* Render download button if sample is complete and results are uploaded */}
        {sample.pdfUrl && (
          <div>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => window.open(sample.pdfUrl)}
            >
              View Results
            </Button>
          </div>
        )}

        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={markDelay}
        >
          {sample.delayed ? 'Un-mark Delay' : 'Mark Delay'}
        </Button>

        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </DialogActions>
    </DialogContent>
  );
}

export default LabDetail;
