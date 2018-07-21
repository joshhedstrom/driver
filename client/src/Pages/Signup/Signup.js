import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Signup extends Component {
    state = {}

    renderRedirect = () => {
        if (!localStorage.getItem('jwtToken')) {
            return <Redirect to="/login" />;
        }
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
            </div>
        );
    }
}

export default Signup;
