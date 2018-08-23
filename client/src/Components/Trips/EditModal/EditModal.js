import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
  state = {
    open: true
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit this trip</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="startingOdometer"
              label="starting odometer"
              type="number"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="endingOdometer"
              label="ending odometer"
              type="number"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="hours"
              label="hours"
              type="number"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="tips"
              label="total tips"
              type="number"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="wages"
              label="wages"
              type="number"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="description"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
