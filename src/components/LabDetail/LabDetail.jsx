import moment from 'moment';
import { useHistory } from 'react-router-dom';

import SampleProgress from '../SampleProgress/SampleProgress';

import {
  DialogContent,
  DialogContentText,
  Button,
  IconButton,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ErrorOutline } from '@material-ui/icons';

function LabDetail({ sample }) {
  const history = useHistory();

  const markDelay = () => {
    console.log('in delayed');
    //dispatch that toggled delay status
  }; // end markDelay

  const handleSave = () => {
    console.log('in Save');
  }; // end handleSave

  const handleCancel = () => {
    console.log('in cancel');
  }; // end handleCancel

  return (
    <DialogContent>
      <DialogContentText>
        <SampleProgress
          sequence={sample.sequence}
          state={sample.testState}
          delay={sample.delayed}
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
            Manufacture Date: {moment(sample.dateManufactured).format('M/YYYY')}
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

        {/* Render Review button if the sample is in pre-shipment */}
        {sample.statusName === 'Complete' && !sample.pdfUrl && (
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
              variant="contained"
              onClick={() => window.open(sample.pdfUrl)}
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
