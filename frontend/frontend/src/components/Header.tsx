import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export default function ButtonAppBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    axios.get('/typinggame/checkAuthenticationStatus')
      .then(response => {
        setIsAuthenticated(response.data.is_authenticated);
      })
      .catch(error => {
        console.error('Error fetching authentication status:', error);
      });
  }, []);
  function submitLogout(e: any) {
    e.preventDefault();
    client.post(
      "/typinggame/logout",
      {withCredentials: true}
    )
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
            Typing Game
          </Typography>
          {isAuthenticated ? 
            <Button color='inherit' component="a" href='/data'>name</Button>
            : 
            <Button color='inherit' component="a" href='/signup'>Sign up</Button>
          }
          {isAuthenticated ? 
            <Button color='inherit' onClick={submitLogout}>Log out</Button>
            :
            <Button color="inherit" component="a" href='/signin'>Sign in</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}