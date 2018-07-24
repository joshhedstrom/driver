import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TripStartForm from '../../Components/Trips/TripStartForm/TripStartForm';

class Dashboard extends Component {
  state = {}

  // renderRedirect = () => {
  //   if (!localStorage.getItem('jwtToken')) {
  //     return <Redirect to="/login" />;
  //   }
  // }
  // {this.renderRedirect()}

  render() {
    return (
      <div>
        <TripStartForm />
      </div>
    );
  }
}

export default Dashboard;
