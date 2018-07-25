import React, { Component } from 'react';
import SettingsComponent from '../../Components/Settings';
import BottomNavComponent from '../../Components/BottomNav';

class Settings extends Component {
  state = {}

  render() {
    return (
      <div>
        <SettingsComponent />
        <BottomNavComponent currentPage={2} />
      </div>
    );
  }
}

export default Settings;
