"use client";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userSlice';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import "../globals.css"

const LoginPage = () => {
  // define state variables

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const reduxId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://43.157.44.225/api/auth/login', {
        "username": email,
        "password": password
      })
      if (response.status >= 200 && response.status < 300) {
        const userId = response.data.id;
        const userName = response.data.username;
        const token = response.data.token;
        dispatch(login({ isAuthenticated: true, userId: userId, userName: userName, token: token }));
        return true;
      }
    } catch (error) {
      resetError('email');
      resetError('password');
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: error.response.data.error,
      }));
    }
    return false;
  }
  // email regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation function for email and password
  const validateEmail = () => {
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: '',
      }));
    }
  };

  /*
   * const validatePassword = () => {
   *   if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
   *     setErrors((prevErrors) => ({
   *       ...prevErrors,
   *       password: 'Password must be at least 8 characters long and contain upper and lower case letters',
   *     }));
   *   } else {
   *     setErrors((prevErrors) => ({
   *       ...prevErrors,
   *       password: '',
   *     }));
   *   }
   * };
   */

  // Reset error message when input is focused
  const resetError = (field: any) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: '', // Clear error for the specific field
    }));
  };

  // Submit function
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!errors.email && !errors.password && email && password) {
      if (!await handleLogin()) return;
      router.push("/");
    } else if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter email address',
      }))
    } else if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Please enter password',
      }))
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        {/* <Box
            sx={{
              padding: '40px',
              boxShadow: 3,
              borderRadius: '12px',
              backgroundColor: '#fafafa',
            }}
          > */}

        <Box sx={{
          display: 'flex',
          flexDirection: 'column', // vertical alignment
          alignItems: 'center', // horizontal alignment
          padding: '40px',

        }}
        >

          <Typography
            variant="h6"
            component="div"
            sx={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              fontWeight: 'bold',
              color: '#000',
              fontSize: '40px'
            }}
            className='hover: cursor-pointer'
            onClick={() => {
              router.push("/");
            }}
          >
            IPortfolio
          </Typography>
          {/* Title */}
          <Typography variant="h3" component="h1" textAlign="center" fontWeight="bold" marginBottom="40px" color="#666565">
              Login
          </Typography>

          {/* Email Input */}
          <TextField
            label="Email"
            variant="standard"
            // fullWidth
            required
            margin="normal"
            sx={{ width: '500px', '& .MuiInputLabel-root': {
              fontSize: '15px', marginLeft: '10px', marginBottom: 'px', marginTop: '-10px' // set the label individually
            }, }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email} // show error status when there is an error message
            helperText={errors.email} // show error prompt information
            onBlur={validateEmail} // Trigger validation on blu
            onFocus={() => resetError('email')} // Reset error when focused

          />

          {/* Password Input */}
          <TextField
            label="Password"

            type="password"
            variant="standard"
            // fullWidth
            required
            margin="normal"

            sx={{ width: '500px', '& .MuiInputLabel-root': {
              fontSize: '15px', marginLeft: '10px', marginTop: '-10px'// set the label individually
            }, }}

            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // onBlur={validatePassword} // Trigger validation on blur
            error={!!errors.password}
            helperText={errors.password}
            onFocus={() => resetError('password')} // Reset error when focused
          />

          <Button
            className='mt-[50px]'
            variant="outlined"

            sx={{
              marginTop: '20px',
              width: '500px',
              padding: '10px 0',
              color: '#007BFF',
              borderColor: '#007BFF',
              '&:hover': {
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderColor: '#007BFF'
              },
              borderRadius: '50px',
              fontFamily: 'Arial, serif !important'

            }}
            onClick={handleSubmit} // call the submit function when the button is clicked
          >
                        Login
          </Button>

          <Typography variant="body2" color="textSecondary" textAlign="center" marginTop="20px">
            New to Iportfolio?  <a onClick={() => {
              router.push('/SignUp');
            }} style={{ color: '#00C4EC', textDecoration: 'none' }}>Sign up</a>
          </Typography>
          {/* </Box> */}
        </Box>

      </Grid>
    </Grid>

  );
};

export default LoginPage;
