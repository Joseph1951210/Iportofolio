"use client";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "../globals.css"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import useFetch from '../useFetch';

const LoginPage = () => {
  // define state variables

  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmEmail: '', confirmPassword: '' });
  const router = useRouter();
  const dispatch = useDispatch();
  // email regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async () => {
    // const { data, error, loading } = useFetch('/auth/register', 'POST');
    try {
      const response = await axios.post('http://43.157.44.225/api/auth/register', {
        "username": email,
        "password": password
      })
      if (response.status >= 200 && response.status < 300) {
        console.log(123, response);

        const userId = response.data.id;
        const userName = response.data.username;
        dispatch(login({ isAuthenticated: true, userId: userId, userName: userName }));
        return true;
      }
    } catch (error) {
      console.log(error);
      resetError('email');
      resetError('password');
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: error.response.data,
      }));
    }
    return false;
  }

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

  const validatePassword = () => {
    if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 8 characters long and contain upper and lower case letters',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: '',
      }));
    }
  };

  // Confirm email and password validation
  const validateConfirmEmail = () => {
    if (confirmEmail !== email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmEmail: 'Emails do not match',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmEmail: '',
      }));
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: '',
      }));
    }
  };

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
    if (!errors.email && !errors.password) {
      if (!await handleRegister()) return;
      router.push('/');
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
              router.push('/');
            }}
          >
            IPortfolio
          </Typography>
          {/* Title */}
          <Typography variant="h3" component="h1" textAlign="center" fontWeight="bold" marginBottom="40px" color="#666565">
              Sign Up
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

          {/* Confirm Email Input */}
          <TextField
            label="Confirm Email"
            variant="standard"
            // fullWidth
            required
            margin="normal"
            sx={{ width: '500px', '& .MuiInputLabel-root': {
              fontSize: '15px', marginLeft: '10px', marginTop: '-10px' // set the label individually
            }, }}

            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            onBlur={validateConfirmEmail} // Trigger validation on blur
            onFocus={() => resetError('confirmEmail')} // Reset error when focused
            error={!!errors.confirmEmail} // Show error state
            helperText={errors.confirmEmail} // Show error message

          />

          {/* Password Input */}
          <TextField
            label="Set Password"

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
            onBlur={validatePassword} // Trigger validation on blur
            error={!!errors.password}
            helperText={errors.password}
            onFocus={() => resetError('password')} // Reset error when focused

          />

          {/* Confirm Password Input */}
          <TextField
            label="Confirm Password"

            type="password"
            variant="standard"
            required
            margin="normal"
            sx={{ width: '500px', '& .MuiInputLabel-root': {
              fontSize: '15px', marginLeft: '10px', marginTop: '-10px' // set the label individually
            }, }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={validateConfirmPassword} // Trigger validation on blur
            onFocus={() => resetError('confirmPassword')} // Reset error when focused
            error={!!errors.confirmPassword} // Show error state
            helperText={errors.confirmPassword} // Show error message

          />

          {/* Register Button */}
          {/* <Button
              variant="contained"
              fullWidth
              sx={{ marginTop: '20px', padding: '10px 0', backgroundColor: '#000', color: '#fff' }}>
              Sign Up
            </Button> */}
          <Button
            variant="outlined"
            className='mt-[50px]'
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
                        Sign Up
          </Button>

          {/* Already have an account */}
          <Typography variant="body2" color="textSecondary" textAlign="center" marginTop="20px">
            Already have an account?  <a onClick={() => {
              router.push('/Login');
            }} style={{ color: '#00C4EC', textDecoration: 'none' }}>Login</a>
          </Typography>
          {/* </Box> */}
        </Box>

      </Grid>
    </Grid>

  );
};

export default LoginPage;
