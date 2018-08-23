import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    let open = props.deleteOpen
    this.state = { open: open };
    console.log('constructor ran')
  }

  deleteClose = () => {
      this.setState({open: false})
  }

  deleteOpen = () => {
    
  }

  render() {
      console.log('rendered')
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.props.deleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Delete this trip?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this trip? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.deleteClose} color="primary" autoFocus>
              cancel
            </Button>
            <Button onClick={this.props.deleteTrip} color="secondary">
              delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteModal;
