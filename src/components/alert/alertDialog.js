import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../store/modalSlice';
import { useNavigate } from 'react-router-dom';
import { reset } from '../../store/projectSlice';

const AlertDialog = ({ title, content }) => {

   const navigate = useNavigate()

   const dispatch = useDispatch()
   const { isOpen } = useSelector(state => state.modalState)

   const handleClose = () => {
      dispatch(reset())
      dispatch(setOpen(false));
      navigate('/projects');
   };

   return (
      <>
         <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{ height: 350 }}
            fullWidth={true}
         >
            <DialogTitle sx={{ fontSize: 20, textAlign: "center", color: "#304361" }} id="alert-dialog-title">
               {title}
            </DialogTitle>
            <DialogContent  >
               <DialogContentText sx={{ fontSize: 16, textAlign: "center" }} id="alert-dialog-description">
                  {content}
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button sx={{ fontSize: 12 }} color="error" onClick={handleClose}>Anuller</Button>
               <Button sx={{ fontSize: 12 }} color="success" onClick={handleClose} autoFocus>
                  Suivant
               </Button>
            </DialogActions>
         </Dialog>
      </ >
   );
}

export default AlertDialog;