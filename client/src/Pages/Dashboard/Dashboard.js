import React, { Component } from 'react';
import TripStartForm from '../../Components/Trips/TripStartForm/TripStartForm';
import TripEndForm from '../../Components/Trips/TripEndForm/TripEndForm';
import BottomNav from '../../Components/BottomNav';
import axios from 'axios';

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
  }

  componentWillMount() {
    let url = `/api/user/${localStorage.getItem('userId')}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );

    axios.get(url).then(res => {
      console.log(res.data)
      this.setState({
        lastWages: res.data.defaultWage,
        tripStarted: res.data.tripStarted
      })
    })
  }

  clearState = () => {
    this.setState({
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
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: parseInt(event.target.value, 10) });
  }

  handleSubmit = () => {
    let income = this.state.tips + this.state.wages;
    let currentTrip = localStorage.getItem('currentTrip');
    let formData = {
      startingOdometer: this.state.startingOdometer,
      endingOdometer: this.state.endingOdometer,
      miles: this.state.miles,
      hours: this.state.hours,
      wages: this.state.wages,
      tips: this.state.tips,
      income: income,
      description: this.state.description,
      tripCompleted: this.state.tripCompleted
    };

    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );

    if (currentTrip) {
      axios
        .put(`/api/updateTrip/${currentTrip}`, formData)
        .then(res => console.log(res))
        .catch(err => console.log(err));
      localStorage.removeItem('currentTrip');
      this.setState({ tripStarted: false });
      this.clearState();
    } else {
      axios
        .post('/api/newTrip', formData)
        .then(res => localStorage.setItem('currentTrip', res.data._id))
        .catch(err => console.log(err));
      this.setState({ tripStarted: true });
    }
  }

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
