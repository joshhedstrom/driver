import React from 'react';
import ReactDOM from 'react-dom';
import './Root.css';
import Root from './Root';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
      <Root />
    </MuiThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
