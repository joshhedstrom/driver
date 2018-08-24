import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import HistoryContainer from '../../Components/History/HistoryContainer';
import DeleteModal from '../../Components/Trips/DeleteModal';
import EditModal from '../../Components/Trips/EditModal';
import BottomNav from '../../Components/BottomNav';
import axios from 'axios';

class History extends Component {
  state = {
    pastTrips: [],
    redirect: false,
    deleteOpen: false,
    editOpen: false,
    deleteTrip: '',
    editTrip: {}
  };

  renderRedirect = () => {
    if (!localStorage.getItem('jwtToken')) {
      return <Redirect to="/login" />;
    }
  };

  componentDidMount() {
    this.loadTrips();
  }

  loadTrips = () => {
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
  };

  handleChange = event => {
    let originalTrip = { ...this.state.editTrip };
    let editedTrip = Object.assign({ [event.target.id]: event.target.value });
    let editTrip = { ...originalTrip, ...editedTrip };
    this.setState({ editTrip: editTrip });
  };

  editSubmit = event => {
    event.preventDefault();
    let url = `/api/updateTrip/${this.state.editTrip._id}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );
    axios
      .put(url, this.state.editTrip)
      .then(data => data)
      .catch(err => console.log(err));
    this.setState({ editOpen: false });
    this.loadTrips();
  };

  editTrip = event => {
    let url = `/api/getTrip/${event.target.id}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );

    axios
      .get(url)
      .then(res => {
        console.log(res.data);
        this.setState({ editTrip: res.data, editOpen: true });
      })
      .catch(err => console.log(err));
  };

  deleteOpen = event => {
    this.setState({ deleteOpen: true, deleteTrip: event.target.id });
  };

  deleteClose = () => {
    this.setState({ deleteOpen: false });
  };

  editClose = () => {
    this.setState({ editOpen: false });
  };

  deleteTrip = () => {
    let url = `/api/deleteTrip/${this.state.deleteTrip}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );
    axios
      .delete(url)
      .then(res => {
        this.loadTrips();
        this.setState({ deleteTrip: '' });
      })
      .catch(err => console.log(err));
    this.deleteClose();
  };

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
        <EditModal
          editOpen={this.state.editOpen}
          editSubmit={this.editSubmit}
          editClose={this.editClose}
          handleChange={this.handleChange}
          trip={this.state.editTrip}
        />
        <BottomNav currentPage={1} />
      </div>
    );
  }
}

export default History;
