import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


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
        <Grid container >
            <Grid item xs={12}></Grid>
                  <Grid item xs={12}>
                      <FormControlLabel
                          control={
                              <Switch
                                  checked={false}
                                  onChange={props.handleChange}
                                  value="checkedB"
                                  color="primary"
                              />
                          }
                          label="dark theme"
                      />
                  </Grid>
                  <Grid item xs={12}>
                      {/*item*/}
                  </Grid>
                  <Grid item xs={12}>
                      {/*item*/}
                  </Grid>
                  <Grid item xs={12}>
                      {/*change password*/}
                  </Grid>
                  <Grid item xs={12}>
                      {/*delete account*/}
                  </Grid>
                  <Grid item xs={12}>
                      {/*Questions or issues? Email me @ email@email.com*/}
                  </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

SettingsComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SettingsComponent);
