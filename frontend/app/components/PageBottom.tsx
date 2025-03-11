"use client"
import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import '@fortawesome/fontawesome-free/css/all.min.css';

const PageBottom = () => {
  return (
    <>
      <div className=' bg-black flex justify-start pt-[100px]'>
        {/* <div className='bg-zinc-50 w-[90%] h-[2px]'></div> */}
      </div>
      <div style={{ textAlign: 'center', padding: '100px', backgroundColor: '#000', color: '#fff' }}>
        {/* social media icon */}
        <Box sx={{ display: 'flex', justifyContent: 'left', gap: '20px' }}>
          <Button color="inherit" sx={{ fontSize: '24px' }}><i className="fab fa-facebook"></i></Button>
          <Button color="inherit" sx={{ fontSize: '24px' }}><i className="fab fa-linkedin"></i></Button>
          <Button color="inherit" sx={{ fontSize: '24px' }}><i className="fab fa-instagram"></i></Button>
          <Button color="inherit" sx={{ fontSize: '24px' }}><i className="fab fa-youtube"></i></Button>
        </Box>
        <div className='flex justify-center text-left'>
          <Typography className='w-4/5 text-lg mt-[100px]'>
      IPortfolio, a portfolio generation website that provides users with the ability to upload, manage, and display their work.
          </Typography>
        </div>
        <Typography variant='body2' component='p' sx={{ marginBottom: '10px', marginTop: '80px' }}>
       2024 IPortfolio
        </Typography>
      </div>
    </>
  );
}

export default PageBottom;