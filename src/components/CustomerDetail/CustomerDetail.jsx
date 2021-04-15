import moment from 'moment';

import SampleProgress from '../SampleProgress/SampleProgress';

import { DialogContent, DialogContentText } from '@material-ui/core';

import './CustomerDetail.css';

function CustomerDetail({ sample }) {
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
          <div className="delay-alert">
            Test Delayed - more information will be provided via email
          </div>
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
      </DialogContentText>
    </DialogContent>
  );
}

export default CustomerDetail;
