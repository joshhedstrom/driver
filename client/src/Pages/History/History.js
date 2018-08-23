import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import HistoryContainer from '../../Components/History/HistoryContainer';
import DeleteModal from '../../Components/Trips/DeleteModal';
import BottomNav from '../../Components/BottomNav';
import axios from 'axios';

class History extends Component {
  state = {
    pastTrips: [],
    redirect: false,
    deleteOpen: false,
    editOpen: false
  }

  renderRedirect = () => {
    if (!localStorage.getItem('jwtToken')) {
      return <Redirect to="/login" />;
    }
  }

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
  }

  handleSubmit = event => {
    event.preventDefault();
    //submit the edited trip
  }

  editTrip = event => {
    let url = `/api/getTrip/${event.target.id}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    )

    axios
      .get(url)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  deleteOpen = () => {
    this.setState({ deleteOpen: true });
    console.log(this.state)
    console.log('open hit')
  }

  deleteClose = () => {
    this.setState({ deleteOpen: false });
  }

  deleteTrip = event => {
    let url = `/api/deleteTrip/${event.target.id}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    )
    axios
      .delete(url)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
    window.location.reload();
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <HistoryContainer
          pastTrips={this.state.pastTrips}
          editTrip={this.editTrip}
          deleteOpen={this.deleteOpen}
        />
        <DeleteModal
          deleteOpen={this.state.deleteOpen}
          deleteClose={this.deleteClose}
          deleteTrip={this.deleteTrip}
        />
        <BottomNav currentPage={1} />
      </div>
    );
  }
}

export default History;
