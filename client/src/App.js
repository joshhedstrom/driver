import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';
import History from './Pages/History';
import NavBar from './Components/Navbar';
import './App.css';

class App extends React.Component {
  state = {
    redirect: false
  };
  renderRedirect = () => {
    if (!localStorage.getItem('jwtToken')) {
      return <Redirect to="/login" />;
    }
  };

  render() {
    return (
      <Router>
        <div>
          {this.renderRedirect()}
          <NavBar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/history" component={History} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
