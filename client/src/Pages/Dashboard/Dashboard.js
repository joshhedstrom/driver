import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TripStartForm from '../../Components/Trips/TripStartForm/TripStartForm';
import TripEndForm from '../../Components/Trips/TripEndForm/TripEndForm';
import BottomNav from '../../Components/BottomNav';
import Progress from '../../Components/Progress/Progress';
import axios from 'axios';
import './index.css';

class Dashboard extends Component {
  state = {
    redirect: false,
    tripStarted: false,
    tripCompleted: false,
    currentTripId: '',
    startingOdometer: 0,
    endingOdometer: 0,
    lastOdometer: 0,
    startDate: 0,
    endDate: 0,
    miles: 0,
    hours: 0,
    tips: 0,
    wage: 0,
    defaultWage: 0,
    description: '',
    loading: true
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

    //GETTING USER DATA AND STATUS FROM DATABASE
    axios
      .get(url)
      .then(res => {
        this.setState({
          defaultWage: res.data.defaultWage,
          wage: res.data.defaultWage,
          lastOdometer: res.data.lastOdometer,
          startingOdometer: res.data.lastOdometer,
          tripStarted: res.data.tripStarted,
          loading: false,
          currentTripId: res.data.currentTripId,
          startDate: res.data.currentTripStartTime
        });
      })
      .catch(err => console.log(err));
  }

  clearState = () => {
    let odo = this.state.endingOdometer;
    this.setState({
      lastOdometer: odo,
      endingOdometer: 0,
      miles: 0,
      hours: 0,
      tips: 0,
      description: '',
      tripStarted: false,
      tripCompleted: false
    });
  };

  handleChange = event => {
    if (event.target.name === 'description') {
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.setState({ [event.target.name]: parseFloat(event.target.value) });
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

    let tripStarted = this.state.tripStarted;
    let userUrl = `/api/user/${localStorage.getItem('userId')}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );

    //IF TRIP IS IN PROGRESS
    if (tripStarted) {
      //UPDATE TRIP
      this.setState({ tripCompleted: true });
      axios
        .put(`/api/updateTrip/${this.state.currentTripId}`, formData)
        .then(res => res)
        .catch(err => console.log(err));
      //UPDATE TRIP
      axios
        .patch(userUrl, {
          tripStarted: false,
          defaultWage: this.state.wage,
          lastOdometer: this.state.endingOdometer,
          currentTripId: '',
          currentTripStartTime: 0
        })
        .then(this.clearState())
        .catch(err => console.log(err));
    }
    //IF THERE IS NO TRIP IN PROGRESS
    else {
      this.setState({ startDate: Date.now() });
      //NEW TRIP
      axios
        .post('/api/newTrip', formData)
        .then(res => {
          this.setState({
            tripStarted: true,
            lastOdometer: this.state.startingOdometer,
            currentTripId: res.data._id
          });
          //UPDATE USER
          axios
            .patch(userUrl, {
              tripStarted: true,
              lastOdometer: this.state.startingOdometer,
              currentTripId: res.data._id,
              currentTripStartTime: res.data.startDate
            })
            .then(res => res)
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="Site">
        <div className="Site-content">
          {this.renderRedirect()}
          {this.state.loading ? (
            <Progress />
          ) : this.state.tripStarted ? (
            <TripEndForm
              lastOdometer={this.state.lastOdometer}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              startDate={this.state.startDate}
              defaultWage={this.state.defaultWage}
            />
          ) : (
            <TripStartForm
              lastOdometer={this.state.lastOdometer}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
          )}
        </div>
        <BottomNav className="footer" currentPage={0} />
      </div>
    );
  }
}

export default Dashboard;
