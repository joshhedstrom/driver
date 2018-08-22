import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import HistoryContainer from '../../Components/History/HistoryContainer';
import BottomNav from '../../Components/BottomNav';
import axios from 'axios';

class History extends Component {
  state = {
    pastTrips: [],
    redirect: false
  };

  renderRedirect = () => {
    if (!localStorage.getItem('jwtToken')) {
      return <Redirect to="/login" />;
    }
  };

  componentDidMount() {
    let url = `/api/getTrips/${localStorage.getItem('userId')}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );

    axios
      .get(url)
      .then(res => {
        console.log(res.data);
        this.setState({ pastTrips: res.data });
      })
      .catch(err => console.log(err));
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    //submit the edited trip
  };

  editTrip = event => {
    console.log(event.target.id);
    let url = `/api/getTrip/${event.target.id}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );

    axios
      .get(url)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  deleteTrip = event => {
    console.log(event.target.id);
    let url = `/api/deleteTrip/${event.target.id}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );
    axios
      .delete(url)
      .then(res => {
        console.log(res.data);
        
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <HistoryContainer
          pastTrips={this.state.pastTrips}
          editTrip={this.editTrip}
          deleteTrip={this.deleteTrip}
        />
        <BottomNav currentPage={1} />
      </div>
    );
  }
}

export default History;
