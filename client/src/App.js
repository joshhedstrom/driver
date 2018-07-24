import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import History from './Pages/History';
import NavBar from './Components/Navbar';
import './App.css';
{/* <NavBar /> */}


const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/history" component={History} />
      </Switch>
    </div>
  </Router>
);

export default App;
