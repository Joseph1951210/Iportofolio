import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

interface ImgUploadDialogProps {
  open: boolean,
  setOpen: (open: boolean) => void;
  onConfirm: (url: string) => void;
}
const ImgUploadDialog:React.FC<ImgUploadDialogProps> = ({ open, setOpen, onConfirm }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const [url, setUrl] = React.useState<string>('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      if (typeof window !== 'undefined') {
        alert("Please select a file first.");
        return;
      }
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios.post(`http://43.157.44.225/api/media/upload`,
        formData,
        { headers: {
          'Content-Type': 'multipart/form-data',
        }
        }
      )
      if (response.status >= 200 && response.status < 300) {
        setUrl(`http://43.157.44.225/images/${selectedFile.name}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          width: '600px',
          height: '400px',
        },
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          onConfirm(url);
          handleClose();
          setUrl('');
        },
      }}
    >
      <DialogTitle>Image Upload</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Press "Upload" Button to upload:`}
        </DialogContentText>
        <DialogContentText>
          <input type="file" onChange={(event) => {
            handleFileChange(event);
          }} />
        </DialogContentText>
        <Button onClick={handleUpload} className='my-5'>Upload</Button>
        <DialogContentText>
          {`or`}
        </DialogContentText>
        <DialogContentText className='my-5'>
          {`Input the url:`}
        </DialogContentText>
        <TextField
          autoFocus
          required
          value={url}
          margin="dense"
          id="url"
          name="url"
          label="Image Url"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImgUploadDialog;