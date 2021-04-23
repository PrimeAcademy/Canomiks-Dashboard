import { Divider, FormControl, FormControlLabel, Switch, Typography } from "@material-ui/core"

function NotifyForm(props) {

  return (
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
  )
}

export default NotifyForm;
