import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import LoginForm from "./LoginForm";
import { AccountCircle, Store } from "@mui/icons-material";

export default function Header() {
  const { isAuthenticated, logout, setLoginError } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") ?? "null");

  const closeModal = () => {
    setShowLoginForm(false);
    setLoginError(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#f9953b" }}>
      <Toolbar>
        <Stack direction="row" alignItems="center" sx={{ flexGrow: 1 }}>
          <Store />
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            MyShop
          </Typography>
        </Stack>
        {isAuthenticated ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <AccountCircle />
            <Typography variant="body1" sx={{ mr: 2, fontWeight: "bold" }}>
              Welcome back, {user.name}
            </Typography>
            <Button
              color="inherit"
              variant="outlined"
              onClick={logout}
              sx={{ mr: 4 }}
            >
              Logout
            </Button>
          </Stack>
        ) : (
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setShowLoginForm(true)}
          >
            Login
          </Button>
        )}
        <LoginForm isOpen={showLoginForm} onClose={closeModal} />
      </Toolbar>
    </AppBar>
  );
}
