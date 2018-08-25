import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Root from './Root';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import orange from '@material-ui/core/colors/orange';
import registerServiceWorker from './registerServiceWorker';

const color = JSON.parse(localStorage.getItem('darkTheme')) ? 'dark' : 'light';

const theme = createMuiTheme({
  palette: {
    primary: orange,
    type: color
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Root />
    </MuiThemeProvider>
  );
}

ReactDOM.render(<App className="darkTheme" />, document.getElementById('root'));
registerServiceWorker();
