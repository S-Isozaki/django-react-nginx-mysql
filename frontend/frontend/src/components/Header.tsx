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
import { useRecoilState } from 'recoil';
import { isAnonymousState, usernameState } from '../recoil/Atom';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export default function ButtonAppBar() {
  const [isAnonymous, setIsAnonymous] = useRecoilState(isAnonymousState);
  const [userName, setUsername] = useRecoilState(usernameState);
  useEffect(() => {
    axios.get('/typinggame/checkauthenticationstatus')
      .then(response => {
        setIsAnonymous(response.data.is_anonymous);
        axios.get('/typinggame/checkusername')
          .then(response => {
            setUsername(response.data.user_name);
          })
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
    ).then(() => {
        setIsAnonymous(true);
      }
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
          {isAnonymous ? 
            <Button color='inherit' component="a" href='/signup'>Sign up</Button>
            : 
            <Button color='inherit' component="a" href='/data'>{userName}</Button>
          }
          {isAnonymous ? 
            <Button color="inherit" component="a" href='/signin'>Sign in</Button>
            :
            <Button color='inherit' onClick={submitLogout}>Log out</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}