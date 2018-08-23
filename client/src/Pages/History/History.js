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
    editOpen: false,
    deleteTrip: '',
    editTrip: ''
  }

  renderRedirect = () => {
    if (!localStorage.getItem('jwtToken')) {
      return <Redirect to="/login" />;
    }
  }

  componentDidMount() {
    this.loadTrips()
  }

  loadTrips = () => {
    let url = `/api/getTrips/${localStorage.getItem('userId')}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
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

  deleteOpen = event => {
    this.setState({ deleteOpen: true, deleteTrip: event.target.id });
  }

  deleteClose = () => {
    this.setState({ deleteOpen: false });
  }

  deleteTrip = () => {
    let url = `/api/deleteTrip/${this.state.deleteTrip}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    )
    axios
      .delete(url)
      .then(res => {
        this.loadTrips()
        this.setState({deleteTrip: ''})
      })
      .catch(err => console.log(err));
      this.deleteClose()
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
