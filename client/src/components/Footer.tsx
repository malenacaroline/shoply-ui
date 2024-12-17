import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 2 }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} My Shop. All rights reserved.
      </Typography>
    </Box>
  )
}

