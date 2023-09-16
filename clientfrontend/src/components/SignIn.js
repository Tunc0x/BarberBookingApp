import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';











function Copyright(props) {



  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let ownerAccess;



const defaultTheme = createTheme();

export default function SignIn(props) {




  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    const loginRequest = { email, password };
    console.log(loginRequest);

    fetch("http://localhost:8080/owner/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginRequest)
    })
      .then(response => response.json())
      .then(isValidLogin => {
        console.log("Owner Login valid:", isValidLogin);
        let ownerAccess;  // Initialisieren Sie die Variable hier
        isValidLogin = JSON.stringify(isValidLogin)
        if (isValidLogin === "true") {
          console.log("Owner access granted");
          ownerAccess = true;
          props.onLoginSubmit(ownerAccess, null);
        } else {
          fetch("http://localhost:8080/clients/loginValid", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginRequest)
          })
            .then(response => response.json())
            .then(isValidClientLogin => {
              console.log("Client Login valid:", isValidClientLogin);
              isValidClientLogin = JSON.stringify(isValidClientLogin)
              if (isValidClientLogin === "true") { // Hier muss ich die fetch anfrage /login setzen, um den entsprechenden Client zu bekommen und diese Daten speichern zu können
                console.log("Client access granted");
                ownerAccess = false;
                fetch("http://localhost:8080/clients/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(loginRequest)
                })
                  .then(response => response.json())
                  .then(Client => {

                    props.onLoginSubmit(ownerAccess, Client);
                    console.log(Client);
                  })

              
              } else {
                console.log("access denied");
              }
            })
        }
      })
      .catch(error => {
        console.error("There was a fetch call error:", error);
      });
  };



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item >
                <Link href="#" variant="body2" onClick={props.onSignUpClick}>
                  {"Don't have an account? Sign Up"}
                </Link >
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>





  );


}

