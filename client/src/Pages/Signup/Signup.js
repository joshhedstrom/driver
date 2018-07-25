import React, { Component } from 'react';import { Redirect } from 'react-router-dom';
import SignupComponent from '../../Components/Signup/SignupComponent';

class Signup extends Component {
    state = {}

    render() {
        return (
            <div>
                <SignupComponent />
            </div>
        );
    }
}

export default Signup;
