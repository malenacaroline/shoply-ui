import Box from "@mui/material/Box";
import { brown, grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: grey[200], py: 2, borderTop: 1, borderColor: grey[300] }}
    >
      <Typography
        variant="body2"
        color={brown[600]}
        align="center"
      >
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </Typography>
    </Box>
  );
}
