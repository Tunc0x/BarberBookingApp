import * as React from 'react';
import  Paper from '@mui/material/Paper';
import ContentCut from '@mui/icons-material/ContentCut';
import Grid from '@mui/material/Grid';
import Barber1Bild from '../Pictures/Barber1.jpg';
import Barber2Bild from '../Pictures/Barber2.jpg';
import '../Client.css';



export default function ChooseBarber({activeBarber, setActiveBarber}) {
    const paperStyleBarber = { padding: '50px 20px', width: 350, margin: "20px auto" }
    const handleBarberClick = (barber) => {
        setActiveBarber(barber);

    }

    





    return (
        <Paper elevation={3} style={paperStyleBarber}>
            <ContentCut fontSize='large' color='primary'></ContentCut>

            <h3 style={{ color: "blue" }}><u>Choose your Barber</u></h3>

            <Grid container spacing={0} rowSpacing={0} columnSpacing={0}>

                <Grid item xs={6}>
                    <div>
                        <img className={activeBarber.name === "Jerry Johnson" ? "hoverZoom activeZoom blueBorder" : "hoverZoom"} src={Barber1Bild} alt="Barber1" width="150" height="200" onClick={() => handleBarberClick({id: 1, name: "Jerry Johnson"})} />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <img className={activeBarber.name === "Okan Yaman" ? "hoverZoom activeZoom blueBorder" : "hoverZoom"} src={Barber2Bild} alt="Barber1" width="150" height="200" onClick={() => handleBarberClick({id: 2, name: "Okan Yaman"})} />
                    </div>
                </Grid>

            </Grid>

            <Paper elevation={6} style={paperStyleBarber}>
                {activeBarber.name === "Jerry Johnson" ? (
                    <>
                        <b>Jerry Johnson</b>
                        <br />
                        OWNER / HAIR SPECIALIST
                    </>
                ) : activeBarber.name === "Okan Yaman" ? (
                    <>
                        <b>Okan Yaman</b>
                        <br />
                        ASSISTANT / STYLING SPECIALIST
                    </>
                ) : null}

            </Paper>
        </Paper>





    );
}