import {
  TextField,
  Typography,
  Grid,
  Paper,
  Fade,
  Tooltip,
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
      <Grid container justify="flex-start" alignItems="center" spacing={1}>
        {/* Growth Region */}
        <Grid item>
          <Typography variant="body1">Growth Region:</Typography>
        </Grid>

        <Grid item>
          <Tooltip
            arrow
            title={regionText}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement="right-center"
            style={{ marginBottom: -5 }}
          >
            <InfoOutlined />
          </Tooltip>
        </Grid>

        <Grid item>
          <TextField
            label="City"
            type="text"
            variant="standard"
            style={{ width: 200 }}
            value={currentSample.city}
            onFocus={() => setCurrentInput('city')}
            onBlur={() => focusChange(currentSample.city)}
            onChange={(event) => enterInfo(event.target.value)}
            required
          />
        </Grid>

        <Grid item>
          <TextField
            label="State"
            type="text"
            variant="standard"
            style={{ width: 200 }}
            value={currentSample.state}
            onFocus={() => setCurrentInput('state')}
            onBlur={() => focusChange(currentSample.state)}
            onChange={(event) => enterInfo(event.target.value)}
            required
          />
        </Grid>

        <Grid item>
          <TextField
            label="Country"
            type="text"
            variant="standard"
            style={{ width: 200 }}
            value={currentSample.country}
            onFocus={() => setCurrentInput('country')}
            onBlur={() => focusChange(currentSample.country)}
            onChange={(event) => enterInfo(event.target.value)}
            required
          />
        </Grid>

        {/* Harvest Date */}
        <Grid item>
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
        </Grid>

        <Grid item>
          <Tooltip
            arrow
            title={harvestDateText}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement="right-center"
            style={{ marginBottom: -15 }}
          >
            <InfoOutlined />
          </Tooltip>
        </Grid>

        {/* Sustainability Info */}
        <Grid item>
          <TextField
            label="Sustainability Info"
            type="text"
            variant="standard"
            value={currentSample.sustainabilityInfo}
            onFocus={() => setCurrentInput('sustainabilityInfo')}
            onBlur={() => focusChange(currentSample.sustainabilityInfo)}
            onChange={(event) => enterInfo(event.target.value)}
          />
        </Grid>

        <Grid item>
          <Tooltip
            arrow
            title={sustainabilityText}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement="right-center"
            style={{ marginBottom: -15 }}
          >
            <InfoOutlined />
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AddSampleThird;
