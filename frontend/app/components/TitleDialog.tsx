import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

interface TitleDialogProps {
    open: boolean;
    handleClose: () => void;
    handleSave: (title: string) => void;
}
const TitleDialog: React.FC<TitleDialogProps> = ({ open, handleClose, handleSave }) => {
  const [title, setTitle] = useState<string>('');
  return <Dialog
    open={open}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>{"Name your portfolio"}</DialogTitle>
    <DialogContent>
      <TextField
        required
        id="title"
        label="Portfolio Name"
        value={title}
        autoFocus
        variant="standard"
        onChange={(event) => setTitle(event.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => {
        handleSave(title);
        handleClose();
      }}>Save</Button>
      <Button color="error"
        onClick={handleClose}
      >Cancel</Button>
    </DialogActions>
  </Dialog>
}

export default TitleDialog;