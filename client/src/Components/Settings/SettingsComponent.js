import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 800,
    width: '75%',
    margin: 20
  }
});

function SettingsComponent(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
          Account Settings
        </Typography>
        <Typography component="p">
          Paper can be used to buil 
        </Typography>
      </Paper>
    </div>
  );
}

SettingsComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SettingsComponent);
