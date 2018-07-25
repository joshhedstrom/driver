import React, { Component } from 'react';
import axios from 'axios'
import SignupComponent from '../../Components/Signup/SignupComponent';

class Signup extends Component {
  state = {
    firstName: null,
    lastName: null,
    username: null,
    password: null,
    passwordConfirmation: null,
    message: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let username = this.state.username;
    let password = this.state.password;
    let passwordConfirmation = this.state.passwordConfirmation;

    if (
      !firstName ||
      !lastName ||
      !username ||
      !password ||
      !passwordConfirmation
    ) {
      this.setState({ message: 'Oops...make sure to fill out all fields' });
    } else if (password !== passwordConfirmation) {
      this.setState({ message: "Oops...the passwords didn't match" });
    } else {
      let form = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
      };

      axios.post('/auth/register', form).then(result => {
        console.log(result)
        this.props.history.push('/login');
      });
    }
  };

  render() {
    return (
      <div>
        <SignupComponent
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          message={this.state.message}
        />
      </div>
    );
  }
}

export default Signup;
