import React, { Component } from 'react';
import HistoryContainer from '../../Components/History/HistoryContainer';
import BottomNav from '../../Components/BottomNav';
import axios from 'axios';

function createData(date, hours, miles, income, edits) {
    let id = 1;
    return { id, date, hours, miles, income, edits };
}

const pastTrips = [
    createData('05-06-2018', 3, 30, 24, 4.0),
    createData('05-05-2018', 2, 20, 37, 4.3),
    createData('05-04-2018', 1, 70, 24, 6.0),
    createData('05-03-2018', 2, 50, 67, 4.3),
    createData('05-02-2018', 3, 60, 49, 3.9)
];
class History extends Component {
  state = {
    pastTrips: pastTrips,
  }

  

  componentDidMount() {
    //axios call to get all past trips
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    //submit the edited trip
  }

  render() {
    return (
      <div>
        <HistoryContainer pastTrips={this.state.pastTrips} />
        <BottomNav currentPage={1} />
      </div>
    );
  }
}

export default History;
