import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SignIn from './SignIn';
import Client from './Client';
import SignUp from './SignUp';





export default function Appbar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showClient, setShowClient] = useState(true);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showSignUp, setShowSignUp] = React.useState(false);
  const [clients, setClients] = React.useState([])

  
  React.useEffect(() => {

    fetch("http://localhost:8080/clients")
        .then(res => res.json())
        .then((result) => {
            setClients(result);
        }
        )
}, [])



  const handleLoginClick = () => {
    setShowSignIn(true);
    setShowClient(false);
    setShowSignUp(false);
   
  } 

  const handleLogoutClick = () => 
  {
    setShowDeleteButton(false);
    setShowLoginButton(true);

  }

  const handleLoginSubmitClick = (isOwnerAuthenticated) =>
  {
    setShowSignIn(false);
    setShowClient(true);
    setShowDeleteButton(isOwnerAuthenticated);
    setShowLoginButton(false);
  }

  const handleMenuIconClick = () =>
  {
    if (showSignIn === true) {
      setShowSignIn(false);
      setShowClient(true);
    }
   
  } 

  const handleSignUpClick = () =>
  {
     setShowSignUp(true);
     setShowSignIn(false);
  };




  


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={handleMenuIconClick}/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Barber apppointment
          </Typography>
          
          
          { showLoginButton ?(

          
          <Button color="inherit" onClick={handleLoginClick}>Login</Button>

        ) : <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>}


        </Toolbar>
      </AppBar>

      {showSignIn && <SignIn onLoginSubmit={handleLoginSubmitClick} onSignUpClick={handleSignUpClick}/>}
      {showClient && <Client showDeleteButton={showDeleteButton} setShowDeleteButton={setShowDeleteButton}/>}
      {showSignUp && <SignUp onLoginClick={handleLoginClick}/>}
       
    
    

    </Box>
  );
}
