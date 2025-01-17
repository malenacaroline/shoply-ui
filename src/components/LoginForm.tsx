import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Alert,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useAuth } from "../contexts";

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginForm = ({ isOpen, onClose }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ m: 0, p: 2, position: "relative" }}>
        Login
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {loginError}
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Login</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
