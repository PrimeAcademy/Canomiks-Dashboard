import { createMuiTheme, Divider, FormControl, FormControlLabel, Switch, ThemeProvider, Typography } from "@material-ui/core"

const theme = createMuiTheme({
  overrides: {
    MuiSwitch: {
      switchBase: {
        // Controls default (unchecked) color for the thumb
        color: "#1e565c"
      },
      colorSecondary: {
        "&$checked": {
          // Controls checked color for the thumb
          color: "#1e565c"
        }
      },
      track: {
        // Controls default (unchecked) color for the track
        opacity: 0.2,
        backgroundColor: "#1e565c",
        "$checked$checked + &": {
          // Controls checked color for the track
          opacity: 0.7,
          backgroundColor: "#1e565c"
        }
      }
    }
  }
});

function NotifyForm(props) {

  return (
    <ThemeProvider theme={theme}>
      <FormControl component="fieldset">
        <Typography variant="h5" style={{ fontWeight: 600 }} gutterBottom align="left">Notify Me:</Typography>
        <Divider />
        <FormControlLabel
          control={
            <Switch
              checked={props.notifyStatusChange}
              onChange={(event, val) => props.setNotifyStatusChange(val)}
              name="notifyStatusChange"
            />
          }
          label="When there is a change in status"
        />
        <Divider />

        <FormControlLabel
          control={
            <Switch
              checked={props.notifyResultsReady}
              onChange={(event, val) => props.setNotifyResultsReady(val)}
              name="notifyResultsReady"
            />
          }
          label="When results are ready"
        />

        <Divider />

        <FormControlLabel
          control={
            <Switch
              checked={props.notifyDelay}
              onChange={(event, val) => props.setNotifyDelay(val)}
              name="notifyDelay"
            />
          }
          label="If there is an unexpected delay"
        />

      </FormControl>
    </ThemeProvider>
  )
}

export default NotifyForm;
