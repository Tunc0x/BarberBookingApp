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

export default function Appbar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showClient, setShowClient] = useState(true);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(true);



  const handleLoginClick = () => {
    setShowSignIn(true);
    setShowClient(false);
   
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Barber apppointment
          </Typography>
          
          
          { showLoginButton ?(

          
          <Button color="inherit" onClick={handleLoginClick}>Login</Button>

        ) : <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>}


        </Toolbar>
      </AppBar>

      {showSignIn && <SignIn onLoginSubmit={handleLoginSubmitClick}/>}
      {showClient && <Client showDeleteButton={showDeleteButton} setShowDeleteButton={setShowDeleteButton}/>}
    

    </Box>
  );
}
