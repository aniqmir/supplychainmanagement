import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: "90%"
  },
});



export default function SimpleTable(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">phone</TableCell>
            <TableCell align="right">isApproved</TableCell>
            <TableCell align="right">isSupplier</TableCell>
            <TableCell align="right">salestax</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key={props.data.name}>
              <TableCell component="th" scope="row">
                {props.data.email}
              </TableCell>
              <TableCell align="right">{props.data.phone}</TableCell>
              
              <TableCell align="right">{(props.data.Approved) ? "Yes" : "No"}</TableCell>
              <TableCell align="right">{(props.data.isSupplier) ? "Yes" : "No"}</TableCell>
              <TableCell align="right">{props.data.salestax}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
