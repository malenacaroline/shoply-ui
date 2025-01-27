import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Alert,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../contexts";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Login = ({ isOpen, onClose }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const { login, loginError } = useAuth();
  const theme = useTheme();

  const handleClose = () => {
    setIsRegister(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    onClose();
  };

  const handleRegisterClick = () => {
    setIsRegister(true);
  };

  const handleLogin = () => {
    setIsRegister(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: "24px",
          textAlign: "center",
        }}
      >
        Shoply - {isRegister ? "Register" : "Login"}
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

      <DialogContent sx={{ pt: 0, pb: 0 }}>
        <Box>
          {isRegister ? (
            <Stack
              direction="row"
              spacing={1}
              mb={2}
              alignItems="center"
              justifyContent="center"
            >
              <Typography className="text-sm" color="text-secondary">
                Already have an account?
              </Typography>
              <Button
                variant="text"
                size="medium"
                onClick={handleLogin}
                sx={{
                  backgroundColor: theme.palette.grey[200],
                  color: theme.palette.grey[800],
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                Login
              </Button>
            </Stack>
          ) : (
            <Stack
              direction="row"
              spacing={1}
              mb={2}
              alignItems="center"
              justifyContent="center"
            >
              <Typography className="text-sm" color="text-secondary">
                Don't have an account?
              </Typography>
              <Button
                variant="text"
                size="medium"
                onClick={handleRegisterClick}
                sx={{
                  backgroundColor: theme.palette.grey[200],
                  color: theme.palette.grey[800],
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                Register
              </Button>
            </Stack>
          )}
        </Box>
        <form>
          {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {loginError}
            </Alert>
          )}

          {isRegister && (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              variant="outlined"
              value={name}
              required={true}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}

          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 4 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                width: "100%",
                backgroundColor: "secondary.main",
                "&:hover": {
                  backgroundColor: "secondary.dark",
                },
              }}
            >
              {isRegister ? "Register" : "Login"}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};
