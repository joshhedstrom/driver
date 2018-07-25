import React, { Component } from 'react';
import LoginComponent from '../../Components/Login'

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    handleSubmit = () => {
        //submit data
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

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
