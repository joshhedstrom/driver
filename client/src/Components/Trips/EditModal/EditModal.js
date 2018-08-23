import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditModal extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.editOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit this trip</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="startingOdometer"
              label="starting odometer"
              type="number"
              defaultValue={this.props.trip.startingOdometer}
              fullWidth
              onChange={this.props.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="endingOdometer"
              label="ending odometer"
              type="number"
              fullWidth
              defaultValue={this.props.trip.endingOdometer}
              onChange={this.props.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="hours"
              label="hours"
              defaultValue={this.props.trip.hours}
              type="number"
              fullWidth
              onChange={this.props.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="tips"
              label="total tips"
              type="number"
              defaultValue={this.props.trip.tips}
              fullWidth
              onChange={this.props.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="wages"
              label="wages"
              type="number"
              fullWidth
              defaultValue={this.props.trip.wage}
              onChange={this.props.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="description"
              type="text"
              fullWidth
              defaultValue={this.props.trip.description}
              onChange={this.props.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.editClose} color="primary">
              cancel
            </Button>
            <Button onClick={this.props.editSubmit} color="primary">
              submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditModal;
