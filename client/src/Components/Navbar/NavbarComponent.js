import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
};

class Navbar extends React.Component {

  logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    window.location.reload();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              <a style={{ textDecoration: 'none', color: 'white' }} href="/">
                driver
              </a>
            </Typography>
            {localStorage.getItem('jwtToken') ? (
              <Button
                style={{ textDecoration: 'none', color: 'white' }}
                onClick={this.logout}
                color="inherit"
              >
                Logout
              </Button>
            ) : (
              <Button
                style={{ textDecoration: 'none', color: 'white' }}
                href="/login"
                color="inherit"
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
