import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import '../Client.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';





// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}



function preventDefault(event) {
  event.preventDefault();
}



export default function Appointments(props) {
  const paperStyleAppointment = { padding: '30px 20px', width: 900, margin: "10px auto" }


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
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>
          Appointments
        </Typography>
        {props.ownerAccess ? (
          <Typography sx={{ color: 'text.secondary' }}>
            You are currently the owner
          </Typography>
        ) : (
          <Typography sx={{ color: 'text.secondary' }}>

            You are currently not an owner
          </Typography>
        )}

      </AccordionSummary>
      <Paper elevation={3} style={paperStyleAppointment}>


        <PendingActionsIcon fontSize='large' />


        <Typography component="h1" variant="h5">
          Clients
        </Typography>

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
                <TableCell><b>Barber</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.clients.map((row) => {
                let formattedDate = moment(row.appointmentDateTime).format('YYYY-MM-DD HH:mm');
                return (
                  <TableRow key={row.id}>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>{row.barber}</TableCell>
                    {props.ownerAccess && (
                      <IconButton aria-label="delete" onClick={() => handleDeleteClick(row.id)}>
                        <DeleteIcon color='primary' />
                      </IconButton>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
              See more orders
            </Link>
          </div>
        </React.Fragment>

        {/*clients.map(client => (
                                <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={client.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>

                                            Name: {client.name}<br />
                                            Age: {client.age}<br />
                                            Email: {client.email}<br />
                                            Phone Number: {client.phoneNumber}<br />
                                            Date Time: {client.appointmentDateTime}<br />
                                        </div>

                                        {showDeleteButton ? (

                                            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDeleteClick(client.id)}>
                                                Delete
                                            </Button>
                                        ) : null}

                                    </div>
                                </Paper>
                                        ))*/}
      </Paper>
    </Accordion>
  );
}