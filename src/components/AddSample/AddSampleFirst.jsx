import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  Paper,
  Fade,
  Tooltip,
  Grid,
  InputLabel,
} from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';

function AddSampleFirst({
  currentSample,
  setCurrentInput,
  focusChange,
  enterInfo,
}) {
  /* Tool Tips */
  const nameText = `Pick an ingredient from this menu. If your ingredient is not listed, please use the 'other' option. For more detailed instructions, refer to the instruction manual.`;
  const lotText = `Please use the lot number you have created for this batch. For more detailed instructions, refer to the instruction manual.`;
  const formatText = `Select the proper ingredient format. For more detailed instructions, please refer to the instruction manual.`;
  const purityText = `Add percent purity of the active ingredient if known. For more detailed instructions, please refer to the instruction manual.`;

  return (
    <Paper style={{ padding: 17, maxWidth: 'fit-content' }}>
      <Grid container justify="flex-start" alignItems="center" spacing={1}>
        {/* Ingredient Name */}
        <Grid item>
          <FormControl variant="standard">
            <InputLabel id="ingredient">Ingredient Name</InputLabel>
            <Select
              labelId="ingredient"
              value={currentSample.ingredientName}
              onFocus={() => setCurrentInput('ingredientName')}
              onBlur={() => focusChange(currentSample.ingredientName)}
              onChange={(event) => enterInfo(event.target.value)}
              style={{ width: 200 }}
            >
              <MenuItem value="" disabled>
                Ingredient Name
              </MenuItem>
              <MenuItem value={'CBD'}>CBD</MenuItem>
              <MenuItem value={'Other'}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Tooltip
            arrow
            title={nameText}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement="right-center"
            style={{ marginBottom: -15 }}
          >
            <InfoOutlined />
          </Tooltip>
        </Grid>

        {/* Lot Number */}
        <Grid item>
          <FormControl variant="standard">
            <TextField
              label="Lot Number"
              type="text"
              variant="standard"
              value={currentSample.lotNumber}
              onFocus={() => setCurrentInput('lotNumber')}
              onBlur={() => focusChange(currentSample.lotNumber)}
              onChange={(event) => enterInfo(event.target.value)}
              required
            />
          </FormControl>
        </Grid>

        <Grid item>
          <Tooltip
            arrow
            title={lotText}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement="right-center"
            style={{ marginBottom: -15 }}
          >
            <InfoOutlined />
          </Tooltip>
        </Grid>

        {/* Ingredient Format */}
        <Grid item>
          <FormControl variant="standard">
            <InputLabel id="format">Product Format</InputLabel>
            <Select
              labelId="format"
              value={currentSample.format}
              onFocus={() => setCurrentInput('format')}
              onBlur={() => focusChange(currentSample.format)}
              onChange={(e) => enterInfo(e.target.value)}
              style={{ width: 200 }}
            >
              <MenuItem value="" disabled>
                Pick a Format
              </MenuItem>
              <MenuItem value={'Powder'}>Powder</MenuItem>
              <MenuItem value={'Tincture'}>Tincture</MenuItem>
              <MenuItem value={'Oil'}>Oil</MenuItem>
              <MenuItem value={'Other'}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Tooltip
            arrow
            title={formatText}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement="right-center"
            style={{ marginBottom: -15 }}
          >
            <InfoOutlined />
          </Tooltip>
        </Grid>

        {/* Sample Amount */}
        <Grid item xs={5}>
          <FormControl variant="standard" style={{ marginBottom: 4 }}>
            <TextField
              label="Amount"
              type="text"
              variant="standard"
              value={currentSample.ingredientAmount}
              onFocus={() => setCurrentInput('ingredientAmount')}
              onBlur={() => focusChange(currentSample.ingredientAmount)}
              onChange={(event) => enterInfo(event.target.value)}
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={5}>
          <FormControl variant="standard" style={{ marginBottom: -15 }}>
            <Select
              value={currentSample.ingredientUnit}
              onFocus={() => setCurrentInput('ingredientUnit')}
              onBlur={() => focusChange(currentSample.ingredientUnit)}
              onChange={(e) => enterInfo(e.target.value)}
              style={{ width: 100 }}
              fullWidth
            >
              <MenuItem value="" disabled>
                Unit
              </MenuItem>
              <MenuItem value={'Milligrams'}>Milligrams</MenuItem>
              <MenuItem value={'Grams'}>Grams</MenuItem>
              <MenuItem value={'Ounces'}>Ounces</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={1}>
          <Tooltip
            arrow
            title={formatText}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement="right-center"
            style={{ marginBottom: -10 }}
          >
            <InfoOutlined />
          </Tooltip>
        </Grid>

        {/* Purity */}
        <Grid item xs={6}>
          <FormControl variant="standard">
            <TextField
              label="Purity"
              type="text"
              variant="standard"
              value={currentSample.purity}
              onFocus={() => setCurrentInput('purity')}
              onBlur={() => focusChange(currentSample.purity)}
              onChange={(event) => enterInfo(event.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item>
          <Tooltip
            arrow
            title={purityText}
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

export default AddSampleFirst;
