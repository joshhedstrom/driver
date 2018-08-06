import React, { Component } from 'react';
import axios from 'axios';
import LoginComponent from '../../Components/Login';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleSubmit = event => {
    event.preventDefault();

    let formData = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post('/auth/login', formData)
      .then(result => {
        localStorage.setItem('jwtToken', result.data.token);
        localStorage.setItem('userId', result.data.userId);
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <LoginComponent
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Login;
