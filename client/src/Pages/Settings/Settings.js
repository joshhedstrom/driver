import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SettingsComponent from '../../Components/Settings';
import BottomNavComponent from '../../Components/BottomNav';

class Settings extends Component {

  
  state = {
    redirect: false,
    checked: false
  };
  
  renderRedirect = () => {
    if (!localStorage.getItem('jwtToken')) {
      return <Redirect to="/login" />;
    }
  };

  componentDidMount(){
    let darkTheme = localStorage.getItem('darkTheme')
    this.setState({checked: darkTheme})

  }
  
  switchTheme = event => {
    console.log(event.target);
    if(this.state.darkTheme){
      this.setState({checked: false})
      localStorage.setItem('darkTheme', false)
    }
    else if(!this.state.darkTheme){
      this.setState({checked: true})
      localStorage.setItem('darkTheme', true)
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <SettingsComponent
          switchTheme={this.switchTheme}
          checked={this.state.checked}
        />
        <BottomNavComponent currentPage={2} />
      </div>
    );
  }
}

export default Settings;
