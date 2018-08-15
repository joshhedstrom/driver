import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 500
  }
});

function HistoryContainer(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>trip date</TableCell>
            <TableCell numeric>hours</TableCell>
            <TableCell numeric>miles</TableCell>
            <TableCell numeric>wages + tips</TableCell>
            <TableCell ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.pastTrips.map(trip => {
            let totalWages = trip.wage * trip.hours;
            let income = totalWages + trip.tips;
            let miles = trip.endingOdometer - trip.startingOdometer;
            let date = moment.unix(trip.startDate).utc()._d.toString();
            return (
              <TableRow key={trip._id} >
                <TableCell component="th" scope="row">
                  {date}
                </TableCell>
                <TableCell numeric>{trip.hours}</TableCell>
                <TableCell numeric>{miles}</TableCell>
                <TableCell numeric>{income}</TableCell>
                <TableCell>
                  <IconButton id={trip._id} onClick={props.editTrip} aria-label="Edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton id={trip._id} onClick={props.deleteTrip} aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

HistoryContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HistoryContainer);
