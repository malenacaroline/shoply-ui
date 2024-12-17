import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'

interface HeaderProps {
  cartItemCount: number;
}

export default function Header({ cartItemCount }: HeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Shop
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={cartItemCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

