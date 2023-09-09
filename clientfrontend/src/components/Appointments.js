import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}



function preventDefault(event) {
  event.preventDefault();
}

export default function Appointments(props) {
  return (
    <React.Fragment>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
      <Title>Recent Orders</Title>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Age</b></TableCell>
            <TableCell><b>Email Adress</b></TableCell>
            <TableCell align="right"><b>Phone Number</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.clients.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.appointmentDateTime}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell align="right">{`$${row.phoneNumber}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
      </div>
    </React.Fragment>
  );
}