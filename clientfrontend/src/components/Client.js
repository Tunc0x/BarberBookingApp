import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Appointments from './Appointments';
import Booking from './Booking';
import '../Client.css';
import ChooseBarber from './ChooseBarber';





export default function Client({ showDeleteButton, setShowDeleteButton }) {

  

    const [clients, setClients] = React.useState([])
    const [activeBarber, setActiveBarber] = React.useState("Jerry")

    React.useEffect(() => {
        fetch("http://localhost:8080/clients")
            .then(res => res.json())
            .then((result) => {
                setClients(result);
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
                    <Booking activeBarber={activeBarber} clients={clients} setClients={setClients} />
                </Grid>
                <Grid item xs={4}>
                    <ChooseBarber activeBarber={activeBarber} setActiveBarber={setActiveBarber} />
                </Grid>
                <Grid item xs={12}>
                    <Appointments clients={clients} setClients={setClients} ownerAccess={showDeleteButton} />
                </Grid>
            </Grid>
        </Container>
    );
}
