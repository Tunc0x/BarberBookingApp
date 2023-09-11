import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}



function preventDefault(event) {
  event.preventDefault();
}



export default function Appointments(props) {
  


  React.useEffect(() => {

    fetch("http://localhost:8080/clients")
      .then(res => res.json())
      .then((result) => {
        props.setClients(result);
      }
      )
  }, [])


  const handleDeleteClick = (id) => {

    console.log(id)

    fetch("http://localhost:8080/clients/" + id, {
      method: "DELETE",

    }).then(() => {
      console.log("Client deleted"); /*window.location.reload(); */

      const updatedClients = props.clients.filter(client => client.id !== id);
      props.setClients(updatedClients);
      
    })
  }

  return (
    <React.Fragment>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
        <Title>Recent Bookings</Title>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Age</b></TableCell>
            <TableCell><b>Email Adress</b></TableCell>
            <TableCell ><b>Phone Number</b></TableCell>
            <TableCell align="right"><b>Barber</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.clients.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.appointmentDateTime}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell >{row.phoneNumber}</TableCell>
              <TableCell >{row.Name}</TableCell>
              {props.ownerAccess ? (

                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDeleteClick(row.id)}>
                  Delete
                </Button>
              ) : null}
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