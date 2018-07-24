import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';

class BottomNav extends React.Component {
  render() {
    return (
      <BottomNavigation value={this.props.currentPage} showLabels>
        <BottomNavigationAction
          href="/profile"
          label="profile"
          icon={<PersonIcon />}
        />
            <BottomNavigationAction
                href="/"
                label="dashboard"
                icon={<HomeIcon />}
            />
        <BottomNavigationAction
          href="/history"
          label="past trips"
          icon={<HistoryIcon />}
        />
        <BottomNavigationAction
          href="/settings"
          label="settings"
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    );
  }
}

export default BottomNav;
