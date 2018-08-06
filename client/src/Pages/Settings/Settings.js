import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SettingsComponent from '../../Components/Settings';
import BottomNavComponent from '../../Components/BottomNav';

class Settings extends Component {
  state = { redirect: false };

  renderRedirect = () => {
    if (!localStorage.getItem('jwtToken')) {
      return <Redirect to="/login" />;
    }
  };

  render() {
    {
      this.renderRedirect();
    }
    return (
      <div>
        <SettingsComponent />
        <BottomNavComponent currentPage={2} />
      </div>
    );
  }
}

export default Settings;
