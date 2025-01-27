import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { AccountCircle, Store } from "@mui/icons-material";
import { orange } from "@mui/material/colors";
import { useAuth } from "../contexts";
import { Login } from "./index";

export const Header = () => {
  const { user, logout, setLoginError } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);

  const closeModal = () => {
    setShowLoginForm(false);
    setLoginError(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: orange[600] }}>
      <Toolbar>
        <Stack direction="row" alignItems="center" sx={{ flexGrow: 1 }}>
          <Store />
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            Shoply
          </Typography>
        </Stack>
        {user ? (
          <Stack direction="row" spacing={4} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <AccountCircle />
              <Typography sx={{ fontWeight: "bold" }}>{user.name}</Typography>
            </Stack>
            <Button
              color="inherit"
              variant="outlined"
              size="small"
              onClick={logout}
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
        <Login isOpen={showLoginForm} onClose={closeModal} />
      </Toolbar>
    </AppBar>
  );
};
