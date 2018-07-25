import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    margin: 20,
    maxWidth: 500,
    alignContent: 'center'
  },
  margin: {
    margin: theme.spacing.unit
  }
});

function Login(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Paper className={classes.root} elevation={1} justify="center">
        <Typography variant="headline" component="h3">
          Log In
        </Typography>
        <TextField
          name="username"
          required
          label="username"
          className={classes.textField}
          margin="normal"
          fullWidth
          onChange={props.handleChange}
        />
        <Tooltip title="Case Sensitive">
          <TextField
            name="password"
            required
            label="password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            fullWidth
            onChange={props.handleChange}
          />
        </Tooltip>

        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={props.handleSubmit}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button size="large" variant="contained" href="/signup">
              New User
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
