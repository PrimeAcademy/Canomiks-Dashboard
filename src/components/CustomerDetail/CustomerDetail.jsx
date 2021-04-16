import moment from 'moment';
import { useHistory } from 'react-router-dom';

import SampleProgress from '../SampleProgress/SampleProgress';

import { DialogContent, DialogContentText, Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ErrorOutline } from '@material-ui/icons';

import './CustomerDetail.css';

function CustomerDetail({ sample }) {
  const history = useHistory();

  return (
    <DialogContent>
      <DialogContentText>
        <SampleProgress
          sequence={sample.sequence}
          state={sample.testState}
          delay={sample.delayed}
        />

        {/* Check if delayed and have warning */}
        {sample.delayed && (
          <Alert icon={<ErrorOutline />} severity="warning">
            <AlertTitle>Test Delayed</AlertTitle>
            More information will be available via email
          </Alert>
        )}

        <h2>Lot # {sample.lotNumber}</h2>
        <h3>{sample.ingredientName}</h3>

        <div>
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

        {/* Only render Review button if the sample is in pre-shipment */}
        {sample.statusName === 'Pre-Shipment' && (
          <Button
            variant="contained"
            onClick={() => history.push(`/sample/${sample.id}`)}
          >
            Review Sample
          </Button>
        )}
      </DialogContentText>
    </DialogContent>
  );
}

export default CustomerDetail;
