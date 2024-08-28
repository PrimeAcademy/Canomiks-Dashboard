// library imports
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// custom components
import SampleProgress from '../SampleProgress/SampleProgress';

// style page
import './CustomerDetail.css';

// material ui
import {
  DialogContent,
  DialogContentText,
  Button,
  IconButton,
  Typography,
  DialogActions,
  Paper,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ErrorOutline, ArrowForwardIos } from '@material-ui/icons';

// bring in the sample that was clicked as a prop
function CustomerDetail({ sample }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const reviewSample = (sample) => {
    dispatch({
      type: 'SET_CURRENT_SAMPLE',
      payload: sample,
    });

    history.push('/sample/add');
  }; // end reviewSample

  return (
    <DialogContent>
      <DialogContentText>
        <SampleProgress sample={sample} />

        {/* Render warning if sample is delayed*/}
        {sample.delayed ? (
          <Alert icon={<ErrorOutline />} severity="warning">
            <AlertTitle>
              <strong>Lot #{sample.lotNumber}</strong> - Test Delayed
            </AlertTitle>
            More information will be available via email.
          </Alert>
        ) : (
          <>
            <Typography align="center" variant="h2">
              Lot # {sample.lotNumber}
            </Typography>
            <Typography align="center" variant="h3">
              {sample.ingredientName}
            </Typography>
          </>
        )}

        {/* Render warning if there is no shipping information */}
        {!sample.shippedDate && (
          <Alert
            icon={<ErrorOutline />}
            severity="warning"
            action={
              <IconButton
                color="inherit"
                size="small"
                onClick={() => reviewSample(sample)}
                disableRipple
              >
                <ArrowForwardIos />
              </IconButton>
            }
          >
            <AlertTitle>Missing Shipping information</AlertTitle>
            We cannot process this sample until shipping information is added.
          </Alert>
        )}

        <div className="info-container">
          <Paper style={{ marginTop: 15, padding: 5 }}>
            <p>
              Amount: {sample.ingredientAmount} {sample.ingredientUnit}
            </p>
            <p>Format: {sample.format}</p>
            {sample.purity && <p>Purity: {sample.purity}</p>}
            {sample.cropStrain && <p>Strain: {sample.cropStrain}</p>}
          </Paper>

          <Paper style={{ marginTop: 15, padding: 5 }}>
            <p>
              Manufacture Date:{' '}
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
        {/* Render Review button if the sample is in pre-shipment */}
        {sample.statusName === 'Pre-Shipment' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => reviewSample(sample)}
          >
            Review Sample
          </Button>
        )}

        {/* Render download button if sample is complete and results are uploaded */}
        {sample.pdfUrl && (
          <Button
            variant="contained"
            color="primary"
            style={{ margin: 10 }}
            onClick={() => window.open(sample.pdfUrl)}
          >
            View Results
          </Button>
        )}
      </DialogActions>
    </DialogContent>
  );
}

export default CustomerDetail;
