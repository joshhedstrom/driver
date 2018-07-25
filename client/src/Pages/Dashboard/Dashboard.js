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
    tripCompleted: false,
    description: ''
  };

  componentWillMount() {
    //axios call to get initial starting odometer
    this.setState({ startingValue: 145600 });
  }

  handleStartTrip = () => {
    this.setState({ tripStarted: true });
    // axios request to start new trip
    this.forceUpdate();
  };

  handleEndTrip = () => {
    //axios request to update trip
  };

  handleChange = event => {
    this.setState({ [event.target.name]: parseInt(event.target.value, 10) });
  };

  handleSubmitForm = () => {
    let income = this.state.tips + this.state.wages;
    let formData = {
      startingOdometer: this.state.startingOdometer,
      endingOdometer: this.state.endingOdometer,
      miles: this.state.miles,
      hours: this.state.hours,
      wages: this.state.wages,
      tips: this.state.tips,
      income: income,
      tripCompleted: this.state.tripCompleted
    };

    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );
    axios
      .post('/api/newtrip', formData)
      .then(data => console.log(data))
      .catch(err => {
        console.log(err);
      });
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
