import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

class TripStartFrom extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TextField
                required
                placeholder="starting odometer"
                type="number"
                label="starting odometer"
                name='startingOdometer'
                fullWidth
                onChange={this.props.handleChange}
                defaultValue={this.props.startingValue}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </Paper>
          </Grid>
          <Button
            onClick={this.props.handleStartTrip}
            color="primary"
            variant="outlined"
          >
            start trip
          </Button>
          {/* <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid> */}
        </Grid>
      </div>
    );
  }
}

TripStartFrom.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TripStartFrom);
