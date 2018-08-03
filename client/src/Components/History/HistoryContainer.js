import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
            <TableCell numeric>editing</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.pastTrips.map(trip => {
            return (
              <TableRow key={trip.id}>
                <TableCell component="th" scope="row">
                  {trip.date}
                </TableCell>
                <TableCell numeric>{trip.hours}</TableCell>
                <TableCell numeric>{trip.miles}</TableCell>
                <TableCell numeric>{trip.wages + trip.tips}</TableCell>
                <TableCell numeric>{trip.edits}</TableCell>
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
