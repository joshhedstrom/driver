import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditModal extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.editOpen}
          onClose={this.props.editClose}
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
              fullWidth
              defaultValue={this.props.trip.startingOdometer}
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
              type="number"
              fullWidth
              defaultValue={this.props.trip.hours}
              onChange={this.props.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="tips"
              label="total tips"
              type="number"
              fullWidth
              defaultValue={this.props.trip.tips}
              onChange={this.props.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="wage"
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
