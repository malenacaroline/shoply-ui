import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import ShoppingCart from './components/ShoppingCart'
import Box from '@mui/material/Box'
import Header from './components/Header'
import Footer from './components/Footer'

const theme = createTheme()
function App() {
  const [cartItemCount, setCartItemCount] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header cartItemCount={cartItemCount} />
        <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
          <ShoppingCart />
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
