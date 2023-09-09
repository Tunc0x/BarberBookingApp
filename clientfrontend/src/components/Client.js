import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Co2Sharp } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Appointments from './Appointments';



export default function Client({ showDeleteButton, setShowDeleteButton }) {
    const paperStyleClient = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const paperStyleAppointment = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [age, setAge] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [rawAppointmentDateTime, setRawAppointmentDateTime] = React.useState(dayjs())

    const [clients, setClients] = React.useState([])

    const handleClick = (e) => {
        e.preventDefault()

        const appointmentDateTime = rawAppointmentDateTime.format('YYYY-MM-DDTHH:mm:ss')
        console.log(appointmentDateTime)


        const client = { name, email, phoneNumber, age, appointmentDateTime }
        console.log(client)
        fetch("http://localhost:8080/clients", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(client)
        }).then(() => { console.log("New Client added"); /*window.location.reload();*/ })
    }

    const handleDeleteClick = (id) => {

        console.log(id)

        fetch("http://localhost:8080/clients/" + id, {
            method: "DELETE",

        }).then(() => { console.log("Client deleted"); window.location.reload(); })
    }

    React.useEffect(() => {

        fetch("http://localhost:8080/clients")
            .then(res => res.json())
            .then((result) => {
                setClients(result);
            }
            )
    }, [])






    return (
        <Container

            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Paper elevation={3} style={paperStyleClient}>

                <CalendarMonthIcon fontSize='large' color='primary'></CalendarMonthIcon>

                <h3 style={{ color: "blue" }}><u>Book an Appointment</u></h3>


                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic"

                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic"

                            label="Email Adress"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField id="outlined-basic"

                            label="Age"
                            variant="outlined"
                            fullWidth
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField
                            id="outlined-basic"

                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </Grid>
                </Grid>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
                    <DateTimePicker
                        label="Pick your date time"
                        value={rawAppointmentDateTime}
                        onChange={datetime => setRawAppointmentDateTime(datetime)}
                    />

                    <Button variant="contained" onClick={handleClick}>
                        Submit
                    </Button>
                </div>





            </Paper>




            <Paper elevation={3} style={paperStyleAppointment}>


                <PendingActionsIcon fontSize='large' />


                <Typography component="h1" variant="h5">
                    Clients
                </Typography>

               {/*<Appointments  clients={clients} />*/}

                {clients.map(client => (
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
                ))}
            </Paper>


        </Container>
    );
}
