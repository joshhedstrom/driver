import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 20
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  buttonBox: {
    textAlign: 'center'
  }
});

class TripStartFrom extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TextField
                required
                placeholder={`last odometer reading was: ${this.props.lastOdometer}`}
                type="number"
                label="starting odometer"
                name="startingOdometer"
                fullWidth
                onChange={this.props.handleChange}
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
            </Paper>
          </Grid>
          <Grid className={classes.buttonBox} item xs={12}>
            <Button
              onClick={this.props.handleSubmit}
              color="primary"
              variant="outlined"
            >
              start trip
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

TripStartFrom.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TripStartFrom);
