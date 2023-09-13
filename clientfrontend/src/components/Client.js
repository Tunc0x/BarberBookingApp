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
import { Co2Sharp, Girl } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentCut from '@mui/icons-material/ContentCut';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Appointments from './Appointments';
import Barber1Bild from '../Pictures/Barber1.jpg';
import Barber2Bild from '../Pictures/Barber2.jpg';
import '../Client.css';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




export default function Client({ showDeleteButton, setShowDeleteButton }) {
    const paperStyleClient = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const paperStyleAppointment = { padding: '30px 20px', width: 900, margin: "10px auto" }
    const paperStyleBarber = { padding: '50px 20px', width: 350, margin: "20px auto" }

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [age, setAge] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [rawAppointmentDateTime, setRawAppointmentDateTime] = React.useState(dayjs())

    const [clients, setClients] = React.useState([])
    const [activeBarber, setActiveBarber] = React.useState("Jerry")
    const [touchedFields, setTouchedFields] = React.useState({});


    const handleClick = (e) => {
        e.preventDefault()

        const appointmentDateTime = rawAppointmentDateTime.format('YYYY-MM-DDTHH:mm:ss')
        console.log(appointmentDateTime)
        const barber = activeBarber


        const client = { name, email, phoneNumber, age, appointmentDateTime, barber }
        console.log(client)
        fetch("http://localhost:8080/clients", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(client)
        }).then(() => {
            console.log("New Client added"); /*window.location.reload(); */
            const newClients = [...clients, client];
            setClients(newClients);
        })
    }

    const handleDeleteClick = (id) => {

        console.log(id)

        fetch("http://localhost:8080/clients/" + id, {
            method: "DELETE",

        }).then(() => { console.log("Client deleted"); window.location.reload(); })
    }

    const handleBarberClick = (barberName) => {
        setActiveBarber(barberName)

    }

    const isInputValid = () => !isInputBlank() && isEmailValid() && isAgeValid() && isPhoneNumberValid();


    const isInputBlank = () => (name === '' || email === '' || age === '' || phoneNumber === '');

    const isEmailValid = () => email.includes('@');

    const isAgeValid = () => /^\d+$/.test(age) && age > 5;

    const isPhoneNumberValid = () => /^\d+$/.test(phoneNumber);

    const handleBlur = (field) => {
        setTouchedFields(prevState => ({
            ...prevState,
            [field]: true
        }));
    };

    const isBlank = (value) => {
        return !value || value.trim() === '';
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
                '& > :not(style)': { m: 1, width: '130ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Grid container spacing={2}>
                <Grid item xs={8} >
                    <Booking/>

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
                                <TextField onBlur={() => handleBlur("email")}
                                    id="outlined-basic"
                                    label="Email Adress"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    error={touchedFields.email && !isBlank(email) && !isEmailValid()}
                                    helperText={touchedFields.email && !isBlank(email) && !isEmailValid() ? "Incorrect entry." : ""}


                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField id="outlined-basic" onBlur={() => handleBlur("age")}

                                    label="Age"
                                    variant="outlined"
                                    fullWidth
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                    error={touchedFields.age && !isBlank(age) && !isAgeValid()}
                                    helperText={touchedFields.age && !isBlank(age) && !isAgeValid() ? "Incorrect entry." : ""}
                                />
                            </Grid>

                            <Grid item xs={12} >
                                <TextField onBlur={() => handleBlur("phoneNumber")}
                                    id="outlined-basic"
                                    label="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    error={touchedFields.phoneNumber && !isBlank(phoneNumber) && !isPhoneNumberValid()}
                                    helperText={touchedFields.phoneNumber && !isBlank(phoneNumber) && !isPhoneNumberValid() ? "Incorrect entry." : ""}
                                />
                            </Grid>
                        </Grid>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
                            <DateTimePicker
                                label="Pick your date time"
                                value={rawAppointmentDateTime}
                                onChange={datetime => setRawAppointmentDateTime(datetime)}
                            />

                            <Button variant="contained" onClick={handleClick} disabled={!isInputValid()}>
                                Submit
                            </Button>
                        </div>

                    </Paper>
                </Grid>

                <Grid item xs={4} >
                    <Paper elevation={3} style={paperStyleBarber}>
                        <ContentCut fontSize='large' color='primary'></ContentCut>

                        <h3 style={{ color: "blue" }}><u>Choose your Barber</u></h3>

                        <Grid container spacing={0} rowSpacing={0} columnSpacing={0}>

                            <Grid item xs={6}>
                                <div>
                                    <img className={activeBarber === "Jerry" ? "hoverZoom activeZoom blueBorder" : "hoverZoom"} src={Barber1Bild} alt="Barber1" width="150" height="200" onClick={() => handleBarberClick("Jerry")} />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <img className={activeBarber === "Okan" ? "hoverZoom activeZoom blueBorder" : "hoverZoom"} src={Barber2Bild} alt="Barber1" width="150" height="200" onClick={() => handleBarberClick("Okan")} />
                                </div>
                            </Grid>

                        </Grid>

                        <Paper elevation={6} style={paperStyleBarber}>
                            {activeBarber === "Jerry" ? (
                                <>
                                    <b>Jerry Johnson</b>
                                    <br />
                                    OWNER / HAIR SPECIALIST
                                </>
                            ) : activeBarber === "Okan" ? (
                                <>
                                    <b>Okan Yaman</b>
                                    <br />
                                    ASSISTANT / STYLING SPECIALIST
                                </>
                            ) : null}

                        </Paper>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Appointments
                            </Typography>

                            {showDeleteButton ? (
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

                            <Appointments clients={clients} setClients={setClients} ownerAccess={showDeleteButton} />


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
                </Grid>

            </Grid>







        </Container>
    );
}
