import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';


export default function Client() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [age, setAge] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [appointmentDateTime, setAppointmentDateTime] = React.useState('')

    const [clients, setClients] = React.useState([])

    const handleClick = (e) => {
        e.preventDefault()
        const client = { name, email, phoneNumber, age, appointmentDateTime }
        console.log(client)
        fetch("http://localhost:8080/clients", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(client)
        }).then(() => { console.log("New Client added"); window.location.reload(); })
    }

    const handleDeleteClick = (id) => {

        console.log(id)

        fetch("http://localhost:8080/clients/" + id, {
            method: "DELETE",

        }).then(() => { console.log("Client deleted"); window.location.reload(); })
    }

    React.useEffect(() => {

        fetch("http://localhost:8080/clients/getAll")
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
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}><u>Register</u></h1>
                <TextField id="outlined-basic" label="Your Name" variant="outlined" fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField id="outlined-basic" label="Your Email" variant="outlined" fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField id="outlined-basic" label="Your Age" variant="outlined" fullWidth
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />


                <TextField id="outlined-basic" label="Your Phone Number" variant="outlined" fullWidth
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <TextField id="outlined-basic" label="Your Wish Date And Time" variant="outlined" fullWidth
                    value={appointmentDateTime}
                    onChange={(e) => setAppointmentDateTime(e.target.value)}
                />



                <Button variant="contained" onClick={handleClick}>
                    Submit

                </Button>

            </Paper>




            <Paper elevation={3} style={paperStyle}>
                
            <h1>Clients</h1>
                {clients.map(client => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={client.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                Id: {client.id}<br />
                                Name: {client.name}<br />
                                Age: {client.age}<br />
                                Email: {client.email}<br />
                                Phone Number: {client.phoneNumber}<br />
                                Date Time: {client.appointmentDateTime}<br />
                            </div>

                            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDeleteClick(client.id)}>
                                Delete
                            </Button>
                        </div>
                    </Paper>
                ))}
            </Paper>


        </Container>
    );
}
