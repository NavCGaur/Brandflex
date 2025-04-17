import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useUpdateUserRoleMutation } from '../../../../../state/api'; // Replace with correct hook to update user

// Modified UserAddModal Component
const UserAddModal = ({ open, onClose, currentUser }) => {
  const theme = useTheme();
  
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Client'); // Added role state
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation();

  const handleClose = () => {
    setEmail('');
    setRole('Client'); // Reset role on close
    setNotification({ open: false, message: '', severity: '' });
    onClose();
  };

  const handleSubmit = async () => {
    if (!email) {
      setNotification({ open: true, message: 'Email is required!', severity: 'error' });
      return;
    }

    try {
      // Now passing the selected role
      const res = await updateUserRole({ 
        email, 
        parentId: currentUser.uid, 
        role: role, 
      }).unwrap();
      
      if (res.message) {
        setNotification({ open: true, message: res.message, severity: 'info' });
      } else {
        setNotification({ open: true, message: 'User upgraded successfully!', severity: 'success' });
        setTimeout(() => handleClose(), 4000);
      }
    } catch (err) {
      const message = err?.data?.error || err?.data?.message || 'Failed to upgrade user.';
      setNotification({ open: true, message, severity: 'error' });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: theme.palette.background.alt,
          width: '60%',
          height: '50%' // Increased height to accommodate dropdown
        }
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary[100]}>
          Enter User Email and Role to be assigned to Add a user
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ mt: 2, p: 3 }}>
        <Stack spacing={3}>
          <TextField
            label="User Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            variant="outlined"
          />
          
          {/* Added role dropdown selection */}
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="Agency">Agency</MenuItem>
              <MenuItem value="Client">Client</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            bgcolor: theme.palette.secondary.alt,
            '&:hover': { bgcolor: theme.palette.secondary.dark }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleSubmit()}
          variant="contained"
          disabled={isLoading}
          sx={{
            bgcolor: theme.palette.primary.main,
            '&:hover': { bgcolor: theme.palette.primary.dark }
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Add User'}
        </Button>
      </DialogActions>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default UserAddModal;
