import React from "react";
import { TextField } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Intro = () => {
  return (
    <div className="h-[600px] flex">
      <img src="https://images.unsplash.com/photo-1624923686627-514dd5e57bae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
      <div className="flex flex-col justify-center w-[800px]">
        <TextField multiline defaultValue="Your Name"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none', // Removes the outer border
              } } }}
          slotProps={{ htmlInput: { style: {
            fontSize: "64px",
            color: "#b26500",
            textAlign: "center",
            lineHeight: "64px",
          } } }}/>
        <TextField multiline defaultValue="Edit this text to introduce your work."
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none', // Removes the outer border
              } } }}
          slotProps={{ htmlInput: { style: {
            fontSize: "16px",
            color: "#b26500",
            textAlign: "center",
            lineHeight: "16px",
          } } }}/>
        <div className="flex justify-center text-slate-400 mt-[200px]">
          <InstagramIcon className="mr-4"/>
          <FacebookIcon className="mr-4"/>
          <LinkedInIcon className="mr-4"/>
          <GitHubIcon className="mr-4"/>
        </div>
      </div>
    </div>
  )
}

export default Intro
