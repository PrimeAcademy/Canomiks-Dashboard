import {
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Dialog,
  Button,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Typography,
  Grid,
  Paper,
  Divider,
  Fade,
  Tooltip,
  Container,
  InputAdornment,
} from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';

function AddSampleThird({
  currentSample,
  setCurrentInput,
  focusChange,
  enterInfo,
  newDateManufactured,
}) {
  /* Tool Tips */
  const dateText = `Add the date that the ingredient was extracted or manufactured. For more detailed instructions, please refer to the instruction manual.`;
  const extractionText = `Add the extraction method such as ethanol, water etc. for the extraction of the ingredient. If no extraction method was used, please write the concentrator method for the ingredient. For more detailed instructions, please refer to the instruction manual.`;
  const strainText = `If known please add the exact strain of the crop.`;

  return (
    <Paper style={{ padding: 17, maxWidth: 'fit-content' }}>
      {/* Manufactured Date */}
      <div>
        <TextField
          label="Date Manufactured"
          type="date"
          id="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={newDateManufactured}
          onFocus={() => setCurrentInput('dateManufactured')}
          onBlur={() => focusChange(currentSample.dateManufactured)}
          onChange={(e) => enterInfo(e.target.value)}
        />
        <Tooltip
          arrow
          title={dateText}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="top-center"
        >
          <InfoOutlined />
        </Tooltip>
      </div>

      {/* Extraction Method */}
      <div>
        <TextField
          onFocus={() => setCurrentInput('extractionMethod')}
          onBlur={() => focusChange(currentSample.extractionMethod)}
          label="Extraction Method"
          variant="standard"
          value={currentSample.extractionMethod}
          type="text"
          onChange={(event) => enterInfo(event.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  arrow
                  title={extractionText}
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  placement="top-center"
                >
                  <InfoOutlined />
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Crop Strain */}
      <div>
        <TextField
          label="Strain Of Crop"
          variant="standard"
          type="text"
          value={currentSample.cropStrain}
          onFocus={() => setCurrentInput('cropStrain')}
          onBlur={() => focusChange(currentSample.cropStrain)}
          onChange={(event) => enterInfo(event.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  arrow
                  title={strainText}
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  placement="top-center"
                >
                  <InfoOutlined />
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </Paper>
  );
}

export default AddSampleThird;
