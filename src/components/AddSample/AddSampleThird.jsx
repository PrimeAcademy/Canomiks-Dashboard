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
  newHarvestDate,
}) {
  /* Tool Tips */
  const regionText = `If known please add the region where the plant was grown. If ingredient was extracted from plants grown in more than one region, please write that in the blank space.`;
  const harvestDateText = `When was the plant harvested?`;
  const sustainabilityText = `Add information about sustainability such as fair trade, water conservation practices for the crop, sustainability certifications here.`;

  return (
    <Paper style={{ padding: 17, maxWidth: 'fit-content' }}>
      {/* Growth Region */}
      <Typography variant="body1">
        Growth Region:
        <Tooltip
          arrow
          title={regionText}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="top-center"
        >
          <InfoOutlined />
        </Tooltip>
      </Typography>
      <div>
        <TextField
          label="City"
          type="text"
          variant="standard"
          value={currentSample.city}
          onFocus={() => setCurrentInput('city')}
          onBlur={() => focusChange(currentSample.city)}
          onChange={(event) => enterInfo(event.target.value)}
          required
        />
      </div>
      <div>
        <TextField
          label="State"
          type="text"
          variant="standard"
          value={currentSample.state}
          onFocus={() => setCurrentInput('state')}
          onBlur={() => focusChange(currentSample.state)}
          onChange={(event) => enterInfo(event.target.value)}
          required
        />
      </div>

      <div>
        <TextField
          label="Country"
          type="text"
          variant="standard"
          value={currentSample.country}
          onFocus={() => setCurrentInput('country')}
          onBlur={() => focusChange(currentSample.country)}
          onChange={(event) => enterInfo(event.target.value)}
          required
        />
      </div>

      {/* Harvest Date */}
      <div>
        <TextField
          label="Harvest Date"
          type="date"
          id="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={newHarvestDate}
          onFocus={() => setCurrentInput('harvestDate')}
          onBlur={() => focusChange(currentSample.harvestDate)}
          onChange={(e) => enterInfo(e.target.value)}
        />
        <Tooltip
          arrow
          title={harvestDateText}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="top-center"
        >
          <InfoOutlined />
        </Tooltip>
      </div>

      {/* Sustainability Info */}
      <div>
        <TextField
          label="Sustainability Info"
          type="text"
          variant="standard"
          value={currentSample.sustainabilityInfo}
          onFocus={() => setCurrentInput('sustainabilityInfo')}
          onBlur={() => focusChange(currentSample.sustainabilityInfo)}
          onChange={(event) => enterInfo(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  arrow
                  title={sustainabilityText}
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
