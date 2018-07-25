import React, { Component } from 'react';
import TripStartForm from '../../Components/Trips/TripStartForm/TripStartForm';
import TripEndForm from '../../Components/Trips/TripEndForm/TripEndForm';
import BottomNav from '../../Components/BottomNav';
import axios from 'axios';
import { calendarFormat } from '../../../../node_modules/moment';

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

  handleChange = event => {
    this.setState({ [event.target.name]: parseInt(event.target.value, 10) });
  };

  handleSubmit = () => {
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

    let currentTrip = localStorage.getItem('currentTrip');
    if (currentTrip) {
      //update trip
      this.setState({ tripStarted: false });
    } else {
      axios
        .post('/api/newTrip', formData)
        .then(res => localStorage.setItem('currentTrip', res.data._id))
        .catch(err => console.log(err));
      localStorage.removeItem('currentTrip');
      this.setState({ tripStarted: true });
      this.clearForm();
    }
  };

  render() {
    return (
      <div>
        {this.state.tripStarted ? (
          <TripEndForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            startingValue={this.startingValue}
            timePassed={2.5}
            lastWages={this.state.lastWages}
            startingEndValue={this.state.startingEndValue}
          />
        ) : (
          <TripStartForm
            startingValue={this.state.startingValue}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        )}
        <BottomNav currentPage={0} />
      </div>
    );
  }
}

export default Dashboard;
