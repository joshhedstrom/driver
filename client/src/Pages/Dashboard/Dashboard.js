import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TripStartForm from '../../Components/Trips/TripStartForm/TripStartForm';
import TripEndFrom from '../../Components/Trips/TripEndForm/TripEndForm';

class Dashboard extends Component {
  state = {
    tripStarted: false,
    startingValue: 0,
    startingOdometer: 0,
    endingOdometer: 0,
    miles: 0,
    hours: 0,
    tips: 0,
    wage: 0,
    description: ''
  }

  componentWillMount(){
    this.setState({startingValue: 145600})
    //axios call to get initial starting odometer
  }

  handleStartTrip = () => {
    this.setState({tripStarted: true})
    // axios request to start new trip
  }

  handleChange = event => {
    this.setState({[event.target.name]: parseInt(event.target.value)})
  }

  // renderRedirect = () => {
  //   if (!localStorage.getItem('jwtToken')) {
  //     return <Redirect to="/login" />;
  //   }
  // }
  // {this.renderRedirect()}

  render() {
    return (
      <div>
        <TripStartForm
        startingValue={this.state.startingValue}
        handleStartTrip={this.handleStartTrip}
        handleChange={this.handleChange}
         />
      </div>
    );
  }
}

export default Dashboard;
