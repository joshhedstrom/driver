import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TripStartForm from '../../Components/Trips/TripStartForm/TripStartForm';
import TripEndForm from '../../Components/Trips/TripEndForm/TripEndForm';
import BottomNav from '../../Components/BottomNav';
import axios from 'axios';
import moment from 'moment';

class Dashboard extends Component {
  state = {
    redirect: false,
    tripStarted: false,
    startingOdometer: 0,
    startDate: 0,
    endDate: 0,
    endingOdometer: 0,
    lastOdometer: 0,
    miles: 0,
    hours: 0,
    tips: 0,
    wage: 0,
    defaultWage: 10,
    tripCompleted: false,
    description: ''
  };

  renderRedirect = () => {
    if (!localStorage.getItem('jwtToken')) {
      return <Redirect to="/login" />;
    }
  };

  componentWillMount() {
    let url = `/api/user/${localStorage.getItem('userId')}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );

    axios
      .get(url)
      .then(res => {
        console.log(res.data);
        this.setState({
          defaultWage: res.data.defaultWage,
          lastOdometer: res.data.lastOdometer,
          startingOdometer: res.data.lastOdometer,
          tripStarted: res.data.tripStarted
        });
      })
      .catch(err => console.log(err));
  }

  clearState = () => {
    this.setState({
      tripStarted: false,
      endingOdometer: 0,
      miles: 0,
      hours: 0,
      tips: 0,
      tripCompleted: false,
      description: ''
    });
  };

  handleChange = event => {
    if (event.target.name === 'description') {
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.setState({ [event.target.name]: parseInt(event.target.value, 10) });
    }
  };

  handleSubmit = () => {
    let userId = localStorage.getItem('userId');
    let income = this.state.tips + this.state.wages;
    let formData = {
      userId: userId,
      startingOdometer: this.state.startingOdometer,
      endingOdometer: this.state.endingOdometer,
      startDate: this.state.startDate,
      endDate: Date.now(),
      miles: this.state.miles,
      hours: this.state.hours,
      wage: this.state.wage,
      tips: this.state.tips,
      income: income,
      description: this.state.description,
      tripCompleted: this.state.tripCompleted
    };

    let currentTrip = localStorage.getItem('currentTrip');
    let userUrl = `/api/user/${localStorage.getItem('userId')}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );

    if (currentTrip) {
      axios
        .put(`/api/updateTrip/${currentTrip}`, formData)
        .then(res => res)
        .catch(err => console.log(err));
      localStorage.removeItem('currentTrip');
      axios
        .put(userUrl, { tripStarted: false, defaultWage: this.state.wages })
        .then(this.clearState())
        .catch(err => console.log(err));
    } else {
      this.setState({ startDate: Date.now() })
        axios
          .post('/api/newTrip', formData)
          .then(res => {
            localStorage.setItem('currentTrip', res.data._id);
            this.setState({
              tripStarted: true,
              lastOdometer: this.state.startingOdometer
            });
            axios
              .put(userUrl, {
                tripStarted: true,
                lastOdometer: this.state.lastOdometer
              })
              .then(res => console.log(res))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err))
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        {this.state.tripStarted ? (
          <TripEndForm
            lastOdometer={this.state.lastOdometer}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            timePassed={this.state.startDate}
            defaultWage={this.state.defaultWage}
          />
        ) : (
          <TripStartForm
            lastOdometer={this.state.lastOdometer}
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
