import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Appointments from './Appointments';
import Booking from './Booking';
import '../Client.css';
import ChooseBarber from './ChooseBarber';





export default function Client({ showDeleteButton, setShowDeleteButton, isLoggedIn, loggedInAccount}) {

  

    const [appointments, setAppointments] = React.useState([])
    const [activeBarber, setActiveBarber] = React.useState({id: 1, name: "Jerry Johnson"})

    React.useEffect(() => {
        fetch("http://localhost:8080/appointments")
            .then(res => res.json())
            .then((result) => {
                setAppointments(result);
            })
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
                    <Booking activeBarber={activeBarber} 
                    appointments={appointments} 
                    setAppointments={setAppointments} 
                    showDeleteButton={showDeleteButton} 
                    setShowDeleteButton={setShowDeleteButton} 
                    isLoggedIn={isLoggedIn} 
                    loggedInAccount={loggedInAccount}/>
                </Grid>
                <Grid item xs={4}>
                    <ChooseBarber activeBarber={activeBarber} setActiveBarber={setActiveBarber} />
                </Grid>
                <Grid item xs={12}>
                    <Appointments appointments={appointments} setAppointments={setAppointments} ownerAccess={showDeleteButton} />
                </Grid>
            </Grid>
        </Container>
    );
}
