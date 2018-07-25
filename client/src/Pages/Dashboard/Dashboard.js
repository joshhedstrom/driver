import React, { Component } from 'react';
import TripStartForm from '../../Components/Trips/TripStartForm/TripStartForm';
import TripEndForm from '../../Components/Trips/TripEndForm/TripEndForm';
import BottomNav from '../../Components/BottomNav';

class Dashboard extends Component {
  state = {
    tripStarted: false,
    startingValue: 0,
    startingEndValue: 0,
    startingOdometer: 0,
    endingOdometer: 0,
    miles: 0,
    hours: 0,
    tips: 0,
    wages: 0,
    lastWages: 10,
    description: ''
  }

  componentWillMount() {
    //axios call to get initial starting odometer
    this.setState({ startingValue: 145600 });
  }

  handleStartTrip = () => {
    this.setState({ tripStarted: true });
    // axios request to start new trip
  };

  handleEndTrip = () => {
    //axios request to update trip
  };

  handleChange = event => {
    this.setState({ [event.target.name]: parseInt(event.target.value, 10) });
  };

  render() {
    return (
      <div>
        {this.state.tripStarted ? (
          <TripEndForm 
          handleChange={this.handleChange}
          handleEndTrip={this.handleEndTrip}
          startingValue={this.startingValue}
          timePassed={2.5}
          lastWages={this.state.lastWages}
          startingEndValue={this.state.startingEndValue}
          />
        ) : (
          <TripStartForm
            startingValue={this.state.startingValue}
            handleStartTrip={this.handleStartTrip}
            handleChange={this.handleChange}
          />
        )}
        <BottomNav currentPage={0} />
      </div>
    );
  }
}

export default Dashboard;
