import { TextField, Grid, Paper, Fade, Tooltip } from '@material-ui/core';
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
      <Grid container justify="flex-start" alignItems="center" spacing={1}>
        {/* Manufactured Date */}
        <Grid item>
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
            style={{ width: 200 }}
          />
        </Grid>

        <Grid item>
          <Tooltip
            arrow
            title={dateText}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement="right-center"
            style={{ marginBottom: -15 }}
          >
            <InfoOutlined />
          </Tooltip>
        </Grid>

        {/* Extraction Method */}
        <Grid item>
          <TextField
            label="Extraction Method"
            type="text"
            variant="standard"
            style={{ width: 200 }}
            value={currentSample.extractionMethod}
            onFocus={() => setCurrentInput('extractionMethod')}
            onBlur={() => focusChange(currentSample.extractionMethod)}
            onChange={(event) => enterInfo(event.target.value)}
            required
          />
        </Grid>

        <Grid item>
          <Tooltip
            arrow
            title={extractionText}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement="right-center"
            style={{ marginBottom: -15 }}
          >
            <InfoOutlined />
          </Tooltip>
        </Grid>

        {/* Crop Strain */}
        <Grid item>
          <TextField
            label="Strain Of Crop"
            variant="standard"
            type="text"
            style={{ width: 200 }}
            value={currentSample.cropStrain}
            onFocus={() => setCurrentInput('cropStrain')}
            onBlur={() => focusChange(currentSample.cropStrain)}
            onChange={(event) => enterInfo(event.target.value)}
            required
          />
        </Grid>

        <Grid item>
          <Tooltip
            arrow
            title={strainText}
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
