import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
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

export default Login;
