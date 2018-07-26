import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

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

class TripEndFrom extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <TextField
                required
                placeholder="ending odometer"
                type="number"
                label="ending odometer"
                name="endingOdometer"
                fullWidth
                onChange={this.props.handleChange}
                defaultValue={this.props.lastOdometer}
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <TextField
                type="number"
                name="wages"
                label="wages: $ / hour"
                fullWidth
                onChange={this.props.handleChange}
                defaultValue={this.props.defaultWage}
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <TextField
                placeholder="hours"
                type="number"
                label="hours"
                name="hours"
                fullWidth
                onChange={this.props.handleChange}
                defaultValue={this.props.timePassed}
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <FormControl fullWidth className={classes.margin}>
                <TextField
                  type="number"
                  label="total tips"
                  name="tips"
                  fullWidth
                  onChange={this.props.handleChange}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                />
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TextField
                placeholder="description"
                label="description"
                name="description"
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
              end trip
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

TripEndFrom.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TripEndFrom);
