import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Settings from './Pages/Settings';
import History from './Pages/History';
import NavBar from './Components/Navbar';
import './App.css';

class Root extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/history" component={History} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Root;
