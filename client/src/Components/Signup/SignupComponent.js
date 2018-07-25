import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  margin: {
    margin: theme.spacing.unit
  },
  buttonStyle: {
    textAlign: 'center'
  }
});

function Signup(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
          create an account
        </Typography>
        <h4>{props.message}</h4>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              name="firstName"
              label="first name"
              margin="normal"
              fullWidth
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              name="lastName"
              label="last name"
              margin="normal"
              fullWidth
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              name="username"
              label="username"
              margin="normal"
              fullWidth
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="password"
              label="password"
              type="password"
              margin="normal"
              fullWidth
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="passwordConfirmation"
              label="confirm password"
              type="password"
              margin="normal"
              fullWidth
              onChange={props.handleChange}
            />
          </Grid>
          <Grid className={classes.buttonStyle} item xs={12}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={props.handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
