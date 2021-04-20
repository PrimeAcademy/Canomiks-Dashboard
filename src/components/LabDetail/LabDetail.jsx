import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SampleProgress from '../SampleProgress/SampleProgress';

import {
  DialogContent,
  DialogContentText,
  Button,
  IconButton,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ErrorOutline } from '@material-ui/icons';

function LabDetail({ setOpenDetail }) {
  const history = useHistory();
  const dispatch = useDispatch();

  /* Store Imports */
  const currentSample = useSelector((store) => store.orders.currentSample);

  const markDelay = () => {
    console.log('in delayed');

    //dispatch that toggled delay status
  }; // end markDelay

  const handleSave = () => {
    // TO DO - Add confirmation reminding them the customer will be alerted
    // TO DO - trigger email alerts
    dispatch({
      type: 'UPDATE_SAMPLE_LAB',
      payload: currentSample,
    });

    setOpenDetail(false);
  }; // end handleSave

  const handleCancel = () => {
    dispatch({
      type: 'CLEAR_CURRENT_SAMPLE',
    });

    setOpenDetail(false);
  }; // end handleCancel

  return (
    <DialogContent>
      <DialogContentText>
        <SampleProgress
          sequence={currentSample.sequence}
          state={currentSample.testState}
          delay={currentSample.delayed}
        />

        {/* Render warning if sample is delayed*/}
        {currentSample.delayed && (
          <Alert icon={<ErrorOutline />} severity="warning">
            <AlertTitle>Test Currently Delayed</AlertTitle>
          </Alert>
        )}

        <h2>Lot # {currentSample.lotNumber}</h2>
        <h3>{currentSample.companyName}</h3>

        <div>
          <p>Product: {currentSample.ingredientName}</p>
          <p>
            Amount: {currentSample.ingredientAmount}{' '}
            {currentSample.ingredientUnit}
          </p>
          <p>Format: {currentSample.format}</p>
          {currentSample.purity && <p>Purity: {currentSample.purity}</p>}
          {currentSample.cropStrain && (
            <p>Strain: {currentSample.cropStrain}</p>
          )}
        </div>

        <div>
          <p>
            Manufacture Date:{' '}
            {moment(currentSample.dateManufactured).format('M/YYYY')}
          </p>
          <p>Extraction Method: {currentSample.extractionMethod}</p>
          {(currentSample.city ||
            currentSample.state ||
            currentSample.country) && (
            <p>
              Growth Region: {currentSample.city}, {currentSample.state},{' '}
              {currentSample.country}
            </p>
          )}
          {currentSample.harvestDate && (
            <p>
              Harvest Date: {moment(currentSample.harvestDate).format('M/YYYY')}
            </p>
          )}
          {currentSample.sustainabilityInfo && (
            <p>Sustainability: {currentSample.sustainabilityInfo}</p>
          )}
        </div>

        {/* Render Review button if the sample is in pre-shipment */}
        {currentSample.statusName === 'Complete' && !currentSample.pdfUrl && (
          <Button
            variant="contained"
            onClick={() => history.push(`/sample/${currentSample.id}`)}
          >
            Upload Results
          </Button>
        )}

        {/* Render download button if sample is complete and results are uploaded */}
        {currentSample.pdfUrl && (
          <div>
            <Button
              variant="contained"
              onClick={() => window.open(currentSample.pdfUrl)}
            >
              Download Results
            </Button>
          </div>
        )}

        <Button variant="contained" onClick={handleCancel}>
          Cancel Changes
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
        <Button variant="contained" onClick={markDelay}>
          Mark Delayed
        </Button>
      </DialogContentText>
    </DialogContent>
  );
}

export default LabDetail;
