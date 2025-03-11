import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

interface ConfirmDialogProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    handleAction: () => void,
    title: string,
    content?: string,
    type: "Delete" | "Confirm"
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  setOpen,
  handleAction,
  title,
  content,
  type
}) => {
  return <Dialog
    open={open || false}
    // TransitionComponent={Transition}
    keepMounted
    onClose={() => {setOpen(false)}}
    aria-describedby={`Dialog_${Date.now()}`}
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => {setOpen(false)}}>Close</Button>
      <Button color={type == 'Delete' ? 'error' : 'primary'}
        onClick={() => {
          handleAction?.();
          setOpen(false);
        }}>{type}</Button>
    </DialogActions>
  </Dialog>
}

export default ConfirmDialog;