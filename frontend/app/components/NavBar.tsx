"use client"
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Avatar, List, ListItem, ListItemButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { logout } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const [hoverAvatar, setHoverAvatar] = useState<boolean>(false);
  const handleMouseEnter = () => setHoverAvatar(true);
  const handleMouseLeave = () => setHoverAvatar(false);
  const userId = useSelector((state) => state.user.userId);
  const userName = useSelector((state) => state.user.userName);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <AppBar position="static" style={{ backgroundColor: '#000', boxShadow: 'none' }}>
      <Toolbar>
        {/* <Typography  variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          IPortfolio
        </Typography> */}
        <Button
          onClick={() => {
            router.push('/');
          }}
          color="inherit"
          sx={{
            textTransform: 'none',
            padding: 0,
            '&:hover': {
              backgroundColor: 'transparent'
            }
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              color: '#fff'
            }}
          >
            IPortfolio
          </Typography>
        </Button>
        <Box sx={{ display: 'flex', gap: '20px', marginLeft: 'auto' }}>
          <Button onClick={() => {
            router.push('/Template');
          }} color="inherit">TEMPLATE</Button>
          <Button onClick={() => {
            router.push('/EditPage');
          }} color="inherit">IPortfolio Studio</Button>
        </Box>
        {isAuthenticated ? <div
          className='relative ml-4 flex flex-col h-[64px]'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className='h-[64px] w-[40px] flex justify-center items-center'>
            <Avatar
              sx={{ bgcolor: 'rgb(31,108,250)' }}
            >1</Avatar>
          </div>
          <div className={`absolute 
            top-[64px] 
            left-[-86px]
            w-[150px]
          bg-black 
            transition-all ease-in-out duration-500
              ${hoverAvatar ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <List>
              <ListItem disablePadding>
                <span className='truncate px-4 py-2'>{userName || ''}</span>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => {
                  router.push('/History')
                }}>
            History
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => {
                  dispatch(logout());
                  router.push('/');
                }}>
            Log out
                </ListItemButton>
              </ListItem>
            </List>
          </div>
        </div>
          : <Button onClick={() => {
            router.push('/Login');
          }} color="primary" variant="contained" sx={{ backgroundColor: '#fff',
            color: '#000', marginLeft: '20px', borderRadius: '50px' }}>
          GET START
          </Button> }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;