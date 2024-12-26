import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: "#f9953b", py: 2 }}>
      <Typography variant="body2" fontWeight="bold" color="#fff" align="center">
        © {new Date().getFullYear()} My Shop. All rights reserved.
      </Typography>
    </Box>
  );
}
